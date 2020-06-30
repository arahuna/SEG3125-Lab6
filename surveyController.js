var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');
const { info } = require('console');
const { parse } = require('path');
const { isArray } = require('util');

function readData(fileName) {
    let dataRead = fs.readFileSync('./data/' + fileName + ".json");
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

function writeData(info, fileName) {
    data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

function updateCount(name, value) {
    
    let info = readData(name);

    var found = false
    var i = 0
    while (!found && i<info.length) {
        if(info[i][name] === value) {
            info[i].count = parseInt(info[i].count) + 1;
            found = true;
        }
        i++;
    }

    if(!found) {
        info.push({[name]: value, count: 1});
    }
    writeData(info, name);
}


module.exports = function(app) {
    
    app.get('/niceSurvey', function(req, res) {
        res.sendFile(__dirname + '/views/niceSurvey.html');
    });

    app.get('/analysis', function(req, res) {
        var q1 = readData("Q1");
        var q2 = readData("Q2");
        var q3 = readData("Q3");
        var q4 = readData("Q4");
        var q5 = readData("Q5");
        var comments = readData("comments");

        res.render("showResults", {results: [q1,q2,q3,q4,q5,comments]});
        console.log([q1,q2,q3,q4,q5,comments]);
    })


    app.post('/niceSurvey', urlencodedParser, function(req, res){ 
        console.log(req.body);
        var json = req.body;

        for (var key in json) {
            debugger;
            //If Q4, user may have chosen multiple options
            if((key === "Q4") && (isArray(json[key]))){
                for (var item in json[key]){
                    updateCount(key, json[key][item]);
                }
            } else {
                updateCount(key, json[key]);
            }
        }
        res.sendFile(__dirname + '/views/niceSurvey.html');
    });
}
