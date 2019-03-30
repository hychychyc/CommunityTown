
// var hour = 6;
// var minute = 0;
// var second = 0;
// //end: test
// window.innerWidth = 1536;

//背景大小
var body = document.getElementById("bg1");

var bodyWidth = body.clientWidth;
var bodyHeight = body.clientHeight;
//当前可视区域大小（窗口大小）
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//根据可视区域修改根的字体大小
document.getElementsByTagName('html')[0].style.fontSize = 100/1536*windowWidth + "px";
//调整container大小位置和滚动条位置
var container = document.getElementById("container");
container.style.width = windowWidth +"px";
// container.style.height = 864.8 + "px";
// container.style.left = bodyWidth*0.5 - 0.5*windowWidth + "px";
// container.style.top = bodyHeight*0.5 - 0.5*windowHeight + "px";

// if(windowWidth>=1536||windowHeight>=732.8){
//   container.style.width = 1536 +"px";
//   container.style.height = 732.8 +"px";
//   container.style.left = "0px";
//   container.style.top = "0px";
// }

console.log(window.innerWidth);
// window.scrollTo(bodyWidth*0.5 - 0.5*windowWidth,0)


// 6-6.30晚上渐变为凌晨，6.30-7凌晨渐变为白天，7-18保持白天不变，18-18.30白天渐变为傍晚，18.30-19傍晚渐变为晚上，19-6保持晚上不变
//根据时间更换背景图
//当用户打开网页，根据时间点设置bg1的图片，并设置bg2的图片和透明度
//若在变化时间内，则增加bg2的透明度并更新。完成第一次变化时，bg1和bg2的透明度都为1，且显示的是bg2，
//此时改变bg1的图片为下一次变化的目标图片，若在变化时间内，则减少bg2的透明度并更新。完成第二次变化时，bg2的透明度便为0，显示的是bg1.
//此时修改bg2的图片为下一次变化的目标图片，即回归到初始状态。之后循环即可。
// 分别对应凌晨（0）、白天（1）、傍晚（2）和晚上（3）
var imgs = ["img/社团小镇 首页新-02.png","img/社团小镇 首页新-01.png","img/社团小镇 首页新-02.png","img/社团小镇 首页新-03.png"];
var skys = ["img/社团小镇 首页新背景-02.jpg","img/社团小镇 首页新背景-01.jpg","img/社团小镇 首页新背景-02.jpg","img/社团小镇 首页新背景-03.jpg"];
function getImgIndex(hour,minute){
  var imgIndex;
  //白天
  if(hour>=7 && hour <=18){
    imgIndex = 1;
  }
  //晚上
  if(hour>=19 || hour<=6){
    imgIndex = 3;
  }
  //凌晨
  if(hour==6 && minute>=30){
    imgIndex = 0;
  }
  //傍晚
  if(hour==18 && minute>=30){
    imgIndex = 2;
  }
  return imgIndex;
}

function getOpacity(hour,minute){
  var opacity = 0;
  if(hour == 6 || hour == 18){
    if(minute>=30){
      opacity = (minute - 30)/30*1;
    }else{
      opacity = minute/30*1;
    }
  }
  return opacity;
}
// test
  // hour = 18;
  // minute = 0;
// end: test
function changeBg(){
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  // test
    // minute += 1;
    // if(minute == 60){
    //   minute -= 60;
    //   hour += 1;
    // }
    // if(hour == 24){
    //   hour -= 24;
    // }
    // console.log(hour);
    // console.log(minute);
  // end: test
  var bg1 = document.getElementById("bg1");
  var bg2 = document.getElementById("bg2");


  //设置初始状态
  bg1.src = imgs[getImgIndex(hour,minute)];
  bg2.src = imgs[(getImgIndex(hour,minute)+1)%4];
  bg2.style.opacity = getOpacity(hour,minute);
  sky1.src = skys[getImgIndex(hour,minute)];
  sky2.src = skys[(getImgIndex(hour,minute)+1)%4];
  sky2.style.opacity = getOpacity(hour,minute);
}
changeBg();
setInterval(changeBg,1000);




