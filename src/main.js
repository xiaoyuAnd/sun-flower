const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
console.log(xObject);
const simplifyUrl = (url) =>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')
 }
const hashMap = xObject || [
    {
        logo:'j',
        url:'https://juejin.cn/'
    },
    {
        logo:'w',
        url:'https://wangdoc.com/'
    },
    {
        logo:'b',
        url:'http://www.bilibili.com/'
    },
    {
        logo:'c',
        url:'https://caniuse.com/'
    }   ,
    {
        logo:'p',
        url:'https://ps.gaoding.com/#/'
    }      
]

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
     const $li = $(`
     <li>
           <div class="site">  
                <div class="logo">${simplifyUrl(node.url)[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                   <svg class="icon">
                      <use xlink:href="#icon-close"></use>
                   </svg>
                </div>
           </div>
     </li>`).insertBefore($lastLi)
     $li.on('click',()=>{
         window.open(node.url)
     })
     $li.on('click','.close',(e)=>{
        e.stopPropagation()
        hashMap.splice(index,1)
        render()
     })
 })
}
render()
$('.addButton').on('click',()=>{
    let url = window.prompt('请输入网址')
    if(url.indexOf('http')!==0){
        url = 'https://' + url
    }
   hashMap.push({logo:url[0],url:url})
   render()
})

window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    // console.log(e.key);
    const {key} = e
    // console.log(key);
    for(let i = 0; i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            console.log(111);
            window.open(hashMap[i].url)
        } 
    }
})

