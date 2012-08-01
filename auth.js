// authorize/route access to specific resources

var urlparser = require('url');


module.exports = function authorizeSetup(urlMap)
    {
       // needs urlmapping
    return function authorizeHandle(req, res, next)
        {
            url = req.urlp = urlparser.parse(req.url, true);
            if (url.pathname in urlMap) 
                {
                    if (urlMap[url.pathname])
                        {
                            if (req.session && req.session.auth == true)
                                {
                                    next();
                                    return;
                                }
                            else
                                {
                                    res.writeHead(401);
                                    res.end('Unauthorized.');
                                    return;
                                }
                        }
                    else
                        {
                            next();
                            return;
                        }
                }
            else
                {
                    res.writeHead(404);
                    res.end('Not Found');
                    return;
                }
        };
    };

