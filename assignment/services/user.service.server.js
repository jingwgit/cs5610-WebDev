module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    ];


    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res){
        var user = req.body;
        user._id = (new Date()).getTime()+"";
        users.push(user);
        res.json(user);
    }
    
    function findUserByUsername(req, res) {
        var username = req.query.username;

        for (var u in users){
            var user = users[u];
            if(user.username === username){
                res.send(user);
                return;
            }
        }
        res.status(404).send("not found!");

    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        for (var u in users){
            var user = users[u];
            if(user.username === username && user.password === password){
                res.json(user);
                return;
            }
        }
        // var user = users.find(function (u) { return u.username==username && u.password==pswd  });
        // res.json(user);
        res.sendStatus(404);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        for(var u in users) {
            var user = users[u];
            if(user._id === userId) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        for(var u in users) {
            var user = users[u];
            if(user._id === userId) {
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.email = newUser.email;
                res.status(200).send(user);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        for(var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("not found!");
    }

}


