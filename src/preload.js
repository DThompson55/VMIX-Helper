const electron = require('electron')
const ipc = electron.ipcRenderer;


window.addEventListener('DOMContentLoaded', () => {
  var buttonMask = 0;

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }

  ipc.on('VMIX_STATUS', (event, message) => {
   document.querySelector('#vmix-status').innerHTML = message;
  })

  ipc.on('validation', (event, message) => {
   document.querySelector('#validation').innerHTML = message;
  })

   const reply = ipc.sendSync('initScenes')
   setDescriptions(reply)
   document.querySelector('#vmix-status').innerHTML = "waiting for connection...";
 

   ipc.on('FILE_OPEN', (event, message) => {
      document.querySelector('#scene-file').innerHTML = message;
      document.querySelector('#buttons').style.display = "flex";
      document.querySelector('#no-file-loaded').style.display = "none";
      



      const reply = ipc.sendSync('rewindBtnMsg')
      setDescriptions(reply)

    })

  function setDescriptions(reply){
    document.querySelector('#current-scene').innerHTML = reply.currentSceneName;
    document.querySelector('#next-scene').innerHTML = reply.nextSceneName;
//    document.querySelector('#vmix-status').innerHTML = reply.vmixStatus;
   buttonMask = reply.buttons;
   try {updateButtons(buttonMask)} catch(e){}
}

  const backBtn = document.querySelector('#backBtn')
  const ffBtn = document.querySelector('#ffBtn')
  const rewindBtn = document.querySelector('#rewindBtn')
  const fwdBtn = document.querySelector('#fwdBtn')

function updateButtons(buttonMask){
   var image_id = fwdBtn; image_id.src = ((((buttonMask&1)==0))?"images/fwdBtn.png":    "images/fwdBtn_Disabled.png")         ;
   image_id = backBtn;    image_id.src = ((((buttonMask&2)==0))?"images/backBtn.png":   "images/backBtn_Disabled.png")        ;
   image_id = ffBtn;      image_id.src = ((((buttonMask&4)==0))?"images/ffBtn.png":     "images/ffBtn_Disabled.png")          ;
   image_id = rewindBtn;  image_id.src = ((((buttonMask&8)==0))?"images/rewindBtn.png": "images/rewindBtn_Disabled.png")      ;
   image_id = fwdBtn;     image_id.style.pointerEvents = ((((buttonMask&1)==0))?"auto" :"none"); 
   image_id = backBtn;    image_id.style.pointerEvents = ((((buttonMask&2)==0))?"auto" :"none"); 
   image_id = ffBtn;      image_id.style.pointerEvents = ((((buttonMask&4)==0))?"auto" :"none"); 
   image_id = rewindBtn;  image_id.style.pointerEvents = ((((buttonMask&8)==0))?"auto" :"none"); 
}  

  fwdBtn.addEventListener   ('click', () => {const reply = ipc.sendSync('fwdBtnMsg');    setDescriptions(reply); })
  backBtn.addEventListener  ('click', () => {const reply = ipc.sendSync('backBtnMsg');   setDescriptions(reply); })
  ffBtn.addEventListener    ('click', () => {const reply = ipc.sendSync('ffBtnMsg');     setDescriptions(reply); })
  rewindBtn.addEventListener('click', () => {const reply = ipc.sendSync('rewindBtnMsg'); setDescriptions(reply); })

  fwdBtn.addEventListener   ('mousedown', () => { var image_id = fwdBtn;     image_id.src = ((((buttonMask&1)==0))?"images/fwdBtn_Gray.png":   "images/fwdBtn_Disabled.png")    })
  fwdBtn.addEventListener   ('mouseup', () => {   var image_id = fwdBtn;     image_id.src = ((((buttonMask&1)==0))?"images/fwdBtn.png":        "images/fwdBtn_Disabled.png")    })
  backBtn.addEventListener  ('mousedown', () => { var image_id = backBtn;    image_id.src = ((((buttonMask&2)==0))?"images/backBtn_Gray.png":  "images/backBtn_Disabled.png")   })
  backBtn.addEventListener  ('mouseup', () => {   var image_id = backBtn;    image_id.src = ((((buttonMask&2)==0))?"images/backBtn.png":       "images/backBtn_Disabled.png")   })
  ffBtn.addEventListener    ('mousedown', () => { var image_id = ffBtn;      image_id.src = ((((buttonMask&4)==0))?"images/ffBtn_Gray.png":    "images/ffBtn_Disabled.png")     })
  ffBtn.addEventListener    ('mouseup', () => {   var image_id = ffBtn;      image_id.src = ((((buttonMask&4)==0))?"images/ffBtn.png":         "images/ffBtn_Disabled.png")     })
  rewindBtn.addEventListener('mousedown', () => { var image_id = rewindBtn;  image_id.src = ((((buttonMask&8)==0))?"images/rewindBtn_Gray.png":"images/rewindBtn_Disabled.png") })
  rewindBtn.addEventListener('mouseup', () => {   var image_id = rewindBtn;  image_id.src = ((((buttonMask&8)==0))?"images/rewindBtn.png":     "images/rewindBtn_Disabled.png") })

})

