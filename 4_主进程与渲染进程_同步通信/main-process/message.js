/**
 * Created by Alex on 2018/3/24.
 */

const {ipcMain} = require('electron');

ipcMain.on('messageChannel', (event)=> {
    event.returnValue = "hello";
})