// 太阳月亮动画,6-19为太阳，19-6为月亮
// position: absolute；并根据时间来建立抛物线方程，实现太阳月亮的位置改变
//将单位改为rem, 其中rem:px = 1:100
//用15.36rem和7.328rem代替bodyWidth和bodyHeight
function getSunOrMoon(hour,minute,second){
  // var bodyWidth = document.getElementsByTagName("body")[0].clientWidth;
  // var bodyHeight = document.getElementsByTagName("body")[0].clientHeight;
  var t;
  var o ={
    src: "",
    width: 0,
    height: 0,
    top: 0,
    left: 0
  };
  if(hour >= 6 && hour<19){
    o.src = "img/社团小镇 首页太阳.png";
    o.width = 125/100;
    o.height = 130/100;
    // 13*60*60秒在x轴移动bodyWidth+width
    // 13*60*60/2秒在y轴移动0.2bodyHeight
    t = (hour-6)*3600 + minute*60 + second;
    o.left = t/13/60/60 * (15.36+o.width) - o.width;
    if(t-13*60*60/2 > 0){
      o.top = 0.3*7.328 + ((t-13*60*60/2)/(13*60*60/2))*((t-13*60*60/2)/(13*60*60/2))*0.2*7.328 - o.height*0.5;
    }else{
      o.top = 0.3*7.328 + (1-t/(13*60*60/2))*(1-t/(13*60*60/2))*0.2*7.328 - o.height*0.5;
    }
  }else{
    o.src = "img/社团小镇 首页月亮.png";
    o.width = 245/100;
    o.height = 244/100;
    // 11*60*60秒在x轴移动bodyWidth+width
    // 11*60*60/2秒在y轴移动0.2bodyHeight
    if(hour<19){
      hour += 24;
    }
    t = (hour-19)*3600 + minute*60 + second;
    o.left = t/11/60/60 * (15.36+o.width) - o.width;
    if(t-11*60*60/2 > 0){
      o.top = 0.3*7.328 + ((t-11*60*60/2)/(11*60*60/2))*((t-11*60*60/2)/(11*60*60/2))*0.2*7.328 - o.height*0.5;
    }else{
      o.top = 0.3*7.328 + (1-t/(11*60*60/2))*(1-t/(11*60*60/2))*0.2*7.328 - o.height*0.5;
    }
  }
  return o;
}

function moveSunOrMoon(){
  // // test
  //   second += 20;
  //   if(second == 60){
  //     second -= 60;
  //     minute += 1;
  //   }
  //   if(minute == 60){
  //     minute -= 60;
  //     hour += 1;
  //   }
  //   if(hour == 24){
  //     hour -= 24;
  //   }
  //   // console.log(hour);
  //   // console.log(minute);
  // // end: test

  // 6-19为太阳，共13小时
  // 19-6为月亮，共11小时
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var sunOrMoon = document.getElementById("sunOrMoon");
  
  var getter = getSunOrMoon(hour,minute,second);
  
  sunOrMoon.src = getter.src;
  sunOrMoon.style.width = getter.width + "rem";
  sunOrMoon.style.height = getter.height + "rem";
  sunOrMoon.style.left = getter.left + "rem";
  sunOrMoon.style.top = getter.top + "rem";
  // sunOrMoon.style.top = ;

  // left [-width,bodyWidth]
  // top [0.4H,0.6H]
}

  moveSunOrMoon();
  setInterval(moveSunOrMoon,7);

  console.log(window.innerWidth);
  //调整标题
  var caption = document.getElementById("caption");
  var oldCaptionWidth = caption.style.width;
  var oldCaptionHeight = caption.style.height;
  var oldCaptionTop = caption.style.top;
  var oldCaptionLeft = caption.style.left;
  var captionWidth;
  var captionHeight;
  var captionTop;
  var captionLeft;

    captionWidth = 3.36/1.25;

    
    captionLeft = 15.36*0.5 - captionWidth*0.5;
    // caption.style.width = captionWidth +"px";
    caption.style.left = captionLeft + "rem";


  // 随机出现人物
  let r1 = Math.floor(Math.random()*3);
  let r2 = Math.floor(Math.random()*3);
  let r3 = Math.floor(Math.random()*3);
  function displayPerson(){
    let W = H =0.01/1.25;
    //第一组人物
    let imgs1 = [
      {
        src: "img/人物/人物-02.png",
        width: 259*W,
        height: 200*H
      },
      {
        src: "img/人物/人物-05.png",
        width: 169*W,
        height: 209*H
      },
      {
        src: "img/人物/人物-06.png",
        width: 196*W,
        height: 202*H
      }
    ];
    //第二组人物
    let imgs2 = [
      {
        src: "img/人物/人物-03.png",
        width: 83*W,
        height: 198*H
      },
      {
        src: "img/人物/人物-08.png",
        width: 66*W,
        height: 202*H
      },
      {
        src: "img/人物/人物-09.png",
        width: 204*W,
        height: 195*H
      }
    ];
    //第三组人物
    let imgs3 = [
      {
        src: "img/人物/人物-01.png",
        width: 114*W,
        height: 181*H
      },
      {
        src: "img/人物/人物-04.png",
        width: 137*W,
        height: 194*H
      },
      {
        src: "img/人物/人物-07.png",
        width: 89*W,
        height: 195*H
      }
    ];

    let person1 = document.getElementById("person1");
    let person2 = document.getElementById("person2");
    let person3 = document.getElementById("person3");
    let img1 = imgs1[r1];
    let img2 = imgs2[r2];
    let img3 = imgs3[r3];
    person1.src = img1.src;
    person2.src = img2.src;
    person3.src = img3.src;
    person1.style.width = img1.width + "rem";
    person2.style.width = img2.width + "rem";
    person3.style.width = img3.width + "rem";
    person1.style.height = img1.height + "rem";
    person2.style.height = img2.height + "rem";
    person3.style.height = img3.height + "rem";
    person1.style.left = 509*W - 0.5*img1.width + "rem"; 
    person2.style.left = 1260*W - 0.5*img2.width + "rem"; 
    person3.style.left = 1645*W - 0.5*img3.width + "rem"; 
    person1.style.top = (769)*H - 0.5*img1.height + "rem"; 
    person2.style.top = (775)*H - 0.5*img2.height + "rem"; 
    person3.style.top = (748)*H - 0.5*img3.height + "rem"; 
  }
  displayPerson();


  // 监听模态框
