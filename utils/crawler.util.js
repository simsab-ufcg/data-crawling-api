/**
 * Html crawler utils.
 * 
 * @author Felipe Mota
 */
const JSSoup = require('jssoup').default;
const axios = require('axios');
const URL = 'https://transferserver.insa.gov.br/DADOS_TESE_RICARDO/'
const crawler = require("../utils/crawler.util.js");

const axiosInstance = axios.create({
  baseURL: URL
});

exports.parsePage = (path) => {
  return axiosInstance.get(path)
    .then((res) => {
      var soup = new JSSoup(res.data);

      // Soup will find html body
      var html = soup.nextElement.nextElement;
      var body = html.find('body');

      // Create list with all directory rows.
      var tr = body.findAll('tr');
      var tableSize = tr.length;
      var ls = [];
      var td0 = tr[0].findAll('th');
      var names = [];
      for (var i = 1; i < td0.length; i += 1) {
        names.push(td0[i].nextElement.text);
      }
      for (var i = 2; i < tableSize - 1; i += 1) {
        var td = tr[i].findAll('td');
        var result = {};

        for (var j = 1; j < td.length; j += 1) {
          var data = td[j];
          result[names[j - 1]] = td[j].text.trim();
        }

        if (result.Description == '&nbsp;') {
          result.Description = '';
        }

        if (td[0].nextElement.attrs['alt'] != '[DIR]') {
          result.Download = URL + path + result.Name;
        }

        if (result.Size != '-'){
          const size = result.Size;
          var sizeInBits = parseFloat(size.slice(0, size.length - 1));
          const unity = size[size.length - 1];
          
          if(unity == 'M')
            sizeInBits *= 1048576 * 8;
          else if(unity == 'K')
            sizeInBits *= 1024 * 8;
          
          sizeInBits = parseInt(sizeInBits);
          result.Size = sizeInBits;
        }

        if (result.Name != "Parent Directory")
          ls.push(result);
      }

      return ls;
    })
    .catch((err) => {
      // console.log(err);
    });
}
/**
 * Crawler will get html source-code from the path 
 * and will parse the data to find the files and 
 * folders of directory.
 * @param {String} path 
 * @param {Object} response 
 */
exports.crawlerPage = (path, request, response) => {
  console.log('crawling ' + path);
  crawler.parsePage(path)
    .then((ls) => {


      var search_dataset = request.query.dataset;

      if (search_dataset === undefined) {

        var promises = ls.map((element) => {
          return crawler.parsePage(element.Name)
            .then((res) => {
              return {
                name: element.Name,
                result: res
              }
            })
        });

        Promise.all(promises)
          .then((values) => {
            for(const element of values){
              const lsElement = ls.filter((el) => el.Name == element.name)[0];
              const index = ls.indexOf(lsElement);
              ls[index].Size = element.result.reduce((prev, curElement) => prev + curElement.Size, 0);
            }
            response.status(200).send(ls);
          })
          
      } else if(path !== ""){
        response.status(200).send(ls);
      } else {

        ls = ls.filter((element) => (element.Name == search_dataset || element.Name == search_dataset + '/'));

        if (ls.length == 0) {
          response.status(404).send("Dataset not found.");
        } else {
          crawler.crawlerPage(ls[0].Name, request, response);
        }



      }
    }).catch((err) => {
      console.log(err.message);
      response.status(503).send(err.message);
    });
}
