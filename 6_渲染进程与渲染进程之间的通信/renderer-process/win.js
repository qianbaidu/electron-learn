/**
 * Created by Alex on 2018/3/24.
 */

const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');

const btn = document.querySelector('#new-win-click');

let parentWindowId ;

onload = () => {
    ipcRenderer.on('msgChannel',(event,winId,msg) => {
        const currentWinId = BrowserWindow.getFocusedWindow().id;
        console.log("当前-新窗口 ID === "+currentWinId+ " 发送方来源窗口id=== " + winId)
        parentWindowId = winId
        let win = BrowserWindow.fromId(winId);
        console.log("新窗口接收到消息== msg " + msg.name+ msg.text);
        console.log("新窗口接回复消息=== {name:'wangwu',text:'world'} ");
        win.webContents.send('backMessageChannel',winId,{name:'wangwu',text:'world'})
    })
}



btn.onclick = () => {
    const winId = BrowserWindow.getFocusedWindow().id;
    let win = BrowserWindow.fromId(parentWindowId);
    win.webContents.send('backMessageChannel',winId,{name:'wangwu',text:'haha 给父窗口发送消息 啦啦啦'})
}
