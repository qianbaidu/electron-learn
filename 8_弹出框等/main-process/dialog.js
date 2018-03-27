const {dialog} = require('electron')

dialog.showErrorBox('这里是--错误提示标题','这里是---错误提示内容');

dialog.showMessageBox({
    type :'info',
    title:'message',
    message:'hello',
    buttons:['ok','cancel'],

},(index) =>{
    if (index == 0) {
        console.log(0 + "===ok");
    }else {
        console.log(index+ "==cancel");
    }
})


dialog.showOpenDialog({
    properties:['openFile','openDirectory'] //文件、目录
},(files) =>{
    console.log(files);
})

dialog.showSaveDialog({
    title:"保存确认提示框",
    filters:[
        {name :'some',extensisons:['.txt']}
    ]
},(files)=>{
    console.log(files);
})