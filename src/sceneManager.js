const loader = require('./sceneCompiler.js')

var scenes = [];

function setScenes(x){scenes = x; }

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

function loadSceneFile(workbookPath,callback){ // err, rows, connectionstatus
	loader.load(workbookPath, callback);
}


function tester(){
	loadSceneFile(__dirname+"/../data/4-17-22 service plan.xlsx");
}

module.exports = {getFirstScene: getFirstScene,getNextScene: 
	getNextScene,getPreviousScene: getPreviousScene,getLastScene: 
	getLastScene,getDisplayText: getDisplayText,getFullDisplayText: 
	getFullDisplayText,loadSceneFile: loadSceneFile, setScenes:setScenes}
