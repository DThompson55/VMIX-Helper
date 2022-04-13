var csv = require("csvtojson");
// Convert a csv file with csvtojson

var scenesTemplate =   {"scenes": []};
var sceneTemplate =    {"sceneNumber": "0", description:"", "hasOverlay": false, "actions":[] }
var functionTemplate = {"Function": "FUNCTION", "Input": 1};

var scenes = [];
var sceneNumber = 1;

function rawActionstoScenes(rawActions){ //when parse finished, result will be emitted here.

    //
    // 31 is an overlay
    // 10 is a slide
    var scene = {"hasOverlay":false}
//    for (var i = 30 ; i < 34; i++){
    for (var i = 6 ; i < rawActions.length; i++){
        if (rawActions[i].field2 == ""){
            console.log("Empty Field 2 -- end of file?")
            break;
        }
        let action = actionCompiler(rawActions[i]);

        if (action.isNewScene){
            previousScene = scene;
            scene = createNewScene()
            addToScene(scene,action)   // this would add the new preview usually
            if (previousScene.hasOverlay){
                addOverlayOffToScene(scene);
            }
        } else {
            addToScene(scene,action)   // this would add the new preview usually    
        }   
    }
    return scenes;
}

function actionCompiler(rawAction){
    var r = /\d+/;
    var inputNumber = (rawAction.field2.match(r))[0]; 

    if (!isNaN(rawAction.field2)) {rawAction.field1 = "Normal"; }
    else if (rawAction.field2.indexOf('O')>=0) {rawAction.field1 = "Overlay"; }
    else if (rawAction.field3.indexOf('slide')==0) {rawAction.field1 = "Slide"; }

    var description = (rawAction["Service Production Plan"]+" "+rawAction.field6+" "+rawAction.field3).trim();

    var action = {};
    switch(rawAction.field1){
    case "Camera": 
		action = {isNewScene:true, isOverlay:false, cmd:{"Function":"Record"},"description":description};
		break;
    case "Video":  
		action = {isNewScene:true, isOverlay:false, cmd:{"Function":"Preview","Input":inputNumber},"description":description};
		break;
    case "Slide":  
		action = {isNewScene:true, isOverlay:false, cmd:{"Function":"Preview","Input":inputNumber},"description":description};
		break;
    case "Overlay": 
		action = {isNewScene:false, isOverlay:true,  cmd:{"Function":"Preview","Input":inputNumber},"description":description};
		break;
    default: 
		action = {isNewScene:true, isOverlay:false, cmd:{"Function":"Preview","Input":inputNumber},"description":description};
		}
        //console.log("Raw",rawAction)
        //console.log("Compiled",action)
    return action;
}

function createNewScene(){
    let action = {"Function":"Fade", "Duration":"1000"}
    let s = JSON.stringify(sceneTemplate)
    var scene = JSON.parse(s); // new scene
    scene.sceneNumber = sceneNumber++;
    scene.actions.push(action);
    scene.description = "";
    scenes.push(scene);
    return scene;
}

function addToScene(scene, action){
    if (action.isOverlay) scene.hasOverlay = true;
    scene.actions.push(action.cmd);
    if (scene.description === ""){
         scene.description = action.description.trim();
     }
}

function addOverlayOffToScene(scene, action){
 scene.actions.push({"Function":"Overlay1Off"});
// console.log("Add Overlay Off")   
}

async function read(csvFilePath="data/scenes.csv", callback){
    console.log("--------------------------------------------")
  const rawActions = await csv().fromFile(csvFilePath);
  const scenes = rawActionstoScenes(rawActions);
  console.log(JSON.stringify(scenes));
  callback (scenes)
}


//buildPlan("../data/sample.csv") // tester
module.exports = {read: read}
