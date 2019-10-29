const axios = require("axios");

const key = "e26fe5cf2cfeb710540845a34edd70ea";
const city = process.argv.slice(2)[0];
const tempSymbol = process.argv.slice(2)[1];

const symbol = ["°C", "°F"];

today: new Date().toLocaleString("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

axios
  .get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
  )
  .then(res => {
    // console.dir(res.data);
    const country = res.data.city.country;
    const temps = res.data.list;
    if (tempSymbol === "C") {
      let celcius = Math.round(parseFloat(temps[0].main.temp) - 273.15);

      console.log(`It is now ${celcius}${symbol[0]} in ${city}, ${country}`);
    } else if (tempSymbol === "F") {
      let fahrenheit = Math.round(
        (parseFloat(temps[0].main.temp) - 273.15) * 1.8 + 32
      );

      console.log(`It is now ${fahrenheit}${symbol[1]} in ${city}, ${country}`);
    }

    console.log(
      `The current weather conditions are ${temps[0].weather[0].description}`
    );

    let max = temps.filter(
      (x, i) => x.dt_txt.split(" ")[1] === "12:00:00" || i === 0
    );
    let min = temps.filter(x => x.dt_txt.split(" ")[1] === "03:00:00");

    const minTemp = min.map(small => {
      return tempSymbol === "C"
        ? Math.round(parseFloat(small.main.temp_min) - 273.15)
        : Math.round(parseFloat(small.main.temp_min) - 273.15) * 1.8 + 32;
    });

    const maxTemp = max.map(big => {
      return tempSymbol === "C"
        ? Math.round(parseFloat(big.main.temp_max) - 273.15)
        : Math.round(parseFloat(big.main.temp_max) - 273.15) * 1.8 + 32;
    });
    const date = max.map(day => day.dt_txt);
    let show = [];
    for (let i = 0; i < date.length - 1; i++) {
      tempSymbol === "C"
        ? show.push(
            `Date: ${date[i]}, Min: ${minTemp[i]}${symbol[0]}, Max: ${
              maxTemp[i]
            }${symbol[0]}`
          )
        : show.push(
            `Date: ${date[i]}, Min: ${minTemp[i]}${symbol[1]}, Max: ${
              maxTemp[i]
            }${symbol[1]}`
          );
    }
    console.log(show);
  });
