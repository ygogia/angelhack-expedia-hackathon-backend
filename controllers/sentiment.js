var request = require('request');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'oeGvjyQQMwbvlUOtuq4p1JqzL',
  consumer_secret: 'XFdxt800WvU5KnUul2jodLSFBlcb1rsHehbtqxjNL23005syPT',
  access_token_key: '587888589-bjLVdcNOVmzQZwbKdrfYWEeTqWVKpW6C0c5gyvM2',
  access_token_secret: '2ALIihmsD6ECPm1GAU7BK54HfMggJfrXS3phk4UAMl30e'
});

exports.getSentiment = function(req, res) {
	var hashtag = req.params.hashtag;
    client.get('search/tweets', {q:hashtag+'+travel', count: 40}, function(error, tweets, response) {
        if(error){
            return console.log('Error:', error);
        }
        var tweetParagraph='';
        for(var i = 0; i < tweets.statuses.length; i++) {
            tweetParagraph+=tweets.statuses[i].text;
            
        }
        tweetParagraph= tweetParagraph.replace(/\s+/g, ' ').replace(/[^\w\s]/gi, '');
        console.log('https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?&apikey=615d8618-c63c-4166-ab01-715bbd7b9d27&text='+tweetParagraph);
        request(
        { 
            url: 'https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?&apikey=615d8618-c63c-4166-ab01-715bbd7b9d27&text='+tweetParagraph,
            json: true
        }, 
        function (error, response, body) {
            if(error){
                return console.log('Error:', error);
            }
            if(response.statusCode !== 200){
                console.log(body);
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }
            console.log(body);
            res.json({sentiment:body.aggregate.sentiment,score:body.aggregate.score});
        });
    });
}
exports.expedia= function(req,res){
    request(
        { 
            url: 'http://terminal2.expedia.com/x/activities/search?apikey=SaIt2twxOSEeqwGdArPe7fQhcxpvejdN&location=delhi',
            json: true
        }, 
        function (error, response, body) {
            if(error){
                return console.log('Error:', error);
            }
            if(response.statusCode !== 200){
                console.log(body);
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }
            console.log(body.activities[0]);
            res.json({sentiment:body.activities[0]});
        });
}

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});