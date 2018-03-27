const {app ,globalShortcut, dialog } = require('electron');
//注册快捷键
app.on('ready', () => {
    globalShortcut.register('Cmd+Y',() => {
        dialog.showMessageBox({
            title :'快捷键',
            message: 'shortcut',
            type: 'info',
            detail: 'You already click cmd+Y',
            buttons: ['ok']
        })
    })

})

app.on('will-quit',() => {
    globalShortcut.unregisterAll();
})