const {app,BrowserWindow} = require('electron');


const path = require('path');
const url = require('url');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    const URL = url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol: 'file', //协议
        slashes: true   //是否有双斜线
    });

    console.log(URL);
    win.loadURL(URL);
    win.webContents.openDevTools();
    win.on('close',() => {
        win = null;
    });

    require("./main-process/update.js")

}




app.on('ready',createWindow);

app.on('window-all-close',()=>{
    //mac 系统
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

// 点击最小化后,点击dock激活创建窗口
app.on('activate',()=>{
    console.log('active')
    if (win === null) {
        createWindow()
    }
})

