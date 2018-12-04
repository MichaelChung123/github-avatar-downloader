var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var arg = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get(arg[1])
         .on('error', function (err) {
            throw err;
         });

  //tries to check if input for user and repo are valid
  // if(arg[0] || arg[1]) {
  //             throw err;
  // }

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
  request.get(url);
  //supposed to download images and store it in filePath. not working???
  //.pipe(fs.createWriteStream(filePath));
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
