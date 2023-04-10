import React, { useState } from 'react';

// interface State {
//   textareaVal: string;
//   errorMsg: string
// }

export function WebsiteInput() {
  
  const [textareaVal, setTextareaVal] = useState<String>();
  const [errorMsg, setErrorMsg] = useState<String>('');

  const helpers = {
    sortWebsitesIntoArray: () => {
      if (textareaVal && textareaVal.length === 0) {
        return;
      }

      let websites: string[] = textareaVal.split(',');

      websites = websites.map((site) => {
        return site.trim();
      })      

      return websites;
    },
    addHttpsIfNeeded: (url: string) => {
      const regex: any = /^((http|https|ftp))/;
      
      if (!regex.test(url)) {
        url = 'http://' + url;
      }

      return url;
    }

  }
  
  const runCta = () => {
    setErrorMsg(''); // clear error message

    const websites: string[] = helpers.sortWebsitesIntoArray();
    const urlRegex = /^((https?| http):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

    let urlError: boolean = false;

    websites.forEach((site) => {
      if (!urlRegex.test(site)) {
        setErrorMsg('One or more of the urls in the list is not valid. Please fix and try again.');

        urlError = true;
      }
    })

    if (!urlError) {
      openUrls(websites);
    }
  }

  const openUrls = (urlArray: string[]) => {
    urlArray.forEach(url => {
      chrome.tabs.create({
        url: helpers.addHttpsIfNeeded(url)
      });
    })
  }

  return (
    <div>
      <p>Please input your websites in this textarea. Separate all websites by a comma.</p>

      <textarea 
        rows={3} 
        cols={60}
        onChange={(e) => {
          setTextareaVal(e.target.value);
        }}
      >
      </textarea>
      <button
        onClick={runCta}  
      >
        Submit
      </button>

      {
        errorMsg &&
        <p className='errorMsg'>{errorMsg}</p>
      }
      
    </div>
  );
}