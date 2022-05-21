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
currentScene = (scenes.length == 0)?0:scenes.length-1;
return getScene(currentScene)
}


function getDisplayText(){
return {"currentSceneName":getScene(currentScene).description,
        "nextSceneName":getScene(currentScene+1).description,
        "buttons":getButtons(currentScene),connectionStatus:""}
}

function getButtons(n){ // 1 = fwd, 2 = back, 4 = ff, 8 = rw
	var retval = 0; 
	if (n == scenes.length) { retval = 0xf}
    else{ if (n == 0 )                     { retval = 0xa}
    else{ if ((n == scenes.length-1))        { retval = 0x5}
	}
	}
	return retval;
}


function getScene(n){
	if (n < scenes.length)
		return scenes[n];
	else
		return {"description": "No More Scenes", "actions":[]}
}

function loadSceneFile(workbookPath, vMixCfg, callback){ // err, rows, connectionstatus
	loader.load(workbookPath, vMixCfg, callback);
}


// function tester(){
// 	loadSceneFile(__dirname+"/../data/4-17-22 service plan.xlsx");
// }

module.exports = {getFirstScene: getFirstScene,getNextScene: 
	getNextScene,getPreviousScene: getPreviousScene,getLastScene: 
	getLastScene,getDisplayText: getDisplayText,loadSceneFile: loadSceneFile, setScenes:setScenes}
