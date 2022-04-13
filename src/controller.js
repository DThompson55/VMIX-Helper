const scnMgr = require('./sceneManager.js')
const axiosWrapper = require('./AxiosWrapper.js')

function init(){
//	scnMgr.loadSceneFile();
}

function setFirstScene(){
 var scene = scnMgr.getFirstScene()
 sendScene(scene)
 return  scnMgr.getDisplayText();
}

function setLastScene(){
 var scene = scnMgr.getLastScene()
 sendScene(scene)
 return  scnMgr.getDisplayText();
}

function setNextScene(){
 var scene = scnMgr.getNextScene()
 sendScene(scene)
 return  scnMgr.getDisplayText();
}

function setPreviousScene(){
 var scene = scnMgr.getPreviousScene()
 sendScene(scene)
 return  scnMgr.getDisplayText();
}

async function sendScene(scene){
	console.log("sendScene",JSON.stringify(scene))
	for (var i =0; i < scene.actions.length; i++){
		var action = scene.actions[i];
  		await axiosWrapper.sendFunctionToVMIX("/api", action);
	}
}

exports.init = init;
exports.sendScene = sendScene;
exports.setFirstScene = setFirstScene;
exports.setNextScene = setNextScene;
exports.setLastScene = setLastScene;
exports.setPreviousScene = setPreviousScene;
