var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var md5 = require('md5');
var app = express();
var mailchimpInstance   = 'XXX',
    listUniqueId        = 'XXXXXXXXXX',
    mailchimpApiKey     = 'XXXXXXXXXXXXXXXXXXX';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

app.get('/', function (req, res) {
  res.send('Just the root');
});

app.listen(3000, function () {
  console.log('You can find me at http://localhost:3000');
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
                res.send('Subscribed to the list');
              } else if (response.status === 400 && response.body.title === "Member Exists") {
              	res.send('Already on the list');
              } else {
                res.send('Failed');
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
                res.send('Failed');
              }
          });
});