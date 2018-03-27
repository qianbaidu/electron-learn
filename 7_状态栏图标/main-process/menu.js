/**
 * Created by Alex on 2018/3/24.
 */
const { ipcMain, BrowserWindow } = require('electron');
const { Menu, app } =  require('electron');


let template = [
    {
        label: 'one', //默认会被electron替换掉
        submenu: [
            {
                label: '第一个菜单项'
            },
            {
                type: 'separator'
            },
            {
                label: '第二个菜单项（点击有事件）',
                click: () => {
                    console.log('我被点击了')
                }
            },

        ]
    },
    {
        label :'第二个菜单',
        submenu: [
            {
                label:'第一个菜单项'
            },
            {
                label:'第二个菜单项'
            }
        ]
    }
];

let menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu); //设置状态栏菜单

app.dock.setMenu(menu);


// 右键菜单
ipcMain.on('show-context-menu',(e)=>{
    const win = BrowserWindow.fromWebContents(e.sender);
    menu.popup(win);
});