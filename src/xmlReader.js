var fs = require('fs'),
xml2js = require('xml2js');

function getvMixConfig(configFile,callback){
var parser = new xml2js.Parser();
	fs.readFile( configFile, function(err, data) {
	if (err) {
		return console.log(err);
	}
    parser.parseString(data, callback);
});
}

//getvMixConfig("../data/4-17-2022-amps fixed.xml",console.log)


module.exports = {getvMixConfig:getvMixConfig}