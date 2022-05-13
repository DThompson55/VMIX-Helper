var fs = require('fs'),
xml2js = require('xml2js');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const axiosWrapper = require('./AxiosWrapper.js')

const devVMIXDataPath = "../data/4-17-2022-amps fixed.xml"

//
// maybe this is not actually connected yet? not finished yet?
//
async function getvMixConfig(callback){
    if (!process.env.VMIX_ENV){ // if not dev mode
    await axiosWrapper.vMixSend("/api", {}, function (err, data){
            if (err) {
                throw "Failed to connect to vMix";
            }
            connectionStatus = "connected to vMix";
            parser.parseString(data, (err,result) => {
                if (err){
                    throw err;
                }
                connectionStatus = "Dev Mode: vMix test schema loaded";
                callback(result, connectionStatus)                
            })
    });
    } else {
            fs.readFile( devVMIXDataPath, function(err, result) {
            if (err) {
                throw new Error( "Dev Mode: vMix test schema failed "+devVMIXDataPath);
            }
            //var s = (data.toString().replace(/&/g,"&amp;"))
            var s = result.toString()
            parser.parseString(s, (err, result) => {
                if (err){
                    throw new Error(err);
                }
                connectionStatus = "Dev Mode: vMix test schema loaded";
                callback(result, connectionStatus)
            })
        });
    }
}




module.exports = {getvMixConfig:getvMixConfig}