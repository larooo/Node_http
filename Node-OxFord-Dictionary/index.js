const axios = require("axios");
const word = process.argv.slice(2);

const app_key = "6a7095d5e19b3ed8422abaa4c32c64f0";
const app_id = "3777b37c";

// endpoint = "entries";
// language_code = "en-us";

const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`;

// requests.get(url, headers = { "app_id": app_id, "app_key": app_key })
axios
  .get(url, { headers: { app_id: app_id, app_key: app_key } })
  .then(response => {
    console.log(
      `${word}: ${response.data.results[0].lexicalEntries[0].lexicalCategory.id}`
    );

    const data = response.data.results[0].lexicalEntries[0].entries[0].senses;
    const results = data.map(def => def.shortDefinitions);
    console.log(results);
  });

// response.data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions
