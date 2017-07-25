module.exports = function(app) {
    var userModel = require("../model/user/user.model.server");

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

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
        console.log("hello from service");
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

};


