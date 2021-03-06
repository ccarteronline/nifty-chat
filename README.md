# Nifty Chat

Nifty Chat is an simple single page chat application that allows users to post messages with one another. Built with NodeJs, AngularJS, MongoDB, CSS and HTML 5.

[Checkout the demonstration app here!](http://nifty-chat-app.herokuapp.com/)

> The goal of Nifty Chat is to provide a simple chat application for web-apps or even just for any basic chat needed situation. This app was built as a web-app within an iPhone application. The iOS application calls to the UIWebView class and then points to the chat's URL. A person creates a username that is stored in localstorage and then posts a message. The message is then pushed to a database and then pulled back in through a simple setInterval. It was decided to do it this way instead of socket.io just to keep the messages stored into the database for future reference. A link to the API will be included. After a period of 24 hours the database is dropped and the messages are all removed. An admin could later be created to do this.

Nifty Chat's JSON message structure is as follows:
```
{ 
	username: 'SomeUser', 
	message: 'Im chatting with users' 
}
```

Use this structure for storing to a database. You can use various other API's, but if you would like, you can use Nifty Chat's default API here:
https://github.com/ccarteronline/nifty-chat-api

Change the `linkToService` variable to the actual URL to your service within the `main.js` file.


### Version
1.1.0

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

### Installation

```sh
$ npm install
$ node nchat
```