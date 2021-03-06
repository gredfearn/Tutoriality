var m = require('mithril');

var OAuth = require('../lib/oauth.min.js').OAuth;
var OAuthUser = require('../lib/oauth.min.js').User;

OAuth.initialize('t2PEPMuehspsbZXlrrx9Xr2SWMg');

var User = module.exports;

User.signIn = function() {
	//.popup is what triggers popup that allows to sign into github
	return OAuth.popup('github').then(function(res){
		//when popup is successfully signed in, OAuthUser actually signs into the app
		return OAuthUser.signin(res);
	}).fail(function(error){
		console.log(error);
	})
}
//checks to see if a user is logged in
User.isLoggedIn = function() {
	return OAuthUser.isLogged();
};
//uses OAuth to sign a user who is currently signed in out.
User.signOut = function() {
	var user = OAuthUser.getIdentity();
	if(!user) {
		return Promise.resolve(null);
	} else {
		return OAuthUser.getIdentity().logout();
	}
}
//takes in a user ID, runs the getID function, which gets the identity from OAuth, and compares that the id entered matches
//what is returned from the OAuth check
User.isUserMatch = function(id) {
	var userID = User.getID();
	return !!userID && !!id && id === userID;
}
//Checks to make sure the user is logged in, if not it re-routes to sign-in page
User.confirmLoggedIn = function() {
	if(!User.isLoggedIn()) {
		m.route('/sign-in');
	}
}
//This is an OAuth method that gets the identity of the signed in user
User.getInfo = function() {
	return OAuthUser.getIdentity();
}
//calls the get info function and returns the unique token to that user.
User.getID = function() {
	return User.getInfo().token;
}
