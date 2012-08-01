// all the stuff
// POST --> new questionnaire, update
// DELETE --> delete entry
// GET --> retrieve questionairre

module.exports = function crudSetup()
    {
        return function crudHandle(req, res, next)
            {
                res.writeHead(200);
                res.end('CRUD');
                return;
            };
    };
