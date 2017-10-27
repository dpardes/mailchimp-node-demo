var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var md5 = require('md5');
var app = express();
var mailchimpInstance   = 'us7',
    listUniqueId        = '369087d943',
    mailchimpApiKey     = 'c9ba9fac14c02a3111d624d409a0b5b5-us7';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Running on port 3000!');
});

app.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed'
        })
            .end(function(err, response) {
              if (response.status < 300) {
                res.send('Added');
              } else if (response.status === 400 && response.body.title === "Member Exists") {
              	res.send('Already on the list');
              } else {
                res.send('Fail');
              }
          });
});

app.post('/update', function (req, res) {
    request
        .patch('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/' + md5(req.body.email))
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
        	'merge_fields': {
        		'SUPERPOWER': req.body.superpower
    			}
        })
            .end(function(err, response) {
              if (response.status < 300) {
                res.send('Updated');
              } else {
                res.send('Fail');
              }
          });
});