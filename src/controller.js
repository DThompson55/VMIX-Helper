const scnMgr = require('./sceneManager.js')
const vMix = require('./vMixHelper.js')

function connect(callback){ //{vMixCfg:result, vMixStatus:"Connected"}
console.log("CONNECTING...");
    vMix.connect(callback)
}

function loadSceneFile(workbookPath, vMixCfg, callback){
        scnMgr.loadSceneFile(workbookPath, vMixCfg, callback);
    }

function setScenes(scenes){scnMgr.setScenes(scenes)}

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

async function sendScene(scene, i=0){  // yes, this is recursive, so keep that i=0
    try{
    if ( i < scene.actions.length){
        var action = scene.actions[i];
        response = await vMix.send( action )
        if ( response.status != "200") throw new Error(response.statusText);
        sendScene(scene,++i)
    }
  } catch (err) {console.log(err.message)}
}


function getStatus(){
    return vMix.status;
}


module.exports = {connect:connect, sendScene: sendScene, setFirstScene: setFirstScene,
    setNextScene: setNextScene, setLastScene: setLastScene, loadSceneFile:loadSceneFile, 
    setPreviousScene: setPreviousScene, setScenes:setScenes, getStatus: getStatus}
    
