var csv = require("csvtojson");
// Convert a csv file with csvtojson

var scenesTemplate =   {"scenes": []};
var sceneTemplate =    {"number": "INITIAL", Description:"INITIAL", "hasOverlay": false, "actions":[{"Function":"Fade", "Duration":"1000"}] }
var functionTemplate = {"Function": "FUNCTION", "Input": 1};

function rawActionstoScenes(rawActions){ //when parse finished, result will be emitted here.
    var scenes = [];
    var sceneNumber = 1;
    //
    // 34 is an overlay
    // 10 is a slide
    var scene = newScene({},scenes)
    for (var i = 6 ; i < 10; i++){
//    for (var i = 6 ; i < rawActions.length; i++){
        if (rawActions[i].field2 == ""){
            console.log("Empty Field 2 -- end of file?")
            break;
        }
        let action = actionCompiler(rawActions[i]);
        if (action.isNewScene){
            previousScene = scene;
            scene = newScene(action,scenes)   // this sets the comments, the fade is always automatically added
            sceneNumber++;
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
    else if (rawAction.field2.indexOf('O')>0) {rawAction.field1 = "Overlay"; }
    else if (rawAction.field3.indexOf('slide')==0) {rawAction.field1 = "Slide"; }

    var description = rawAction["Service Production Plan"]+" "+rawAction.field6+" "+rawAction.field3;

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
    return action;
}

function newScene(action, scenes){
    let scene = Object.assign({}, sceneTemplate); // new scene
    scene.description = action.description;
    scenes.push(scene);
    return scene;
}

function addToScene(scene, action){
    if (action.isOverlay) scene.hasOverlay = true;
    scene.actions.push(action.cmd);
    // if (!scene.description){
    //     scene.description = action.description;
    // }
}

function addOverlayOffToScene(scene, action){
 scene.actions.push({"Function":"Overlay1Off"});
 console.log("Add Overlay Off")   
}

async function init(csvFilePath="data/sample.csv"){
  console.log("READ CSV",csvFilePath)
  const rawActions = await csv().fromFile(csvFilePath);
  const scenes = rawActionstoScenes(rawActions);
  return scenes;
}


//buildPlan("../data/sample.csv") // tester
module.exports = {init: init}
