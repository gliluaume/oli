const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
var http = require('http');
var fs = require('fs');
const { deburr, kebabCase } = require('lodash')


const getMp3 = (url, name) => {
    var file = fs.createWriteStream(name);
    var request = http.get(url, function (response) {
        response.pipe(file);
        // console.log("response.statusCode", response.statusCode)
        /* if (response.statusCode < 400) {
            response.pipe(file);
        } else {
            console.warn("error for url", url)
        } */
    });
}

// getMp3("http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S0248-21.mp3", "test.mp3")

const RSS = "https://radiofrance-podcast.net/podcast09/rss_19721.xml"
const getRss = async (url) => {
    const response = await fetch(RSS);
    if (response.ok) {
        const xmlData = await response.text();

        const parser = new XMLParser();
        let data = parser.parse(xmlData);
        return data.rss.channel.item.map(obj => {
            return {
                title: obj.title,
                filename: kebabCase(deburr(obj.title)) + ".mp3",
                url: obj.guid.startsWith("http") ? obj.guid : `http://media.radiofrance-podcast.net/podcast09/${obj.guid}.mp3`,
                customUrl: !obj.guid.startsWith("http"),
            }
        });
    }
}

(async () => {
    const data = await getRss();
    data.filter(ff => !ff.customUrl).slice(0,30).forEach(entry => {
        console.log(`Getting ${entry.title} at ${entry.url}`);
        getMp3(entry.url, entry.filename);
    })
})()

