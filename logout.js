// destroy session, then just load homepage
module.exports = function logoutSetup()
    {
    return function logoutHandle(req, res, next)
        {
            // destroy session
            req.session.destroy();
            next();
            return;
        };
    };
