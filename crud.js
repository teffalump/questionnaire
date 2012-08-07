// all the stuff
// POST --> new questionnaire, update
// DELETE --> delete entry
// GET --> retrieve questionairre
//
var assert = require('assert'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function crudSetup(db, dBInfo)
    {
        return function crudHandle(req, res, next)
            {
                var method = req.method;
                switch (method) 
                    {
                        case "POST":
                            // post method
                            return;
                            break;
                        case "GET":
                            // get method
                            // unlike DELETE, I feel GET should return all
                            // matching results given an ambiguous key/value
                            //      e.g., name: chris ===> all chris's
                            // however, maybe change in the future, we'll see
                            // also, single query argument only for now
                            //      --> extend in future maybe
                            assert.equal(Object.keys(req.body).length, 1);

                            // get key (since I don't know what field is
                            // being queried) and make value into regex
                            var key = Object.keys(req.body)[0],
                                value = '^' + req.body[key],
                                regexp = new RegExp(value, "i");

                            // mongo search
                            var search = {};
                            search[key] = regexp;

                            console.log(search);
                            db.collection(dBInfo["questColl"], function (err, collection)
                                    {
                                        var stream = collection.find(search).stream();
                                        res.writeHead(200);
                                        stream.on("data", function (item)
                                            {
                                                res.write(JSON.stringify(item));
                                            });
                                        stream.on("close", function ()
                                            {
                                                res.end();
                                            });
                                    });
                            return;
                            break;
                        case "DELETE":
                            // delete method
                            // gotta decide how to specify record
                            //      _id for now
                            var id = ObjectID.createFromHexString(req.body.id);
                            db.collection( dBInfo["questColl"], function (err, collection)
                                    {
                                        collection.remove({"_id": id}, {safe: true}, 
                                            function (err, numbOfDoc)
                                                {
                                                    assert.equal(null,err);
                                                    assert.equal(1, numbOfDoc);
                                                    res.writeHead(200);
                                                    res.end('Removed');
                                                    return;
                                                });
                                    });
                            break;
                        default:
                            // method not recognized
                            res.writeHead(405);
                            res.end("Method not Allowed");
                            return;
                    }
            };
    };
