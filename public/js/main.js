angular.module('niftyChat', [])
.controller('Chat-Object', ['$scope','$http', function ($scope, $http) {
	
	$scope.messages = [];
	$scope.topPlaceholder = 'Create a Nickname';
	$scope.topSubmit = 'Make Name';
	$scope.submitBtn = 'Send Message';
	$scope.phTxt = 'Write a message';
	$scope.closeBtn = 'Close & See Chat';
	$scope.revealMsgObj = true;
	$scope.otherHider = true;
	$scope.showMsgs = true;
	$scope.allowPopulateMessages = false;
	$scope.msgAmnt = 0;

	//change to ip address to allow use on other devices
	var linkToService = 'http://remixchatapi.herokuapp.com/api/messages';
	//

	//check if user has already made a nickname
	if (localStorage.getItem('username')) {
		$scope.topPlaceholder = localStorage.getItem('username');
		$scope.nn = localStorage.getItem('username');
	}

	$scope.createNickname = function () {
		
		if (!$scope.nn) {
			alert('You must enter a nick name');
		} else {
			$scope.hider = true;
			$scope.otherHider = false;
			localStorage.setItem('username', $scope.nn);
			$scope.showMsgs = false;
			$scope.allowPopulateMessages = true;
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

	$scope.disableScroll = function () {
		$scope.allowPopulateMessages = false;
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

	var handleMessages = function (msgToPush) {
		this.username = localStorage.getItem('username');

		$http.post(linkToService, { 
			username: this.username, 
			message: msgToPush 
		}).success(function (data, status, headers, config) {
			
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

			if (data.length > $scope.msgAmnt && $scope.allowPopulateMessages) {
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

		$("html, body").animate({ scrollTop: document.body.scrollHeight },2000, function (){
			//done scrolling
		});
	}

	function iOSBlurHack () {
		document.activeElement.blur();
	}
	
}]);