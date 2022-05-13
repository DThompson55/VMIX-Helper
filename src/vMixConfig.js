const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const axiosWrapper = require('./AxiosWrapper.js')

const devVMIXDataPath = __dirname+"/../data/4-17-2022.xml"

async function getvMixConfig(callback){
     console.log("Getting Vmix Config:")
    if (!process.env.VMIX_ENV){ // if not dev mode
    console.log("vMix Live Mode:")
    await axiosWrapper.vMixSend("/api", {}, function (err, connectionStatus){
            if (err) {
                throw new Error("Failed to connect to vMix");
            }
            parser.parseString(data, (err,result) => {
                connectionStatus = "Dev Mode: vMix test schema loaded";
                callback(err,result, connectionStatus)                
            })
    });
    } else {
        console.log("vMix Dev File Mode:")
            fs.readFile( devVMIXDataPath, function(err, result) {
            if (err) {
                throw new Error( "Dev Mode: vMix test schema failed "+devVMIXDataPath);
            }
            var s = (result.toString().replace(/&/g,"&amp;")) // the VMix response has some &s in it.
            parser.parseString(s, (err, result) => {
                connectionStatus = "vMix in Dev Mode";
                callback(err, result, connectionStatus)
            })
        });
    }
}

module.exports = {getvMixConfig:getvMixConfig}