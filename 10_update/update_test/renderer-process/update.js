const updateBtn = document.querySelector("#updateBtn");
const log = require('electron-log');
const {ipcRenderer,ipcMain} = require('electron');
let win;


updateBtn.onclick = () => {
    // 发送更新命令消息
    log.info('发送更新命令消息');
    ipcRenderer.send("checkUpdate",'check');

};





// ipcRenderer.on('autoUpdateStatus', (event, res) => {
//     log.info('接收、监听状态--');
//     log.info(res);
//     log.info(event);
//     this.updateStatus = res
// })

