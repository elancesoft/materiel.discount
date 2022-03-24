const express = require("express");
const cors = require("cors");
const puppeteer = require('puppeteer');

const app = express();

var bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.use(morgan("common"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});


app.get("/api/ggmmoebel/:url", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    //Test: https://www.ggmmoebel.com/fr-fr-eur/diner-vegas-2-banc-de-salle-a-manger-l160xh103cm-turquoise-blanc-matelassage-en-v

    const url = 'https://www.ggmmoebel.com/fr-fr-eur/' + req.params.url;

    await page.goto(url, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);


    res.status(200).json({
      html: '<div class="test"><h1>hello</h1></div>' 
    });

    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({ html: data }));
    
    await browser.close();
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/ggmgastro/:url", async (req, res) => {
  try {

    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
    
    const url = 'https://www.ggmgastro.com/fr-fr-eur/' + req.params.url;

    await page.goto(url, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);

    res.status(200).json({
      html: data 
    });

    await browser.close();
    
  } catch (err) {
    res.status(500).json(err);
  }
});






