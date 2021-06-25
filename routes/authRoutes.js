const passport = require('passport');
module.exports = function (app) {

    app.get('/api/auth/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    }));
    app.get('/api/auth/google/callback', passport.authenticate('google'),(req,res)=>{
        res.redirect('http://localhost:3000/');
    });

    // app.get('/api/auth/facebook',
    //     passport.authenticate('facebook',{
    //         scope: ['email']
    //     }));

    // app.get('/api/auth/facebook/callback',
    //     passport.authenticate('facebook', { failureRedirect: '/login' }),
    //     function (req, res) {
    //         // Successful authentication, redirect home.
    //         console.log("redirected by facebook")
    //     });

}