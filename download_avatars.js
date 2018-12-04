var request = require('request');
var secret = require('./secret');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get('https://api.github.com/repos/jquery/jquery/contributors')

         .on('error', function (err) {                                   // Note 2
            throw err;
         });
         .pipe(fs.createWriteStream(filePath))

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
      //parsing JSON data
      var converted = JSON.parse(body);
      cb(err, converted);

  });

}


function downloadImageByURL(url, filePath) {
  request.get(url);
  //.pipe(fs.createWriteStream(filePath)); not working???
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  var i = 0;
  var obj = {};
  var url;
  for(let arr of result) {
    url = arr.avatar_url;
    console.log(url);
    downloadImageByURL(url, "avatars/kvirani.jpg");
    i++;
  }
});
