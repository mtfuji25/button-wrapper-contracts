angular.module('myApp')
    .controller('VideosController', function ($scope, $http, $log, $sce, VideosService, $interval, $timeout) {

        init();

        function init() {
            $scope.results = VideosService.getResults();
            $scope.history = VideosService.getHistory();
        }

        $scope.isAndroid = function () {
            return ons.platform.isAndroid();
        }

        $scope.toolbarTitle = 'Music Downloader';

        $scope.updateToolbar = function (title) {
            $scope.toolbarTitle = title;
        }

        $scope.focusInput = function (platform) {
            document.getElementById(platform + '-search-input').focus();
        };

        $scope.blurInput = function (platform) {
            document.getElementById(platform + '-search-input').blur();
        };

        $scope.labelSearch = 'You haven\'t searched for any music yet!';
        $scope.labelHistory = 'You haven\'t downloaded any music yet!';

        $scope.loading = false;
        $scope.downloadProgress = 0;
        $scope.downloadProgressText = '';
        $scope.downloadStatus = '';
        $scope.downloadClassName = 'downloadButton';
        $scope.audioPlayerClassName = 'hideAudioPlayer';
        $scope.playUrl = '';

        $scope.loadMore = function(done) {
            $scope.searchNextPage().then(done);
        };

        $scope.search = function () {

           $scope.loading = true;
            var qText = this.query;

            return $http.get('https://api.jamendo.com/v3.0/tracks/', {
                params: {
                    client_id: '046be3b6', 
                    format: 'jsonpretty', 
                    imagesize: 600, 
                    name: qText
                }
              })
            .then(function (response) {
                if (response.data.results.length === 0) {
                    $scope.labelSearch = 'No result found.';
                } else {
                    VideosService.listResults(response.data.results, false);
                    VideosService.setPageNum(1);
                    VideosService.setQueryText(qText);
                    if (response.data.headers.next != null && response.data.headers.next != '')
                        VideosService.setNextUrl(response.data.headers.next);
                    else
                        VideosService.setNextUrl('');
                }
            }).catch(function(response) {
                $scope.labelSearch = 'Failed to get search result.';
            }).finally(function() {
                 $scope.loading = false;
            });
        };

        $scope.searchNextPage = function () {

            if (VideosService.getNextUrl == '')
                return;

            $scope.loading = true;

            return $http.get(VideosService.getNextUrl())
            .then(function (response){
                if (response.data.results.length > 0) {
                    VideosService.listResults(response.data.results, true);
                    VideosService.setPageNum(VideosService.getPageNum() + 1);
                    if (response.data.headers.next != null && response.data.headers.next != '')
                        VideosService.setNextUrl(response.data.headers.next);
                    else
                        VideosService.setNextUrl('');
                } else {
                    $scope.labelSearch = 'No more result found.';
                }
            }).catch(function(response) {
                $scope.labelSearch = 'Failed to get search result.';
            }).finally(function() {
                 $scope.loading = false;
            });
        };

		$scope.downloadMusic = function(music) {

            $scope.downloadClassName = 'downloadButton-disabled';
            
            var Permission = window.plugins.Permission;
            Permission.has(['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE'], function(results) {
                if (!results['android.permission.READ_EXTERNAL_STORAGE']) {
                    Permission.request('android.permission.READ_EXTERNAL_STORAGE', function(results) {
                        if (result['android.permission.READ_EXTERNAL_STORAGE']) {
                            ons.notification.alert("READ_EXTERNAL_STORAGE Granted.");
                        }
                    }, alert);
                }

                if (!results['android.permission.WRITE_EXTERNAL_STORAGE']) {
                    Permission.request('android.permission.WRITE_EXTERNAL_STORAGE', function(results) {
                        if (result['android.permission.WRITE_EXTERNAL_STORAGE']) {
                            ons.notification.alert("WRITE_EXTERNAL_STORAGE Granted.");
                        }
                    }, alert);
                }
            }, alert);

            var fileTransfer = new FileTransfer();

            fileTransfer.download(music.download, cordova.file.externalRootDirectory + 'Music/' + music.title + "-" + music.author + ".mp3", 
                function(entry) {
                    $timeout( function(){ $scope.downloadProgress = 0; $scope.downloadClassName = 'downloadButton'; $scope.downloadProgressText = ''; }, 500);
                    $scope.downloadStatus = "Download Success";
                    $scope.history = VideosService.getHistory();
                    $scope.history.push(music);
                    VideosService.setHistory($scope.history);
                    ons.notification.alert("Download Success");
                }, 
                function(err) {
                    $scope.downloadProgress = 0;
                    $scope.downloadClassName = 'downloadButton';
                    $scope.downloadStatus = "Download Failed";
                    $scope.downloadProgressText = '';
                    // document.getElementById("toast").show();
                });

            $interval(function() {
                fileTransfer.onprogress = function(result) {
                    var percent =  result.loaded / result.total * 100;
                    $scope.downloadProgress = Math.round(percent);
                    $scope.downloadProgressText = 'Downloading ' + percent + '%';
                };
            }.bind($scope), 10);
        };
        
        $scope.playMusic = function(music) {
            $scope.thumbnail = music.thumbnail;
            $scope.playUrl = $sce.trustAsResourceUrl(music.download + '');
            console.log($scope.playUrl);
            $scope.audioPlayerClassName = 'showAudioPlayer';
            document.getElementById("audioPlayer").pause();
            document.getElementById("audioPlayer").currentTime = 0;
            document.getElementById("audioPlayer").play();
        };
    });