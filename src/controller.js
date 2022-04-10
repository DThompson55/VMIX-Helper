const a = require('./sceneManager.js')
const axiosWrapper = require('./AxiosWrapper.js')


function init(){
	a.loadSceneFile();
}

function setFirstScene(){
 var scene = a.getFirstScene()
 sendScene(scene)
 return  a.getDisplayText();
}

function setLastScene(){
 var scene = a.getLastScene()
 sendScene(scene)
 return  a.getDisplayText();
}

function setNextScene(){
 var scene = a.getNextScene()
 sendScene(scene)
 return  a.getDisplayText();
}

function setPreviousScene(){
 var scene = a.getPreviousScene()
 sendScene(scene)
 return  a.getDisplayText();
}

async function sendScene(scene){
	console.log(JSON.stringify(scene))
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
