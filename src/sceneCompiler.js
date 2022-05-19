const workbookTool = require('./workbookTool.js');

var sceneTemplate =    {"number": "INITIAL", description:"INITIAL", "actions":[] }
var cmdTemplate =      {"Function": "blank", "Input": -1}; // these have to be uppercase for vMix

var scenes = [];
var sceneNumber = 1;

function buildScenes(rows, callback){
    console.log("Row Length reported",rows.length)

    for (var i = 0 ; i < rows.length; i++){
        row = rows[i];
        try {
            let scene = newScene();
            var description = (row.orderOfService+" "+row.title+" "+row.person).trim();
            if (description.length < 1){
                description = row.shortTitle;
            }
            description = (i+1)+"-"+row.inputNumber+" - "+description
            addToScene(scene,row.inputNumber,row.action,description)    // this would add the current row.action


            for (var j = 1; j < 3; j++ ) {
                if ( (i+j) < rows.length ) {   
                    row = rows[i+j]
                    if ( row.preAction.indexOf("Overlay")==0) {
                    row = rows[i+j];
                        addToScene(scene,row.inputNumber,row.preAction)   // this would add the new preview usually
                        i++; //because Overlays never become scenes themselves
                        j--; // bump the index down again
                    } else {
                        addToScene(scene,row.inputNumber,row.preAction)   
                        break;
                    } 
                }
            }
        } catch(e) {console.log("SceneCompiler.BuildScenes",i,e.message)}
    }   
    callback(null,scenes);
}



function newScene(){
    let scene = Object.assign({}, sceneTemplate); // new scene
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
}

async function load(workbookPath, vMixCfg, callback){
  await workbookTool.load(workbookPath, vMixCfg, (err, rows, msg)=>{
  buildScenes(rows, (err,scenes) =>{
    callback(null,scenes,msg)
  })
})
}


module.exports = {load: load}
