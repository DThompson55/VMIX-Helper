const axios = require('axios').default;
var querystring = require('querystring');

var host = "http://localhost:8088"; // could parameterize this TTD

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function VMixSend(endpoint,params, callback) {
  console.log("SEND TO VMIX",JSON.stringify(params))
  try {
    const response = await axios.get(host+endpoint, {params});
    if (callback) callback(response);
  } catch (error) {
    console.log("REST Call Fail",endpoint,JSON.stringify(params));
    if (callback) callback(error);
  }
}

exports.VMixSend = VMixSend
