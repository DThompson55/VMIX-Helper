const axios = require('axios').default;

var host = "http://localhost:8088"; // could parameterize this TTD
var connected = true;
var vmixConnectionStatus = "vMix Connected"
async function vMixSend(endpoint,params,callback) {
  console.log(vmixConnectionStatus, connected)
  if (connected){
      try {
        const response = await axios.get(host+endpoint, {params});
        console.log("ok resp from VMIX - ", params)
        callback(null,vmixConnectionStatus,response);
      } catch (error) {
        connected = false;
        console.log("bad resp from VMIX - ", params)
        vmixConnectionStatus = "vMix not Connected"
        callback(error.message,vmixConnectionStatus,null);
      }
  } else {
    callback(null,vmixConnectionStatus,null);
  }
} 

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


async function getStatus(callback){
  try{
    await sleep(1000)
    await vMixSend("/api", {}, (err, connectionStatus) => {
       callback(null, connectionStatus)                
    })
    } catch (err){
      console.log(err);
      callback(err.message, "vMix not Connected")
    }
}

exports.vMixSend = vMixSend
exports.getStatus = getStatus
