/**
 * Created by Alex on 2018/3/24.
 */


const {ipcMain,ipcRenderer,autoUpdater} = require('electron');

const log = require('electron-log');
const path = require('path');
const url = require('url');

log.transports.file.level = 'debug'
autoUpdater.logger = log


var senderObj = null;


ipcMain.on('messageChannel', (event, arg)=> {
    console.log("[主线程] 接收到====",arg);
    senderObj  = event;


    checkUpdate();


    event.sender.send('messageChannel-2', {name: "zhangsan"});

})


function checkUpdate() {

    autoUpdater.setFeedURL({
        provider: 'generic',
        channel: 'stable',
        // url: 'http://myrelease.in.hillinsight.com:80/download/win-latest/windows_64/'
        url: 'http://localhost:80/download/test/build'
    });

    autoUpdater.checkForUpdates();
}

function sendAutoUpdateStatus(text) {
    log.info("sendAutoUpdateStatus -->");
    // senderObj.sender.send("test");
}


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
