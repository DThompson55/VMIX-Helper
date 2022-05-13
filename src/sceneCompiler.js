const workbookTool = require('./workbookTool.js');

var sceneTemplate =    {"number": "INITIAL", description:"INITIAL", "actions":[] }
var cmdTemplate =      {"Function": "blank", "Input": -1}; // these have to be uppercase for vMix

var scenes = [];
var sceneNumber = 1;

function buildScenes(rows, callback){
    console.log(callback,"------------------")
    for (var i = 0 ; i < rows.length; i++){
        row = rows[i];
        let scene = newScene();
        var description = (row.orderOfService+" "+row.title+" "+row.person).trim();
        if (description.length < 1){
            description = row.shortTitle;
        }
        description = row.inputNumber+" - "+description
        // console.log(">>>"+description+"<<<");
        // break;
//        console.log(row, row.inputNumber, row.preAction, row.action, row.orderOfService)

        addToScene(scene,row.inputNumber,row.action,description)    // this would add the current row.action
        try {
        addToScene(scene,row[i+1].inputNumber,row[i+1].preAction)   // this would add the new preview usually
        if (nextrow.PreAction === "Overlay"){
            i++;
            addToScene(scene,row[i+1].inputNumber,row[i+1].preAction)   // this would add the new preview usually
        }
    }   catch(e){}
    }
    callback(null,scenes);
}



function newScene(){
    let scene = Object.assign({}, sceneTemplate); // new scene
//    console.log("New Scene",scene);
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
    if (action === "Fade"){
        delete cmd.Input;
        cmd.Duration = 1000;
    }
    if (description){
        scene.description = description;
    }
    scene.actions.push(cmd);
//    console.log(scene)
}

async function load(workbookPath, callback){
  await workbookTool.load(workbookPath,(err, rows, msg)=>{
  buildScenes(rows, (err,scenes) =>{
    callback(null,scenes,msg)
  })
})
}


module.exports = {load: load}
