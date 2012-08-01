// if GET --> form
// if POST --> do session stuff


module.exports = function loginSetup (authMap) {
    // requires superuser info
    var pwd = authMap["password"];
    var user = authMap["user"]
    return function loginHandle (req, res, next)
        {
            // if already logged in...continue
            if (req.session && req.session.auth == true)
                {
                    next();
                    return;
                }
            var method = req.method;
            if (method == 'POST')
                {
                    // do database lookup?
                    if (req.body.password == pwd && req.body.username == user)
                        {
                            req.session.auth = true;
                            next();
                            return;
                        }
                    else
                        {
                            //invalid stuff
                            res.writeHead(401);
                            res.end('Sorry you are not authorized.');
                            return;
                        }
                }
            else
                {
                    // GET, etc --> give form
                    var login_form = '<html>'+
                        '<head>'+
                        '<meta http-equiv="Content-Type" content="text/html; '+
                        'charset=UTF-8" />'+
                        '</head>'+
                        '<body>'+
                        '<form action="/login" method="post">'+
                        '<input name="username" type="text" />'+
                        '<input name="password" type="password" />'+
                        '<input type="submit" value="Submit" />'+
                        '</form>'+
                        '</body>'+
                        '</html>';
                    res.writeHead(200);
                    res.end(login_form);
                    return;
                }
        };
    };
