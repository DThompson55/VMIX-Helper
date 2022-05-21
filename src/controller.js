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
 try { sendScene(scene) }catch(c){return {}}
 return  scnMgr.getDisplayText();
}

function setLastScene(){
 var scene = scnMgr.getLastScene()
 try { sendScene(scene) }catch(c){return {}}
 return  scnMgr.getDisplayText();
}

function setNextScene(){
 var scene = scnMgr.getNextScene()
 try { sendScene(scene) }catch(c){return {}}
 return  scnMgr.getDisplayText();
}

function setPreviousScene(){
 var scene = scnMgr.getPreviousScene()
 try { sendScene(scene) }catch(c){return {}}
 return  scnMgr.getDisplayText();
}

async function sendScene(scene, i=0){  // yes, this is recursive, so keep that i=0
    if ( i < scene.actions.length){
        var action = scene.actions[i];
        response = await vMix.send( action )
        sendScene(scene,++i)
    }
}


function getStatus(){
    return vMix.status;
}


module.exports = {connect:connect, sendScene: sendScene, setFirstScene: setFirstScene,
    setNextScene: setNextScene, setLastScene: setLastScene, loadSceneFile:loadSceneFile, 
    setPreviousScene: setPreviousScene, setScenes:setScenes, getStatus: getStatus}
    
