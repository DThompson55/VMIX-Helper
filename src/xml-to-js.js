var parseString = require('xml2js');
var xml = require('fs').readFileSync('../data/vMix-Config-Resp.xml', 'utf8');
parseString.parseString(xml, function (err, result) {
    console.dir("ERR =",err);
    console.dir(result.vMix.inputs[0].input);

});