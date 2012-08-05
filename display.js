// show all the statistics, etc

var assert = require('assert');

module.exports = function displaySetup(dBInstance, questColl)
    {
        var db = dBInstance,
            quest = questColl;
        return function displayHandle(req, res, next)
            {
                db.open(function (err, db)
                        {
                            if (!err)
                                {
                                    db.collection(quest, function (err, collection)
                                            {
                                                //assert.ok(err != null, quest + " does not exist");

                                                // need to excise unneeded info
                                                // in future
                                                res.writeHead(200);
                                                var stream = collection.find().stream();
                                                stream.on("data", function(item) 
                                                    {
                                                        res.write(JSON.stringify(item));
                                                    });
                                                stream.on("close", function() 
                                                    {
                                                        res.end();
                                                        db.close();
                                                    });
                                                return;
                                            });
                                };
                        });
            };
    };
