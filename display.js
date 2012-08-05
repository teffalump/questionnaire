// show all the statistics, etc

var assert = require('assert');

module.exports = function displaySetup(db, dBInfo)
    {
        return function displayHandle(req, res, next)
            {
                db.collection(dBInfo["questColl"], function (err, collection)
                        {
                            //assert.ok(err != null, quest + " does not exist");

                            // need to excise unneeded info
                            // in future
                            res.writeHead(200);
                            var stream = collection.find().stream();
                            stream.on("data", function(item) 
                                {
                                    res.write(JSON.stringify(item) + '\n');
                                });
                            stream.on("close", function() 
                                {
                                    res.end();
                                });
                            return;
                        });
            };
    };
