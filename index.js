const { XMLParser } = require("fast-xml-parser");
const http = require("http");
const fs = require("fs");
const { deburr, kebabCase } = require("lodash");

const getMp3 = (url, name) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(name);
    http.get(url, (response) => {
      response.pipe(file);
      response.on("end", (payload) => {
        resolve(payload);
      });
      response.on("error", (err) => {
        console.error(err);
        reject(err);
      });
    });
  });
};

const getRss = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    const xmlData = await response.text();

    const parser = new XMLParser();
    const data = parser.parse(xmlData);
    return data.rss.channel.item.map((obj) => {
      return {
        title: obj.title,
        filename: kebabCase(deburr(obj.title)) + ".mp3",
        url: obj.guid.startsWith("http")
          ? obj.guid
          : `http://media.radiofrance-podcast.net/podcast09/${obj.guid}.mp3`,
        customUrl: !obj.guid.startsWith("http"),
      };
    });
  }
};

(async () => {
  // getMp3("http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S0248-21.mp3", "test.mp3")
  const RSS = "https://radiofrance-podcast.net/podcast09/rss_19721.xml";
  const data = await getRss(RSS);
  const promises = data.map((entry) => getMp3(entry.url, entry.filename));
  await Promise.allSettled(promises);
})();
