/**
 * Definition of the api routes.
 * 
 * @author Ana Silva
 */
var express = require('express');
var router = express.Router();
var JSSoup = require('jssoup').default;
var axios = require('axios');
const URL = 'http://transferserver.insa.gov.br'

var crawlerPage = (path, response) => {
  axios.get(URL + path).then((res) =>{
    var soup = new JSSoup(res.data);
    var html = soup.nextElement.nextElement;
    var body = html.find('body');
    var tr = body.findAll('tr');
    var tableSize = tr.length;
    var ls = [];
    var td0 = tr[0].findAll('th');
    var names = td0.map(element => element.text);
    names[0] = 'isDirectory';
    for(var i = 2; i < tableSize - 1; i+=1){
      var td = tr[i].findAll('td');
      var result = {};
      result[names[0]] = td[0].nextElement.attrs['alt'] == '[DIR]';
      for(var j = 1; j < td.length; j+= 1){
        var data = td[j];
        result[names[j]] = td[j].text; 
      }
      ls.push(result);
    }
    response.send(ls);
  }).catch((err) =>{
    console.log(err.message);
  });
}

/**
 * route that loads the root of the api 
 */
router.get('/', function(req, res) {
  crawlerPage('/', res);
});

/**
 *  route that loads all avaliable datasets
 */
router.get('/dataset', function(req, res) {
  res.send('Dataset works');
});

module.exports = router;