const {shell} = require('electron')
//在用户的默认浏览器中打开网址
shell.openExternal('https://github.com')

shell.beep()
const link = document.querySelectorAll('a[href]')

Array.from(link).forEach((lns) => {
    const url = lns.getAttribute('href');
    if (url.indexOf('http') == 0 ) {
        lns.onclick = (e) =>{
            e.preventDefault();
            console.log(url)
            shell.openExternal(url);
        }
    }
})