const express = require("express");
const cors = require("cors");
const puppeteer = require('puppeteer');

const rp = require('request-promise');

const app = express();

var bodyParser = require("body-parser");
const morgan = require("morgan");

const dotenv = require("dotenv");
const { application } = require("express");


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

    const url = 'https://www.ggmmoebel.com/fr-fr-eur/' + req.params.url;

    // console.log(url);

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






