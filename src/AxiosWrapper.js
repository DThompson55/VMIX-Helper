const axios = require('axios').default;

var host = "http://localhost:8088"; // could parameterize this TTD
var connected = true;
var vmixConnectionStatus = "vMix Connected"
async function vMixSend(endpoint,params,callback) {
  if (connected){
      try {
        const response = await axios.get(host+endpoint, {params});
        callback(null,vmixConnectionStatus);
      } catch (error) {
        connected = false;
        vmixConnectionStatus = "vMix not Connected"
        callback(error.message,vmixConnectionStatus);
      }
  } else {
    callback(null,vmixConnectionStatus);
  }
}

async function getStatus(callback){
  try{
    await axiosWrapper.vMixSend("/api", {}, (err, connectionStatus) => {
       callback(null, connectionStatus)                
    })
    } catch (err){
      callback(err.message, "vMix not Connected")
    }
}

exports.vMixSend = vMixSend
exports.getStatus = getStatus
