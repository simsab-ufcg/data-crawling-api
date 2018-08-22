/**
 * Html crawler utils.
 * 
 * @author Felipe Mota
 */
var JSSoup = require('jssoup').default;
var axios = require('axios');
const URL = 'http://transferserver.insa.gov.br'

/**
 * Crawler will get html source-code from the path 
 * and will parse the data to find the files and 
 * folders of directory.
 * @param {String} path 
 * @param {Object} response 
 */
exports.crawlerPage = (path, response) => {
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
        result[names[j]] = td[j].text.trim(); 
      }
      if(result.Description == '&nbsp;')
        result.Description = '';
      if(result.Name != "Parent Directory")
        ls.push(result);
    }
    response.send(ls);
  }).catch((err) =>{
    console.log(err.message);
  });
}
