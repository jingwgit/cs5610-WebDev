module.exports = function(app) {
    var userModel = require("../model/user/user.model.server");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // var googleConfig = {
    //     clientID : process.env.GOOGLE_CLIENT_ID,
    //     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL  : process.env.GOOGLE_CALLBACK_URL
    // };
    //
    // var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    // passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    app.post("/api/user", isAdmin, createUser);
    app.get("/api/user", isAdmin, findAllUsers);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", isAdmin, updateUser);
    app.delete("/api/user/:userId", isAdmin, deleteUser);

    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.post("/api/unregister", unregister);
    app.get("/api/checkLoggedIn", checkLoggedIn);
    app.get("/api/checkAdmin", checkAdmin);

    app.get('/auth/google',
        passport.authenticate('google',
            { scope : ['profile', 'email']}));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/login'
        }));

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function isAdmin(req, res, next) {
        if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')> -1) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                   res.send(status);
                });
            });
    }

    function unregister(req, res) {
        userModel
            .deleteUser(req.user._id)
            .then(function (user) {
                req.logout();
                res.sendStatus(200);
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function checkLoggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function checkAdmin(req, res) {
        if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    //to decide what to put in the cookie
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function createUser(req, res){
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
               res.json(user);
            }, function (error) {
                res.send(error);
            });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
               res.send(users);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                    return;
                } else {
                    res.sendStatus(404);
                }
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
               if(user) {
                   res.json(user);
               }  else {
                   res.sendStatus(404);
               }
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
               res.json(user);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
               res.send(status);
            });
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

};


