//const scenes = require("../data/long_scenes.json")
//const scenes = require('../data/scenes.json')
const scenes = require('./readCSV.js').init("data/scenes.csv")


console.log(scenes[0])

var currentScene = 0;

function getNextScene(){
if (currentScene < scenes.length-1) currentScene++;
return getScene(currentScene)
}

function getPreviousScene(){
if (currentScene > 0) currentScene--;
return getScene(currentScene)
}

function getFirstScene(){
currentScene = 0;
return getScene(currentScene)
}

function getLastScene(){
currentScene = scenes.length-1;
return getScene(currentScene)
}


function getDisplayText(){
return {"currentSceneName":getScene(currentScene).description,"nextSceneName":getScene(currentScene+1).description}
}

function getFullDisplayText(){
return {"currentSceneName":getScene(currentScene),"nextSceneName":getScene(currentScene+1)}
}

function getScene(n){
	if (n < scenes.length)
		return scenes[n];
	else
		return {"description": "No More Scenes", "actions":[]}
}

async function loadSceneFile(filename="scenes.csv"){
	var scenesPromise = await csvReader.init("data/scenes.csv",callback)
    async function callback(s){
	}
}


exports.getFirstScene    = getFirstScene
exports.getNextScene     = getNextScene
exports.getPreviousScene = getPreviousScene
exports.getLastScene     = getLastScene

exports.getDisplayText   = getDisplayText
exports.getFullDisplayText   = getFullDisplayText

exports.loadSceneFile    = loadSceneFile

