const fs = require('fs')
const stream = require('stream');
//const Transform = stream.Transform || require('readable-stream').Transform;
const xmlProxy = require('./xmlReader')
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const scnMgr = require('./sceneManager.js')
const axiosWrapper = require('./AxiosWrapper.js')
const validator = require('./validator.js')
var mainWindow;


const devVMIXDataPath = "./data/4-17-2022-amps fixed.xml"


function setMainWindow(x){
    x.webContents.send('FILE_OPEN', "")
    mainWindow = x;
}
async function getMainWindow(){
    return mainWindow;
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
async function getvMixConfig(callback){
    if (!process.env.VMIX_ENV){ // if not dev mode
    await axiosWrapper.vMixSend("/api", {}, function (err, data){
            if (err) {
                throw new Exception("Failed to connect to vMix");
            }
            connectionStatus = "connected to vMix";
            parser.parseString(data, (err,result) => {
                if (err){
                    throw new Exception(e);
                }
                connectionStatus = "Dev Mode: vMix test schema loaded";
                callback(result, connectionStatus)                
            })
    });
    } else {
            fs.readFile( devVMIXDataPath, function(err, result) {
            if (err) {
                throw new Exception( "Dev Mode: vMix test schema failed ");
            }
            //var s = (data.toString().replace(/&/g,"&amp;"))
            var s = data.toString()
            parser.parseString(s, (err, result) => {
                if (err){
                    throw new Exception(e);
                }
                connectionStatus = "Dev Mode: vMix test schema loaded";
                callback(result, connectionStatus)
            })
        });
    }
}


function validate(vMixData,scenes,callback){
    callback("Called Validate")
}


module.exports = {sendScene: sendScene, setFirstScene: setFirstScene, getvMixConfig: getvMixConfig,
    setNextScene: setNextScene, setLastScene: setLastScene, loadSceneFile:loadSceneFile, 
    setPreviousScene: setPreviousScene, setScenes:setScenes, validate: validate}
    
