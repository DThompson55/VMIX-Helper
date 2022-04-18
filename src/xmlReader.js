var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
//fs.readFile(__dirname + '/', function(err, data) {
	fs.readFile( '../data/10-17-2022-amps fixed.xml', function(err, data) {
	if (err) {
		return console.log(err);
	}

    parser.parseString(data, function (err, result) {
    	for (var i = 0; i < result.vmix.inputs[0].input.length; i++) {
         console.log(result.vmix.inputs[0].input[i].$,',');
        }
    });
});

