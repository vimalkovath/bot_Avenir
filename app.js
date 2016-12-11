var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
var port = process.env.PORT || 1337;





// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Process application/json
app.use(bodyParser.json())

    

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!'); });
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
const token = "EAAMZCZAEfhs0kBABJtqNuaMGZB2xumpTaZAAWFlYAfCsZAZBEFFL9IV4NrktxgpkNJ7ypZAoaJuZC0pDiN9ZCFDZCPBoSrUNonBsZBdkKarwvhZAVokaqLx76hhkx24IC4NoaFbpMwJ1036pZCbhYXGDMhtYhb8HNaedQZBhuHORfyV0aMegZDZD"
//EAAXSZCE0KtWsBAMDLRZAZA7ymZBNRK9VvGZAPpJ3mM1DDYT8vsoz2ERo0kHfQmdJgZA1WaRH8mxDTJtnqr76v3mT13y6KoeSdK9h0Uvh5mNZAcNsh4hCBlmGn0fdmswi3bbug79TCfygJ7z6hb8gzMF75BX7xziS7wucLzZANdCwzwZDZD
//EAAMZCZAEfhs0kBABJtqNuaMGZB2xumpTaZAAWFlYAfCsZAZBEFFL9IV4NrktxgpkNJ7ypZAoaJuZC0pDiN9ZCFDZCPBoSrUNonBsZBdkKarwvhZAVokaqLx76hhkx24IC4NoaFbpMwJ1036pZCbhYXGDMhtYhb8HNaedQZBhuHORfyV0aMegZDZD
// for Facebook verification
//heroku config:set FB_PAGE_ACCESS_TOKEN=EAAMZCZAEfhs0kBABJtqNuaMGZB2xumpTaZAAWFlYAfCsZAZBEFFL9IV4NrktxgpkNJ7ypZAoaJuZC0pDiN9ZCFDZCPBoSrUNonBsZBdkKarwvhZAVokaqLx76hhkx24IC4NoaFbpMwJ1036pZCbhYXGDMhtYhb8HNaedQZBhuHORfyV0aMegZDZD

//const token = process.env.FB_PAGE_ACCESS_TOKEN

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
});






app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if (text === 'Generic') {
                sendGenericMessage(sender)
                continue
            }
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})




function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

app.post('/hello', function (req, res, next) {
  var userName = req.body.user_name;
  var botPayload = {
    text : 'Hello ' + userName + ', welcome to Devdactic Slack channel! I\'ll be your guide.'
  };
  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});




function sendGenericMessage1(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

