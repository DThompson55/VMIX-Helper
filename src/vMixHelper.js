const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const axiosWrapper = require('./AxiosWrapper.js')

const devVMIXDataPath = __dirname+"/../data/4-17-2022.xml"
//var vMixCfg = {vMixCfg:"Not Configured", vMixStatus:"Not Connected"};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function send(params, callback){ //function (response)
        await sleep(1000) // vMix apparently needs some time to process, 
        // but how much time? Do I need to pass a time in?
        // maybe it jsut needs to wait for the response
        axiosWrapper.vMixSend("/api", params, callback)
}


function connect(callback){//{httpResponse, status}
    send({},(response)=>{
        parser.parseString(response.data, (err,result) => {
            callback({vMixCfg:result, vMixStatus:"Connected"})
        })
    });
}

module.exports = {connect:connect, send:send}