const axios = require('axios').default;

var host = "http://localhost:8088"; // could parameterize this TTD

async function vMixSend(endpoint,params,callback) {
        const response = await axios.get(host+endpoint, {params});
        callback(response);
} 

exports.vMixSend = vMixSend
