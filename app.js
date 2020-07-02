const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "548c466d89995062249dd64b89b3c3a5";
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric&appid=" +
    apiKey;

  https.get(url, function (r) {
    r.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>the weather is currently " + description + "</p>");
      res.write(
        "<h1>the tempreture in " +
          query +
          " is " +
          temp +
          " degree Celcius</h1>"
      );
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running successfuly");
});
