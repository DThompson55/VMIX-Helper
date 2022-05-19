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
return {"currentSceneName":getScene(currentScene).description,
         "nextSceneName":getScene(currentScene+1).description,
          "buttons":getButtons(currentScene)}
}

function getButtons(n){
	var retval = retval = [true, true, true, true ]
	if ((n == 0 ) && (n == scenes.length)) { retval = [false, false, false, false ]}
    else{ if (n == 0 )                     { retval = [false, false, true,  true  ]}
    else{ if ((n == scenes.length))        { retval = [true,  true,  false, false ]}
}}}


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
