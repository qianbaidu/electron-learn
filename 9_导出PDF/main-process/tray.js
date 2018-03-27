/**
 * Created by Alex on 2018/3/24.
 */

const { Menu, Tray } = require('electron');
const path = require('path');

let appIcon = null;

appIcon = new Tray(path.join(__dirname,'./icon.png'));

const menu = Menu.buildFromTemplate([{
    label:'测试图标',
    click: function(){
        // appIcon.destory();
        console.log('测试图标点击事件')
        // appIcon.destory();

    }
}])

appIcon.setToolTip('my learn app');
appIcon.setContextMenu(menu);