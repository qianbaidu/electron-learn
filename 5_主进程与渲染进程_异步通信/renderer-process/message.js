/**
 * Created by Alex on 2018/3/24.
 */

const {ipcRenderer} = require('electron');


const sendBtn = document.querySelector("#messageBtn");
sendBtn.onclick = ()=> {
    console.log("[渲染线程] 捕获点击事件，监听 messageChannel 消息")
    const msg = ipcRenderer.sendSync('messageChannel');
    console.log("[渲染线程] 获取同步内容===="+msg);

    console.log("[渲染线程] 开始发送====lisi");
    ipcRenderer.send("messageChannel-1", {name: "lisi"});
    console.log("[渲染线程] 发送完====lisi");
    console.log("[渲染线程] 监听====");
    ipcRenderer.on("messageChannel-1", function (event, arg) {
        console.log("[渲染线程] 接收到====",arg);
        console.log(arg.name)
    })
}