
//背景大小
var body = document.getElementById("bg");
var bodyWidth = body.clientWidth;
var bodyHeight = body.clientHeight;
//当前可视区域大小（窗口大小）
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
if(windowWidth>=1536){
  windowWidth = 1536;
}
//根据可视区域修改根的字体大小
document.getElementsByTagName('html')[0].style.fontSize = 100/1920*windowWidth + "px";
//调整container大小位置和滚动条位置
var container = document.getElementById("container");
container.style.width = windowWidth +"px";
// container.style.height = 1098.4 + "px";
container.style.left = bodyWidth*0.5 - 0.5*windowWidth + "px";
window.scrollTo(bodyWidth*0.5 - 0.5*windowWidth,0)

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


//轮播图
//中间一张大图片，z-index设为4.
//左边和右边各两张小图片，与中间图片相邻的图片z-index设为3，另外两张图片z-index设为2
let bannerImgBoxs = document.getElementsByClassName("banner-img-box");
let bannerBars = document.getElementsByClassName("banner-bar");
//获取与中间图片相隔i的图片下标，i为正数则所得图片在中间图片的右侧
function getImgIndex(now,i){
  let j = now+i;
  if(j>=5){
    j = j - 5;
  }
  if(j<0){
    j = j + 5;
  }
  return j;
}
let now = 0;//中间图片下标
let changeImgLeft1 = function(){lastImg()};
let changeImgLeft2 = function(){
  lastImg();
  setTimeout(lastImg,300);
};
let changeImgRight1 = function(){nextImg()};
let changeImgRight2 = function(){
  nextImg();
  setTimeout(nextImg,300);
};
//切换到下一张图片
function nextImg(){
  bannerImgBoxs[now].className = "banner-img-box banner-img-box-hidden-left-1";
  bannerImgBoxs[getImgIndex(now,1)].className = "banner-img-box";
  bannerImgBoxs[getImgIndex(now,2)].className = "banner-img-box banner-img-box-hidden-right-1";
  bannerImgBoxs[getImgIndex(now,-2)].className = "banner-img-box banner-img-box-hidden-right-2";
  bannerImgBoxs[getImgIndex(now,-1)].className = "banner-img-box banner-img-box-hidden-left-2";
  bannerBars[now].className = "banner-bar";
  bannerBars[getImgIndex(now,1)].className = "banner-bar banner-bar-activated";
  bannerImgBoxs[getImgIndex(now,1)].removeEventListener("click",changeImgRight1);
  bannerImgBoxs[getImgIndex(now,-1)].removeEventListener("click",changeImgLeft1);

  bannerBars[getImgIndex(now,1)].removeEventListener("click",changeImgRight1);
  bannerBars[getImgIndex(now,2)].removeEventListener("click",changeImgRight2);
  bannerBars[getImgIndex(now,-1)].removeEventListener("click",changeImgLeft1);
  bannerBars[getImgIndex(now,-2)].removeEventListener("click",changeImgLeft2);
  now = getImgIndex(now,1);
  bannerImgBoxs[getImgIndex(now,1)].addEventListener("click",changeImgRight1);
  bannerImgBoxs[getImgIndex(now,-1)].addEventListener("click",changeImgLeft1);
  bannerBars[getImgIndex(now,1)].addEventListener("click",changeImgRight1);
  bannerBars[getImgIndex(now,2)].addEventListener("click",changeImgRight2);
  bannerBars[getImgIndex(now,-1)].addEventListener("click",changeImgLeft1);
  bannerBars[getImgIndex(now,-2)].addEventListener("click",changeImgLeft2);
}
bannerImgBoxs[getImgIndex(now,1)].addEventListener("click",changeImgRight1);

//切换到上一张图片
function lastImg(){
  bannerImgBoxs[now].className = "banner-img-box banner-img-box-hidden-right-1";
  bannerImgBoxs[getImgIndex(now,-1)].className = "banner-img-box";
  bannerImgBoxs[getImgIndex(now,-2)].className = "banner-img-box banner-img-box-hidden-left-1";
  bannerImgBoxs[getImgIndex(now,2)].className = "banner-img-box banner-img-box-hidden-left-2";
  bannerImgBoxs[getImgIndex(now,1)].className = "banner-img-box banner-img-box-hidden-right-2";
  bannerBars[now].className = "banner-bar";
  bannerBars[getImgIndex(now,-1)].className = "banner-bar banner-bar-activated";
  bannerImgBoxs[getImgIndex(now,1)].removeEventListener("click",changeImgRight1);
  bannerImgBoxs[getImgIndex(now,-1)].removeEventListener("click",changeImgLeft1);

  bannerBars[getImgIndex(now,1)].removeEventListener("click",changeImgRight1);
  bannerBars[getImgIndex(now,2)].removeEventListener("click",changeImgRight2);
  bannerBars[getImgIndex(now,-1)].removeEventListener("click",changeImgLeft1);
  bannerBars[getImgIndex(now,-2)].removeEventListener("click",changeImgLeft2);
  now = getImgIndex(now,-1);
  bannerImgBoxs[getImgIndex(now,1)].addEventListener("click",changeImgRight1);
  bannerImgBoxs[getImgIndex(now,-1)].addEventListener("click",changeImgLeft1);
  bannerBars[getImgIndex(now,1)].addEventListener("click",changeImgRight1);
  bannerBars[getImgIndex(now,2)].addEventListener("click",changeImgRight2);
  bannerBars[getImgIndex(now,-1)].addEventListener("click",changeImgLeft1);
  bannerBars[getImgIndex(now,-2)].addEventListener("click",changeImgLeft2);

}
bannerImgBoxs[getImgIndex(now,-1)].addEventListener("click",changeImgLeft1);

//监听进度条点击事件

bannerBars[getImgIndex(now,1)].addEventListener("click",changeImgRight1);
bannerBars[getImgIndex(now,2)].addEventListener("click",changeImgRight2);
bannerBars[getImgIndex(now,-1)].addEventListener("click",changeImgLeft1);
bannerBars[getImgIndex(now,-2)].addEventListener("click",changeImgLeft2);



//回到顶部
document.getElementsByClassName('to-top')[0].addEventListener("click",function(){
  document.body.scrollTop = document.documentElement.scrollTop = 0;
})





//窗口大小变化时进行调整
window.onresize = function(){
  //背景大小
  var body = document.getElementById("bg");
  var bodyWidth = body.clientWidth;
  var bodyHeight = body.clientHeight;
  //当前可视区域大小（窗口大小）
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  if(windowWidth>=1536){
    windowWidth = 1536;
    // windowHeight = 1098.4;
  }
  //根据可视区域修改根的字体大小
  document.getElementsByTagName('html')[0].style.fontSize = 100/1920*windowWidth + "px";
  //调整container大小位置和滚动条位置
  var container = document.getElementById("container");
  container.style.width = windowWidth +"px";
  // container.style.height = 1098.4 + "px";
  container.style.left = bodyWidth*0.5 - 0.5*windowWidth + "px";
  window.scrollTo(bodyWidth*0.5 - 0.5*windowWidth,0)


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

