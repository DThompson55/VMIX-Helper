const scnMgr = require('./sceneManager.js')
const axiosWrapper = require('./AxiosWrapper.js')

function loadSceneFile(workbookPath,callback){
        scnMgr.loadSceneFile(workbookPath, callback);
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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


async function sendScene(scene, i=0){  // yes, this is recursive, so keep that i=0
    if ( i < scene.actions.length){
        console.log("SendScene Recursion",i,scene.actions[i]);
        if ( i > 0 ) await sleep(1000) // this will drive me nuts, but it works
        var action = scene.actions[i];
        await axiosWrapper.vMixSend("/api", action, (err, ctnxStatus) => {
            console.log("Sent Scene",ctnxStatus);
            if (err){ console.log(err,ctnxStatus);
            }
            sendScene(scene,++i)
        });
    }
}


function getvMixStatus(callback){
    axiosWrapper.getStatus(callback)
}

function getValidationStatus(callback){
    callback("Is Valid")
}


module.exports = {sendScene: sendScene, setFirstScene: setFirstScene,
    setNextScene: setNextScene, setLastScene: setLastScene, loadSceneFile:loadSceneFile, 
    setPreviousScene: setPreviousScene, setScenes:setScenes, getvMixStatus: getvMixStatus, getValidationStatus:getValidationStatus}
    
