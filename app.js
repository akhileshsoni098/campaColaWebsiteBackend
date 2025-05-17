// express
const express = require("express");
const cors = require("cors");

require("dotenv/config");

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// disk not uses upload without locally storage ...

const path = require('path');
const fs = require('fs');


// Route
app.get("/", async (req, res) => {
  res.status(200).json({ status: true, message: "app is working perfect" });
});




module.exports = app;
