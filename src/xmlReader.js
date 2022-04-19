var fs = require('fs'),
xml2js = require('xml2js');

function getVMixConfig(configFile,callback){
var parser = new xml2js.Parser();
	fs.readFile( configFile, function(err, data) {
	if (err) {
		return console.log(err);
	}
    parser.parseString(data, callback);
});
}

module.exports = {getVMixConfig:getVMixConfig}