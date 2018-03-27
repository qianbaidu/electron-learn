/**
 * Created by Alex on 2018/3/24.
 */

const {ipcRenderer} = require('electron');


const sendBtn = document.querySelector("#messageBtn");
sendBtn.onclick = ()=> {
    console.log("捕获点击事件，监听 messageChannel 消息")
    const msg = ipcRenderer.sendSync('messageChannel');
    console.log(msg);
}