'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

log.transports.file.level = 'debug'
autoUpdater.logger = log

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  log.info('------createWindow start')
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(winURL)
  autoUpdater.setFeedURL({
    provider: 'generic',
    channel: 'stable',
    // url: 'http://myrelease.in.hillinsight.com:80/download/win-latest/windows_64/'
    url: 'http://localhost:80/download/test/build'
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

/**
 * 发送自动更新相关状态
 * @param {*} text 更新描述
 */
function sendAutoUpdateStatus (text) {
  log.info(text)
  console.log(text)
  mainWindow.webContents.send('autoUpdateStatus', text)
}

ipcMain.on('checkUpdate', (event, arg) => {
  log.info('ipcMain.on checkUpdate')
  log.info(event)
  log.info(arg)
  // 执行检查更新
  autoUpdater.checkForUpdates()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
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

app.on('ready', () => {
  createWindow()

  // if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
