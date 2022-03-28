const puppeteer = require('puppeteer'); //import puppeteer

async function startBrowser(){
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: true,
        });
        //Start browser instance in headless mode.
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}
module.exports = {startBrowser}
