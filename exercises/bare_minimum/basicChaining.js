/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
var promisification = require('./promisification.js');
// var promiseConstructor = require('./promiseConstructor.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, (err, file) => {
      if (err) {
        reject(err);
      } else {
        var username = file.toString().split('\n')[0];
        promisification.getGitHubProfileAsync(username).then((profile) => {
          fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', (err) => {
            if (err) {
              console.log('error in writing');
              reject(err);
            } else {
              console.log('success in writing');
              resolve();
            }
          });
        });
      }
    });
  });
  
  // return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath).then((username) => {
  //   promisification.getGitHubProfileAsync(username).then((profile) => {
  //     fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', (err) => {
  //       if (err) {
  //         console.log('error in writing');
  //       } else {
  //         console.log('success in writing');
  //       }
  //     });
  //   });
  // });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
