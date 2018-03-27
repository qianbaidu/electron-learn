/**
 * Created by Alex on 2018/3/24.
 */

const {ipcMain} = require('electron');

ipcMain.on('messageChannel', (event)=> {
    event.returnValue = "hello";
})


ipcMain.on('messageChannel-1', (event, arg)=> {
    console.log("[主线程] 接收到====",arg);
    console.log("[主线程] 发送====zhangsan");
    event.sender.send('messageChannel-1', {name: "zhangsan"});
    console.log("[主线程] 发送完====zhangsan");
})
