/**
 * Created by Alex on 2018/3/24.
 */

const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const path = require('path');

const btn = document.querySelector('#new');

let win;

btn.onclick = () => {
    console.log("触发点击事件")
    const winId = BrowserWindow.getFocusedWindow().id;
    console.log("触发点击事件 窗口id = " + winId)

    win = new BrowserWindow ({
        width: 500,
        height: 500,
        show: true
    })

    win.loadURL(path.join('file:',__dirname,'../new-win.html'));
    console.log("触发点击事件 加载新窗口页面 = " + path.join('file:',__dirname,'../new-win.html'))
    win.webContents.openDevTools();
    win.webContents.on('did-finish-load',(event) => {
        console.log("触发点击事件 加载完成 通过 msgChannel 发送消息   {name:'zhangsan',text:'hello'} ")
        win.webContents.send('msgChannel',winId,{name:'zhangsan',text:'hello'});
    })

    ipcRenderer.on('backMessageChannel',(event,winId,msg)=>{
        console.log(winId);
        console.log(msg);
    })
}