let modelContainer = document.getElementById('modelContainer');
let showModel = document.getElementById('mine');
let showModelMobile = document.getElementById("mine-mobile");
let closeModel = document.getElementById('model-close');
let isModelContainerDisplay = false;
showModel.addEventListener('click',function(){
  if(!isModelContainerDisplay){
    modelContainer.style.display = 'block';
    isModelContainerDisplay = !isModelContainerDisplay;
  }
})
closeModel.addEventListener('click',function(){
  if(isModelContainerDisplay){
    modelContainer.style.display = 'none';
    isModelContainerDisplay = !isModelContainerDisplay;
  }
})
showModelMobile.addEventListener('click',function(){
  if(!isModelContainerDisplay){
    modelContainer.style.display = 'block';
    isModelContainerDisplay = !isModelContainerDisplay;
  }
})

  //宽度小于750px时,导航栏折叠
let head = document.getElementById("head");
let headMobile = document.getElementById("head-mobile");
let headMobileCaptionBtn = document.getElementById("head-mobile-caption-btn");
let headMobileBody = document.getElementById("head-mobile-body");
let isHeadMobileBodyDisplay = false;
if(windowWidth < 750){
  head.style.display = "none";
  headMobile.style.display = "block";
}else{
  headMobileBody.style.display = "none";
  isHeadMobileBodyDisplay = false;
}

headMobileCaptionBtn.addEventListener("click",function(){
  if(isHeadMobileBodyDisplay == false){
    headMobileBody.style.display = "block";
    isHeadMobileBodyDisplay = true;
  }else{
    headMobileBody.style.display = "none";
    isHeadMobileBodyDisplay = false;
  }
})

//窗口大小变化时进行调整
window.onresize = function(){
    //背景大小
  var body = document.getElementById("bg1");
  var bodyWidth = body.clientWidth;
  var bodyHeight = body.clientHeight;
  //当前可视区域大小（窗口大小）
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  // if(windowWidth>=1536){
  //   windowWidth = 1536;
  //   // windowHeight = 864.8;
  // }
  //根据可视区域修改根的字体大小
  document.getElementsByTagName('html')[0].style.fontSize = 100/1536*windowWidth + "px";
  //调整container大小位置和滚动条位置
 var container = document.getElementById("container");
container.style.width = windowWidth +"px";
// container.style.height = 864.8 + "px";
// container.style.left = bodyWidth*0.5 - 0.5*windowWidth + "px";
// container.style.top = bodyHeight*0.5 - 0.5*windowHeight + "px";

  // if(windowWidth>=1536||windowHeight>=732.8){
  //   container.style.width = 1536 +"px";
  //   container.style.height = 732.8 +"px";
  //   container.style.left = "0px";
  //   container.style.top = "0px";
  // }

  // window.scrollTo(bodyWidth*0.5 - 0.5*windowWidth,0)
 
  moveSunOrMoon();

  
  //调整标题
  var caption = document.getElementById("caption");
  var captionWidth;

  var captionLeft;

    captionWidth = 336*W;

    
    captionLeft = windowWidth*0.5 - captionWidth*0.5;
    // caption.style.width = captionWidth +"px";
    caption.style.left = captionLeft + "px";

  //调整人物
  displayPerson();

//调整顶部导航栏
if(windowWidth < 750){
  head.style.display = "none";
  headMobile.style.display = "block";
}else{
  head.style.display = "block";
  headMobile.style.display = "none";
  headMobileBody.style.display = "none";
  isHeadMobileBodyDisplay = false;
}


}

