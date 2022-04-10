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

   const reply = ipc.sendSync('initScenes')
   document.querySelector('#current-scene').innerHTML = reply.currentSceneName
   document.querySelector('#next-scene').innerHTML = reply.nextSceneName
   document.querySelector('#init-message').innerHTML = "connected";



  const fwdBtn = document.querySelector('#fwdBtn')
  fwdBtn.addEventListener('click', () => {
   const reply = ipc.sendSync('fwdBtnMsg')

   document.querySelector('#current-scene').innerHTML = reply.currentSceneName
   document.querySelector('#next-scene').innerHTML = reply.nextSceneName
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
   document.querySelector('#current-scene').innerHTML = reply.currentSceneName
   document.querySelector('#next-scene').innerHTML = reply.nextSceneName
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

   document.querySelector('#current-scene').innerHTML = reply.currentSceneName
   document.querySelector('#next-scene').innerHTML = reply.nextSceneName
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

   document.querySelector('#current-scene').innerHTML = reply.currentSceneName
   document.querySelector('#next-scene').innerHTML = reply.nextSceneName
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


