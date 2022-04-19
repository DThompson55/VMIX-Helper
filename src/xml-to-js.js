var parseString = require('xml2js');
var xml = require('fs').readFileSync('../data/VMix-Config-Resp.xml', 'utf8');
parseString.parseString(xml, function (err, result) {
    console.dir("ERR =",err);
    console.dir(result.vmix.inputs[0].input);

});