const scraperObject = {
  url: 'https://quotes.toscrape.com/',
  async scraper(browserInstance){
  
      let browser = await browserInstance; //init browser
      let page = await browser.newPage(); //init page
      
      console.log(`Navigating to ${this.url}...`);
          // Navigate to the selected page
          
      await page.goto(this.url); //nav to url.
            
      // Wait for the required DOM to be rendered
      await page.waitForSelector('body > div > div:nth-child(2) >  div.col-md-8');
                
      //Use DOM selectors to find the quote text and author of each quote listed on the page.
      let quoteList = await page.$$eval('body > div > div:nth-child(2) > div.col-md-8 > div', quotes => {
                        
      
        let data = [] //init array containing quote objects
        text = quotes.map(el => el.querySelector('div > span:nth-child(1).text').textContent);
                                  
        author = quotes.map(el => el.querySelector('div > span:nth-child(2) > small').textContent)
                                        
        //Create the quotes object
          for (let i = 0; i < quotes.length; i++) {
                data[i] = {
                    text: text[i],
                    author: author[i]
                 }
         }
       
         return data; //Return promise
         
       })
                                                 
       return quoteList;
                                                
      }
                                              
    }
   
    module.exports = scraperObject;
  