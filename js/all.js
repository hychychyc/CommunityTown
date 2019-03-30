
//背景大小
var body = document.getElementById("bg");
var bodyWidth = body.clientWidth;
var bodyHeight = body.clientHeight;
//当前可视区域大小（窗口大小）
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
// if(windowWidth>=1536 || windowHeight>=1098.4){
//   windowWidth = 1536;
//   windowHeight = 1098.4;
// }
//根据可视区域修改根的字体大小
document.getElementsByTagName('html')[0].style.fontSize = 100/1536*windowWidth + "px";
//调整container大小位置和滚动条位置
var container = document.getElementById("container");
container.style.width = windowWidth +"px";
// container.style.height = 1098.4 + "px";
// container.style.left = bodyWidth*0.5 - 0.5*windowWidth + "px";
// window.scrollTo(bodyWidth*0.5 - 0.5*windowWidth,0)

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

//创建房子
// 单位使用rem，fontsize为100px即px:rem=100：1
// y 为 房子底部坐标，x为中心坐标
var houses = [
  {
    img_src: "img/all/社团小镇 所有社团-房子-01.png",
    width: 1.46,
    height: 1.39,
    x: 9.955,
    y: 3.09,
    stars_num: 5,
    p1: "红色家园",
    p2: "科技实践型",
    length: 4
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-02.png",
    width: 1.49,
    height: 1.46,
    x: 12.37,
    y: 3.09,
    stars_num: 5,
    p1: "杭电助手",
    p2: "科技实践型",
    length: 4
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-02.png",
    width: 1.49,
    height: 1.46,
    x:5.05,
    y:5.39,
    stars_num: 5,
    p1: "杭电助手",
    p2: "科技实践型",
    length: 4
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-01.png",
    width: 1.46,
    height: 1.39,
    x:7.5,
    y:5.39,
    stars_num: 0,
    p1: "SETFREE...",
    p2: "兴趣爱好型",
    length: 5
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-05.png",
    width: 1.93,
    height: 1.18,
    x: 9.955,
    y:5.39,
    stars_num: 0,
    p1: "star漫研社",
    p2: "兴趣爱好型",
    length: 5
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-02.png",
    width: 1.49,
    height: 1.46,
    x: 12.37,
    y:5.39,
    stars_num: 0,
    p1: "英语俱乐部",
    p2: "理论学习型",
    length: 5
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-02.png",
    width: 1.49,
    height: 1.46,
    x:7.5,
    y:7.69,
    stars_num: 0,
    p1: "star漫研社",
    p2: "兴趣爱好型",
    length: 5
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-01.png",
    width: 1.46,
    height: 1.39,
    x: 9.955,
    y:7.69,
    stars_num: 5,
    p1: "红色家园",
    p2: "科技实践型",
    length: 4
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-05.png",
    width: 1.93,
    height: 1.18,
    x: 12.37,
    y:7.69,
    stars_num: 0,
    p1: "SETFREE...",
    p2: "兴趣爱好型",
    length: 5
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-02.png",
    width: 1.49,
    height: 1.46,
    x:7.5,
    y:9.99,
    stars_num: 0,
    p1: "star漫研社",
    p2: "兴趣爱好型",
    length: 5
  },
  {
    img_src: "img/all/社团小镇 所有社团-房子-07.png",
    width: 1.86,
    height: 1.47,
    x: 9.955,
    y:9.99,
    stars_num: 0,
    p1: "英语俱乐部",
    p2: "理论学习型",
    length: 5
  }
]

for(let i = 0; i < houses.length; i ++){
  let houseContainer = document.createElement("div");
  let house = document.createElement("img");
  let starsContainer = document.createElement("div");
  let housePContainer = document.createElement("div");

  houseContainer.className = "houseContainer";
  house.className = "house";
  starsContainer.className = "starsContainer";
  housePContainer.className = "housePContainer";
  // houseP1.className = "houseP1";
  // houseP2.className = "houseP2";
  if(houses[i].length>=7){
    housePContainer.style.width = 1.4 + "rem";
  }else if(houses[i].lenght>=5){
    housePContainer.style.width = 1.4/7*houses[i].length+ "rem";
  }else{
    housePContainer.style.width = 1 + "rem";
  }
  houseContainer.appendChild(house);
  houseContainer.appendChild(starsContainer);
  houseContainer.appendChild(housePContainer);

  houseContainer.style.top = (houses[i].y - houses[i].height*0.5)/1.25 + "rem";
  houseContainer.style.left = (houses[i].x - houses[i].width*0.5 )/1.25 + "rem";

  house.src = houses[i].img_src;
  house.style.width = houses[i].width/1.25 + "rem";
  house.style.height = houses[i].height/1.25 + "rem";

  //监听鼠标事件，移到房子上时，房子的大小变为1.05倍，移出时复原
  houseContainer.addEventListener("mouseover",function(){
    houseContainer.style.top = (houses[i].y - houses[i].height*0.5*1.05)/1.25 + "rem";
    houseContainer.style.left = (houses[i].x - houses[i].width*0.5*1.05)/1.25 + "rem";
    house.style.width = houses[i].width/1.25*1.05 + "rem";
    house.style.height = houses[i].height/1.25*1.05 + "rem";
  })
  houseContainer.addEventListener("mouseout",function(){
    houseContainer.style.top = (houses[i].y - houses[i].height*0.5 )/1.25 + "rem";
    houseContainer.style.left = (houses[i].x - houses[i].width*0.5 )/1.25 + "rem";
    house.style.width = houses[i].width/1.25 + "rem";
    house.style.height = houses[i].height/1.25 + "rem";
  })

  for(let j=0; j < houses[i].stars_num; j ++){
    let star = document.createElement("img");
    star.src = "img/all/社团小镇 所有社团-星星.png";
    star.className = "star";
    starsContainer.appendChild(star);
  }

  let p1 = document.createElement("div");
  let p2 = document.createElement("div");
  p1.innerHTML = houses[i].p1;
  p2.innerHTML = houses[i].p2;

  // if(houses[i].p1.length>=7){
  //   p1.style.width = "1rem";
  //   p2.style.width = "1rem";
  // }else{
  //   p1.style.width = 1/7*houses[i].p1+ "rem";
  //   p2.style.width = 1/7*houses[i].p1+ "rem";
  // }
  p1.className = "houseP1";
  p2.className = "houseP2";
  housePContainer.appendChild(p1);
  housePContainer.appendChild(p2);


  document.getElementsByTagName('body')[0].appendChild(houseContainer);
}







//窗口大小变化时进行调整
window.onresize = function(){
  //背景大小
  var body = document.getElementById("bg");
  var bodyWidth = body.clientWidth;
  var bodyHeight = body.clientHeight;
  //当前可视区域大小（窗口大小）
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  // if(windowWidth>=1536){
  //   windowWidth = 1536;
    // windowHeight = 1098.4;
  // }
  //根据可视区域修改根的字体大小
  document.getElementsByTagName('html')[0].style.fontSize = 100/1536*windowWidth + "px";
  //调整container大小位置和滚动条位置
  var container = document.getElementById("container");
  container.style.width = windowWidth +"px";
  // container.style.height = 1098.4 + "px";
  // container.style.left = bodyWidth*0.5 - 0.5*windowWidth + "px";
  // window.scrollTo(bodyWidth*0.5 - 0.5*windowWidth,0)


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

