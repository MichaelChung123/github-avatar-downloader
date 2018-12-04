var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var arg = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      //grabs token from seperate file unseen for other users remotely. token kept in local file
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
  //supposed to download images and store it in filePath.
  request.get(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(arg[0], arg[1], function(err, result) {
  console.log("Errors:", err);

  var i = 0;
  var obj = {};
  var url;
  for(let arr of result) {
    url = arr.avatar_url;
    console.log(url);
    //passin login names as fileName.jpg
    downloadImageByURL(url, "avatars/" + arr.login + ".jpg");
    i++;
  }

});




