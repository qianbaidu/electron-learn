const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');

// import { autoUpdater } from 'electron-updater';
const log = require('electron-log');
const path = require('path');
const url = require('url');

log.transports.file.level = 'debug'
autoUpdater.logger = log

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    const URL = url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file', //协议
        slashes: true   //是否有双斜线
    });


    win.loadURL(URL);
    win.webContents.openDevTools();

    autoUpdater.setFeedURL({
        provider: 'generic',
        channel: 'stable',
        // url: 'http://myrelease.in.hillinsight.com:80/download/win-latest/windows_64/'
        url: 'http://localhost:80/download/test/build'
    });

    autoUpdater.checkForUpdates();

    win.on('close', () => {
        win = null;
    });

}

app.on('window-all-close', ()=> {
    //mac 系统
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// 点击最小化后,点击dock激活创建窗口
app.on('activate', ()=> {
    console.log('active')
    if (win === null) {
        createWindow()
    }
})


/**
 * 发送自动更新相关状态
 * @param {*} text 更新描述
 */
function sendAutoUpdateStatus(text) {
    log.info("sendAutoUpdateStatus -->");
    log.info("test");
    win.webContents.send('autoUpdateStatus', text);
}

ipcMain.on('checkUpdate', (event, arg) => {
    log.info('接收到更新命令');
    log.info(event);
    log.info(arg);
    // 执行检查更新
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
autoUpdater.on('checking-for-update', () => {
    console.log('正在检查更新...')
    sendAutoUpdateStatus('正在检查更新...')
})

autoUpdater.on('update-available', info => {
    console.log(`发现新版本（${info.version}）～，准备开始下载...`)
    sendAutoUpdateStatus(`发现新版本（${info.version}）～，准备开始下载...`)

    log.info(JSON.stringify(info))
})

autoUpdater.on('update-not-available', info => {
    sendAutoUpdateStatus('已经是最新版本~')
    console.log('已经是最新版本~')
    log.info(JSON.stringify(info))
})

autoUpdater.on('error', info => {
    console.log(`更新出错：${info}`)
    sendAutoUpdateStatus(`更新出错：${info}`)
})

autoUpdater.on('download-progress', (progressInfo) => {
    // let text = `下载速度${processObj.bytesPerSecond}，已下载${processObj.percent}%（${processObj.transferred}/${processObj.total}）`
    const info = `下载进度：${progressInfo.percent}%`
    console.log(info)
    sendAutoUpdateStatus(info)

    log.info(JSON.stringify(progressInfo))
})

autoUpdater.on('update-downloaded', () => {
    console.log('下载完成，准备安装更新～')
    sendAutoUpdateStatus('下载完成，准备安装更新～  3秒后将自动重启并安装新版本')
    // autoUpdater.quitAndInstall()
})


app.on('ready', ()=> {
    createWindow();
});


