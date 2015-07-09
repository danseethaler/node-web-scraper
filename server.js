var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	// Let's scrape Anchorman 2
	url = 'https://www.wikimedia.org/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var allImageElements = $.querySelectorAll('img');

		    wikiImages = [];

			for (i = 0; i < allImageElements.length; i++){
		        wikiImages.push(allImageElements[i].src);
		    }

		    wikiImages = JSON.stringify(wikiImages, null, 4);

		}

		fs.writeFile('output.json', wikiImages, function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send("Check the console :)")
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
