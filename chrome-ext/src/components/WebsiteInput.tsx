import React, { useState } from 'react';

interface State {
  textareaVal: string;
}

export function WebsiteInput() {
  
  const [textareaVal, setTextareaVal] = useState<String>();

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
    }
  }
  
  const runCta = () => {
    const websites: string[] = helpers.sortWebsitesIntoArray();

    console.log(websites);

    chrome.tabs.create({
      url: "https://www.google.com"
    });
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
    </div>
  );
}