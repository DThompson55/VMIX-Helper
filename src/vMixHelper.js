const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const axiosWrapper = require('./AxiosWrapper.js')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function send(params){ //function (response)
        await sleep(1000) // vMix apparently needs some time to process, 
        // but how much time? Do I need to pass a time in?
        // maybe it jsut needs to wait for the response
        return axiosWrapper.vMixSend("/api", params)
}


async function connect(callback){//{httpResponse, status}

        try {
            response = await send({})
            parser.parseString(response.data, (err,result) => {
                callback({vMixCfg:result, vMixStatus:"Connected"})
            })
        } catch (err) {
                       if ( err.code ) 
                        callback({vMixCfg:null, vMixStatus:err.code+" http://"+err.address+":"+err.port})
                       else 
                        callback({vMixCfg:null,vMixStatus:"vMix Not Connected?"})
            }
        }

module.exports = {connect:connect, send:send}