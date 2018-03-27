const clickOpenLink = document.querySelector("#clickOpenLink")
const clickOpenLoaclFile = document.querySelector("#clickOpenLoaclFile")
const path = require('path')
const BrowserWindow = require('electron').remote.BrowserWindow;

let win;


clickOpenLink.onclick = () => {
    window.open("https://www.baidu.com");

    win = new BrowserWindow({
        with:320,
        height:480,
        frame:false
    });

    win.on('close',() => {
        win = null
    });

    // win.webContents.openDevTools();
    win.on('close',() => {
        win = null;
    });
};

clickOpenLoaclFile.onclick = () => {

    win = new BrowserWindow({
        with:50,
        height:50,
        frame:true //true有关闭、最小化、边框
    });

    win.on('close',() => {
        win = null
    });


    win.loadURL(path.join("file:",__dirname,'../model.html'));

    // win.webContents.openDevTools();
    win.on('close',() => {
        win = null;
    });
}