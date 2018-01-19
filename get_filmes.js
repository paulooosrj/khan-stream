const request = require('request');

module.exports = function(id = 1){

  let url = 'https://tv-v2.api-fetch.website/movies/' + id;

  return new Promise(function (resolve, reject) {
              request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                  resolve(body);
                } else {
                  reject(error);
                }
              });
           });

}