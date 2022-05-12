const fs = require('fs')
const stream = require('stream');
const Transform = stream.Transform || require('readable-stream').Transform;
const xmlProxy = require('./xmlReader')
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const scnMgr = require('./sceneManager.js')
const axiosWrapper = require('./AxiosWrapper.js')
const validator = require('./validator.js')
var mainWindow;
function setMainWindow(x){
    x.webContents.send('FILE_OPEN', "")
    mainWindow = x;
}
async function getMainWindow(){
    return mainWindow;
}

function connectvMix(callback){
    getvMixConfig('data/4-13-2022.xml', function(data,status){
            callback(data, status);
        });
    }

function loadSceneFile(csvFilePath,callback){
        scnMgr.loadSceneFile(csvFilePath, function(x){
            console.log("we loaded the scenes")
            callback(x);
        });
    }

function setScenes(x){scnMgr.setScenes(x)}

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

async function sendScene(scene, i=0){
    if ( i < scene.actions.length){
        if ( i > 0 ) await sleep(1000) // this will drive me nuts, but it works
        var action = scene.actions[i];
        await axiosWrapper.vMixSend("/api", action, x => {
            sendScene(scene,++i)
        });
    }
}

async function sendSceneX(scene){
    for (var i =0; i < scene.actions.length; i++){
        var action = scene.actions[i];
        await axiosWrapper.vMixSend("/api", action, callback);
    }
}

//
// maybe this is not actually connected yet? not finished yet?
//
async function getvMixConfig(filePath, callback){
    if (!process.env.VMIX_ENV){ // if not dev mode
    await axiosWrapper.vMixSend("/api", {}, function (err, data){
            if (err) {
                callback(data, "Failed to connect to vMix")
            }
            connectionStatus = "connected to vMix";
            parser.parseString(data, function(data,callback){
                
            })
    });
    } else {
            fs.readFile( filePath, function(err, data) {
            if (err) {
                callback(data, "Dev Mode: vMix test schema failed",filePath);
            }
            parser.parseString(data.toString().replace(/&/g,"&amp;"), function(data){
                connectionStatus = "Dev Mode: vMix test schema loaded";
                callback(data, connectionStatus)

            })
        });
    }
}

function validate(vMixData,scenes){

}


module.exports = {sendScene: sendScene, setFirstScene: setFirstScene, 
    setNextScene: setNextScene, setLastScene: setLastScene, loadSceneFile:loadSceneFile, connectvMix:connectvMix,
    setPreviousScene: setPreviousScene, setScenes:setScenes, validate: validate}
    
