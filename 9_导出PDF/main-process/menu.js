/**
 * Created by Alex on 2018/3/24.
 */
const { ipcMain, BrowserWindow } = require('electron');
const { Menu, app } =  require('electron');




    var template = [{

      label: 'FromScratch',

      submenu: [{

        label: 'Quit',

        accelerator: 'CmdOrCtrl+Q',

        click: function() { app.quit(); }

      }]

    }, {

      label: 'Edit',

      submenu: [{

        label: 'Undo',

        accelerator: 'CmdOrCtrl+Z',

        selector: 'undo:'

      }, {

        label: 'Redo',

        accelerator: 'Shift+CmdOrCtrl+Z',

        selector: 'redo:'

      }, {

        type: 'separator'

      }, {

        label: 'Cut',

        accelerator: 'CmdOrCtrl+X',

        selector: 'cut:'

      }, {

        label: 'Copy',

        accelerator: 'CmdOrCtrl+C',

        selector: 'copy:'

      }, {

        label: 'Paste',

        accelerator: 'CmdOrCtrl+V',

        selector: 'paste:'

      }, {

        label: 'Select All',

        accelerator: 'CmdOrCtrl+A',

        selector: 'selectAll:'

      }]

    }];





let menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu); //设置状态栏菜单

app.dock.setMenu(menu);


// 右键菜单
ipcMain.on('show-context-menu',(e)=>{
    const win = BrowserWindow.fromWebContents(e.sender);
    menu.popup(win);
});