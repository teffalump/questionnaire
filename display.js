// show all the statistics, etc

module.exports = function displaySetup()
    {
    return function displayHandle(req, res, next)
        {
            res.writeHead(200);
            res.end('YAY');
            return;
        };
    };
