const scnMgr = require('./sceneManager.js')
const csvReader = require('./readCSV.js')
const controller = require("./controller.js")
const xmlReader = require("./xmlReader.js")


//csvReader.read("../data/scenes.csv",console.log)

xmlReader.getvMixConfig('../data/4-17-2022-amps fixed.xml', function (err, result) {
    	for (var i = 0; i < result.vMix.inputs[0].input.length; i++) {
         //console.log(result.vMix.inputs[0].input[i].$,',');
        }
    });