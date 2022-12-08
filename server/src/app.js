import express from "express";
import { json } from "body-parser";
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import parse from 'papaparse';

// Use path.join to create a path to the csv file
const filePath = path.join(__dirname, './../../raw-data/2004-2012.csv');

// Use fs to read the file and parse it
fs.readFile(filePath, (err, data) => {
  if (err) throw err;

  parse.parse(data.toString(), {
    header: true,
    complete: (results) => {
      const entries = results.data.filter(entry => entry.Year === '2012');
      const countries = {};
      entries.forEach(entry => {
        const country = entry.Country;
        const medal = entry.Medal;
        if (!countries[country]) countries[country] = { Gold: 0, Silver: 0, Bronze: 0 };
        countries[country][medal]++;
      });

      console.log(countries);
    }
  });
});

const createApp = () => {
  const app = express();
  app.use(json());
  app.use(cors())

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return app;
}

export default createApp;
