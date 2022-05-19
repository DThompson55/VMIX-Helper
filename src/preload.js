const electron = require('electron')
const ipc = electron.ipcRenderer;


window.addEventListener('DOMContentLoaded', () => {
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

      const reply = ipc.sendSync('rewindBtnMsg')
      setDescriptions(reply)

    })

  function setDescriptions(reply){
    document.querySelector('#current-scene').innerHTML = reply.currentSceneName
    document.querySelector('#next-scene').innerHTML = reply.nextSceneName
  }

  const fwdBtn = document.querySelector('#fwdBtn')
  fwdBtn.addEventListener('click', () => {
   const reply = ipc.sendSync('fwdBtnMsg')

  setDescriptions(reply)
  })

  fwdBtn.addEventListener('mousedown', () => {
    var image_id = fwdBtn;
    image_id.src = "images/fwdBtn_Gray.png";
  })

  fwdBtn.addEventListener('mouseup', () => {
    var image_id = fwdBtn;
    image_id.src = "images/fwdBtn.png";
  })

  const backBtn = document.querySelector('#backBtn')
  backBtn.addEventListener('click', () => {
   const reply = ipc.sendSync('backBtnMsg')
  setDescriptions(reply)
  })
  backBtn.addEventListener('mousedown', () => {
    var image_id = backBtn;
    image_id.src = "images/backBtn_Gray.png";
  })

  backBtn.addEventListener('mouseup', () => {
    var image_id = backBtn;
    image_id.src = "images/backBtn.png";
  })

  const ffBtn = document.querySelector('#ffBtn')
  ffBtn.addEventListener('click', () => {
   const reply = ipc.sendSync('ffBtnMsg')
   setDescriptions(reply)
  })

  ffBtn.addEventListener('mousedown', () => {
    var image_id = ffBtn;
    image_id.src = "images/ffBtn_Gray.png";
  })

  ffBtn.addEventListener('mouseup', () => {
    var image_id = ffBtn;
    image_id.src = "images/ffBtn.png";
  })

  const rewindBtn = document.querySelector('#rewindBtn')
  rewindBtn.addEventListener('click', () => {
   const reply = ipc.sendSync('rewindBtnMsg')
   setDescriptions(reply)
  })

  rewindBtn.addEventListener('mousedown', () => {
    var image_id = rewindBtn;
    image_id.src = "images/rewindBtn_Gray.png";
  })

  rewindBtn.addEventListener('mouseup', () => {
    var image_id = rewindBtn;
    image_id.src = "images/rewindBtn.png";
  })

})


