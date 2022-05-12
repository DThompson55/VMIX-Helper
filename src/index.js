const controller = require("./controller.js")
const { dialog, app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
//
// TODO create a flexible initialization file loader
//

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // width: 400,
    // height: 600,
    webPreferences:{
      preload: path.join(__dirname, 'preload.js'),
      devTools: false // This will disable dev tools
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  mainWindow.webContents.on('did-finish-load', ()=>{

      console.log("process.env.VMIX_ENV is",process.env.VMIX_ENV)
      if (process.env.VMIX_ENV) {
        console.log("DEV Mode")
        let sceneFileName = "data/4-17-22 service plan.xlsx";
        controller.loadSceneFile(sceneFileName,scenes => {
           controller.setScenes(scenes);
           mainWindow.webContents.send('FILE_OPEN', "Dev Data:"+sceneFileName)
           checkvMix(scenes);
         })
      } else {
         console.log("Not DEV Mode")
      }
  })

function checkvMix(scenes){
   console.log("Checking with VMIX")
   controller.connectvMix((vMixData, status)=>{
      mainWindow.webContents.send('VMIX_STATUS', status);
      console.log("Checking with VMIX",status)
      controller.validate(vMixData,scenes,(validation)=>{
         console.log("Validating VMIX",status)
         mainWindow.webContents.send('validation', validation)
      })
   })
}

//-------------------------------
const template = [
   {
      label: 'Menu',
      submenu: [
         { label: "open", click(){
            
             dialog.showOpenDialog({
                properties: ['openFile']
              })
              .then(function(fileObj) {
                 // the fileObj has two props 
                 if (!fileObj.canceled) {
                     controller.loadSceneFile(fileObj.filePaths[0], function(scenes){
                     controller.setScenes(scenes);
                     mainWindow.webContents.send('FILE_OPEN', fileObj.filePaths[0])
                     checkVmix(scenes);
                     })
                 }
              })
  // should always handle the error yourself, later Electron release might crash if you don't 
              .catch(function(err) {
                 console.error(err)  
              })
         }},
         { label: "exit", click(){
            app.quit();
         }}]
   },
   {
      role: 'window',
      submenu: [
         {
            role: 'minimize'
         },
         {
            role: 'close'
         }
      ]
   },
   
   {
      role: 'help',
      submenu: [
         {
            label: 'Learn More'
         }
      ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)





}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


ipcMain.on('initScenes', (event, arg) => {
   event.returnValue = controller.setFirstScene()
})
ipcMain.on('fwdBtnMsg', (event, arg) => {
   event.returnValue = controller.setNextScene()
})
ipcMain.on('backBtnMsg', (event, arg) => {
   event.returnValue = controller.setPreviousScene()
})
ipcMain.on('ffBtnMsg', (event, arg) => {
   event.returnValue = controller.setLastScene()
})
ipcMain.on('rewindBtnMsg', (event, arg) => {
   event.returnValue = controller.setFirstScene()
})
ipcMain.on('getStatus', (event, arg) => {
   event.returnValue = controller.getStatus()
})
ipcMain.on('getFileName', (event, arg) => {
   event.returnValue = controller.getFileName()
})



