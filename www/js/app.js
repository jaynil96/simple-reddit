(function(){

var app = angular.module('myreddit', ['ionic', 'angularMoment']);

app.controller('RedditCtrl', ["$http", "$scope",function($http, $scope) {
	$scope.stories = [];
	function loadStories (params, cllback){
	$http.get('https://www.reddit.com/r/funny/new/.json', {params: params})
		.success(function(response) {
			var stories =[];
			angular.forEach(response.data.children, function(child){
				stories.push(child.data);
			});
		cllback(stories);
		});
	};

		
		
	$scope.loadOlderStories = function(){
		var params = {};
		if($scope.stories.length  > 0){
			params['after'] = $scope.stories [$scope.stories.length -1].name;
		}
		loadStories(params, function(OlderStories){
		$scope.stories = $scope.stories.concat(OlderStories);	
		$scope.$broadcast('scroll.infiniteScrollComplete');
		});
		};
		
		
	$scope.loadNewerStories = function(){
		var params = {'before': $scope.stories[0].name};
		loadStories (param, function(newStories)
		{
			$scope.stories = newerStories.concat($scope.stories);
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
}]);



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}());