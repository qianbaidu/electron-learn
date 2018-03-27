const path = require('path');

const option = {
    title : '通知消息标题',
    body : '通知消息内容',
    icon : path.join('./main-process/icon.png')
}

const testNotication = new window.Notification(option.title,option);

testNotication.onclick = () => {
    console.log('消息通知点击----触发事件');
}