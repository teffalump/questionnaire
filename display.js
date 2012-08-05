// show all the statistics, etc

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
                                                assert.ok(err != null, quest + " does not exist");

                                                // need to excise unneeded info
                                                // in future
                                                res.writeHead(200);
                                                var stream = collection.find().streamRecords();
                                                stream.on("data", function(item) {res.write(item)});
                                                stream.on("end", function() {res.end()});
                                                return;
                                            };
                                };
                        };
            };
    };
