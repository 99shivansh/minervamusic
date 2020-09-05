var request = require('request');
var express = require('express');
var app = express();
const path =require('path');
const cors=require('cors');
app.set('port', process.env.PORT || 8080);
   //cors middleware
   app.use(cors());

   app.use(express.static(path.join(__dirname,'public')));
app.get('/token', function(req, resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var client_id = '458e43e1baa645cd8ca91cf2942e5110';
  var client_secret = '82e32a65da1249eb83171d0a73dfe1ab';

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      resp.json({ token: body.access_token });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
