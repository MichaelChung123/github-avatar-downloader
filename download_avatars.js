var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get('https://api.github.com/repos/jquery/jquery/contributors')

         .on('error', function (err) {                                   // Note 2
            throw err;
         })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});