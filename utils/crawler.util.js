/**
 * Html crawler utils.
 * 
 * @author Felipe Mota
 */
var JSSoup = require('jssoup').default;
var axios = require('axios');
const URL = 'https://transferserver.insa.gov.br/DADOS_TESE_RICARDO/'
var crawler = require("../utils/crawler.util.js");

/**
 * Crawler will get html source-code from the path 
 * and will parse the data to find the files and 
 * folders of directory.
 * @param {String} path 
 * @param {Object} response 
 */
exports.crawlerPage = (path, request, response) => {
  axios.get(URL + path).then((res) =>{
    var soup = new JSSoup(res.data);

    // Soup will find html body
    var html = soup.nextElement.nextElement;
    var body = html.find('body');
    
    // Create list with all directory rows.
    var tr = body.findAll('tr');
    var tableSize = tr.length;
    
    // Return object
    var ls = [];

    // Find colunm names
    var td0 = tr[0].findAll('th');
    var names = [];
    for(var i = 1; i < td0.length; i += 1){
      names.push(td0[i].nextElement.text);
    }

    // Create each directory object
    for(var i = 2; i < tableSize - 1; i+=1){
      var td = tr[i].findAll('td');
      var result = {};
      
      for(var j = 1; j < td.length; j+= 1){
        var data = td[j];
        result[names[j - 1]] = td[j].text.trim(); 
      }

      if(result.Description == '&nbsp;'){
        result.Description = '';
      }

      if(td[0].nextElement.attrs['alt'] != '[DIR]'){
        result.Download = URL + path + result.Name;  
      }

      if(result.Name != "Parent Directory")
      ls.push(result);
    }
    
    // Searching especific dataset
    var search_dataset = request.query.dataset;
    if(search_dataset === undefined || path !== ""){
      response.status(200).send(ls);  
    }else{
      
      ls = ls.filter((element) => (element.Name == search_dataset));

      if(ls.length == 0){
        response.status(404).send("Dataset not found.");
      }else{
        // Search recursively this dataset files
        crawler.crawlerPage(ls[0].Name, request, response);
      }

    }
  }).catch((err) =>{
    console.log(err.message);
    response.status(503).send(err.message);
  });
}
