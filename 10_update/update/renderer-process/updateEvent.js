/**
 * Created by Alex on 2018/3/24.
 */

const {ipcRenderer} = require('electron');


const sendBtn = document.querySelector("#messageBtn");




sendBtn.onclick = ()=> {

    console.log("[渲染线程] send start");
    ipcRenderer.send("messageChannel", {name: "lisi"});



}