var XLSX = require("xlsx");
var filename;// = "../data/4-17-22 service plan.xlsx";
var workbook;// = XLSX.readFile(filename);

var scenesTemplate =   {"scenes": []};
var sceneTemplate =    {"number": "INITIAL", description:"INITIAL", "actions":[] }
var cmdTemplate = {"Function": "blank", "Input": -1}; // these have to be uppercase for VMix


var scenes = [];
var sceneNumber = 1;

function buildScenes(ws, callback){
    function getCell(s){
        try {
            if (ws[s]) return ws[s].v;
            else return "";
        } catch(e){
            console.log("Failed to read Cell",s)
            throw new Error ("Failed to read Cell "+s);
        }
    }
    for (var row = 2 ; row < 100; row++){
        let scene = newScene()

        var inputNumber =getCell("B"+row);
        if (!inputNumber) break;
        var preAction =getCell("C"+row);
        var action =getCell("D"+row);
        var shortName =getCell("F"+row);
        var orderOfService =getCell("I"+row);
        var title =getCell("J"+row);
        var person =getCell("K"+row);
        var description = (orderOfService+" "+title+" "+person).trim();
        if (!description){
            description = shortName;
        }
        var nextPreAction =getCell("C"+(row+1));
        var nextInputNumber =getCell("B"+(row+1));

//        console.log(row, inputNumber, preAction, action, orderOfService)

        addToScene(scene,inputNumber,action,description)              // this would add the current action
        addToScene(scene,nextInputNumber,nextPreAction)   // this would add the new preview usually
        if (nextPreAction === "Overlay"){
            row++;
            var nextPreAction =getCell("C"+(row+1));
            var nextInputNumber =getCell("B"+(row+1));
            addToScene(scene,nextInputNumber,nextPreAction)   // this would add the new preview usually
        }
    }
    callback(scenes);
}



function newScene(){
    let scene = Object.assign({}, sceneTemplate); // new scene
    console.log("New Scene",scene);
    scene.number=sceneNumber++;
    scene.description="blank";
    scene.actions = [];
    scenes.push(scene);
    return scene;
}

function addToScene(scene, inputNumber, action, description){
    let cmd = Object.assign({}, cmdTemplate); // new scene
    if (action === "Preview"){
        action = "PreviewInput";
    }
    cmd.Function = action;
    cmd.Input = inputNumber;
    if (description){
        scene.description = description;
    }
    scene.actions.push(cmd);
    console.log(scene)
}

function read(xlsxFilePath,callback){
  var workbook = XLSX.readFile(xlsxFilePath);
  var ws = workbook.Sheets["Plan"];
  console.log("Reading",xlsxFilePath,ws);

  buildScenes(ws,callback)
}

function nullBack(x){}

//read("../data/4-17-22 service plan.xlsx",nullBack) // tester
module.exports = {read: read}
