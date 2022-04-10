const scenes = require('../data/scenes.json').scenes

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
return {"currentSceneName":getScene(currentScene).name,"nextSceneName":getScene(currentScene+1).name}
}

function getFullDisplayText(){
return {"currentSceneName":getScene(currentScene),"nextSceneName":getScene(currentScene+1)}
}

function getScene(n){
	if (n < scenes.length)
		return scenes[n].scene;
	else
		return {"name": "No More Scenes", "actions":[]}
}

function loadSceneFile(filename="scenes.csv"){
// TBD
}

exports.getFirstScene    = getFirstScene
exports.getNextScene     = getNextScene
exports.getPreviousScene = getPreviousScene
exports.getLastScene     = getLastScene

exports.getDisplayText   = getDisplayText
exports.getFullDisplayText   = getFullDisplayText

exports.loadSceneFile    = loadSceneFile

