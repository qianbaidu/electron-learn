/**
 * Created by Alex on 2018/3/24.
 */
const ipc = require('electron').ipcRenderer;

const menu = document.querySelector('#menu');

document.oncontextmenu =  menu.onclick = () => {
    ipc.send('show-context-menu');
}