var app = angular.module('myApp', ['onsen']);

app.run(function () {});

app.config( function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.service('VideosService', ['$window', '$rootScope', '$log', function ($window, $rootScope, $log) {

  var results = [];
  var history = [];
  var nextUrl = '';
  var pageNum = 0;
  var queryText = '';

  this.listResults = function (data, append) {
    if (append == false) {
      results.length = 0;
    }
    for (var i = 0; i < data.length; i ++) {
      results.push({
        id: data[i].id,
        title: data[i].name, 
        description: data[i].releasedate, 
        thumbnail: data[i].image, 
        author: data[i].artist_name, 
        download: data[i].audiodownload
      });
    }
    return results;
  }

  this.archiveVideo = function (video) {
    history.unshift(video);
    return history;
  };

  this.getResults = function () {
    return results;
  };

  this.getHistory = function () {
    return history;
  };

  this.setHistory = function (his) {
    history = his;
  };

  this.getNextUrl = function() {
    return nextUrl;
  }

  this.setNextUrl = function(url) {
    nextUrl = url;
  }

  this.getPageNum = function() {
    return pageNum;
  }

  this.setPageNum = function(num) {
    pageNum = num;
  }

  this.getQueryText = function() {
    return queryText;
  }

  this.setQueryText = function(text) {
    queryText = text;
  }

}]);

