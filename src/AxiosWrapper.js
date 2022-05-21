const axios = require('axios').default;

var host = "http://localhost:8088"; // could parameterize this TTD

async function vMixSend(endpoint,params) {
      const response = axios.get(host+endpoint, {params})
      return response;
} 

exports.vMixSend = vMixSend

//UnhandledPromiseRejectionWarning: Error: connect ECONNREFUSED 127.0.0.1:8088