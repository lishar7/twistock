exports = module.exports = function(app, passport) {

	var user = require('./routes/user')
	, leaderboard = require('./routes/leaderboard')
	, ht = require('./routes/hashtag')
	, login = require('connect-ensure-login');

	//front end
	app.get('/', login.ensureLoggedIn(), require('./routes/index').index);

	// Authentication
	app.get('/register', user.register);
	app.post('/register', user.registerPost);

	app.get('/resend', user.resendRegisterEmail);
	app.post('/resend', user.resendRegisterEmailPost);
	app.get('/verify', user.verify);

	app.get('/auth/facebook',
		passport.authenticate('facebook', {
			scope: [ 'email', 'user_about_me'],
			failureRedirect: '/login'
		}))
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/login'
		}), function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  })	
	app.get('/auth/google',
		passport.authenticate('google', {
			failureRedirect: '/login',
			scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
			]
		}))
	app.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/login'
		}), function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  })
	
	app.get('/login', user.login);
	// app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

	app.get('/logout', user.logout);

	// API
	app.get('/user/me', user.info);	
	app.get('/history', user.history);

	app.get('/search/:hashtag', ht.search);
	app.get('/:hashtag/buy', user.buy);
	app.get('/:hashtag/sell', user.sell);
	app.get('/leaderboard', leaderboard.index);

	// app.param('resource', resource.resource);
	
	// app.all('*', require('./views/http/index').http404);
}