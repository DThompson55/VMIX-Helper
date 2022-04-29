const fs = require('fs')
const stream = require('stream');
const Transform = stream.Transform || require('readable-stream').Transform;
const xmlProxy = require('./xmlReader')
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const scnMgr = require('./sceneManager.js')
const axiosWrapper = require('./AxiosWrapper.js')

function init(csvFile,callback){
	scnMgr.loadSceneFile(csvFile,callback);
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

async function sendScene(scene, i=0){
    if ( i < scene.actions.length){
        var action = scene.actions[i];
        await axiosWrapper.VMixSend("/api", action, x => {
//            console.log(x)
            sendScene(scene,++i)
        });
    }
}

async function sendSceneX(scene){
    for (var i =0; i < scene.actions.length; i++){
        var action = scene.actions[i];
        await axiosWrapper.VMixSend("/api", action, callback);
    }
}

async function getVMixConfig(filePath,callback){
    if (!filePath) {
        console.log("trying API");
        await axiosWrapper.VMixSend("/api", {}, function (err, data){
            if (err) {
                return console.log(err);
            }
            parser.parseString(data, callback);
    });
    } else {
        console.log("going for the file");
            fs.readFile( filePath, function(err, data) {
            if (err) {
                return console.log(err);
            }

            parser.parseString(data.toString().replace(/&/g,"&amp;"), callback);
        });
        }

  /**
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream("data/fixed.xml");
        const fixedXMLStream = new Transform({
        transform (data, encoding, callback) {
            const reversedData = data.toString().replace(/&/g,"&amp;");
            this.push(reversedData);
            callback();
            }
        });
        readStream.pipe(fixedXMLStream).pipe(writeStream).on('finish', () => {
            console.log("Finished reversing the contents of ${filePath}");
        });
        }
        **/
    }
    


getVMixConfig('data/4-13-2022.xml',console.log)

//getVMixConfig('data/4-17-2022-amps fixed.xml',console.log)

module.exports = {init: init, sendScene: sendScene, setFirstScene: setFirstScene, 
    setNextScene: setNextScene, setLastScene: setLastScene, 
    setPreviousScene: setPreviousScene, setScenes:setScenes, getVMixConfig: getVMixConfig}
    
