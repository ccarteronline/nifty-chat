angular.module('niftyChat', [])
.controller('Chat-Object', ['$scope','$http', function ($scope, $http) {
	
	$scope.messages = [];
	$scope.topPlaceholder = 'Create a Nickname';
	$scope.topSubmit = 'Make Name';
	$scope.submitBtn = 'Send';
	$scope.phTxt = 'Write a message';
	$scope.closeBtn = 'Close';
	$scope.revealMsgObj = true;
	$scope.otherHider = true;
	$scope.showMsgs = true;
	$scope.allowPopulateMessages = false;
	$scope.msgAmnt = 0;

	//change to ip address to allow use on other devices
	//change to link to service when using online version
	//var linkToService = 'http://localhost:3000/api/bears';
	var linkToService = 'http://192.168.0.4:3000/api/bears';
	//
	$scope.createNickname = function () {
		
		if (!$scope.nn) {
			alert('You must enter a nick name');
		} else {
			$scope.hider = true;
			$scope.otherHider = false;
			localStorage.setItem('username', $scope.nn);
			$scope.showMsgs = false;
			$scope.allowPopulateMessages = true;
			scrollToBottom();
			iOSBlurHack();
		}
	}
	
	$scope.sendMessage = function () {

		if (!$scope.newMessage) {
			alert('You must not leave the message blank.');
		} else {

			handleMessages($scope.newMessage);
			$scope.otherHider = true;
			$scope.newMessage = '';
			$scope.revealMsgObj = false;
			$scope.allowPopulateMessages = true;
			iOSBlurHack();
		}
	}

	$scope.hideSendMsgObj = function () {
		$scope.otherHider = true;
		$scope.newMessage = '';
		$scope.revealMsgObj = false;
		$scope.allowPopulateMessages = true;
	}

	$scope.revealMessageObject = function () {
		$scope.otherHider = false;
		$scope.revealMsgOb = true;
	}

	$scope.disableScroller = function () {
		$scope.allowPopulateMessages = false;
	}

	var handleMessages = function (msgToPush) {
		this.username = localStorage.getItem('username');

		$http.post(linkToService, { 
			username: this.username, 
			message: msgToPush 
		}).success(function (data, status, headers, config) {
			
			console.log(data);
		}).error(function (data, status, headers, config) {
			
			if (data === undefined) {
				console.log('Server Error: Data is ', data, status);
			}
		});
	}

	var getMessages = setInterval(function(){serveMessages()},2000);

	function serveMessages () {
		$http.get(linkToService)
		.success(function (data, status, headers, config) {
			console.log($scope.msgAmnt);

			if (data.length > $scope.msgAmnt) {
				//update
				$scope.messages = data;
				scrollToBottom();
			}

			$scope.msgAmnt = $scope.messages.length;

			
		}).error(function (data, status, headers, config) {
			console.log(data, status);
		});
	}

	function scrollToBottom () {
		//window.scrollTo(0,(document.body.scrollHeight));
		$("html, body").animate({ scrollTop: document.body.scrollHeight },2000);
	}

	function iOSBlurHack () {
		document.activeElement.blur();
	}
	
}]);