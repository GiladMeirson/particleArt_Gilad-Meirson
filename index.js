var can;
var ctx;
var mouse = { x: null, y: null, radius: innerWidth/25.6,power:innerWidth/1280 };
var particleArray = [];
var animation;
var amount=0;
var disLimitCon=95;
const partColorArray = [


//   " #ff3333",
//   " #ff4d4d",
//   " #ff6666",
//   " #ff8080",
//   " #ff9999",
//   " #ffb3b3",
//   " #ff6666",
//   " #ff8080",
//   " #ff9999",
//   " #ffb3b3",
// "#d0e6fb",
// "#b9d9f9",
// "#a1ccf7",
// "#8abff5",
"#c2f0c2",
"#adebad",
"#99e699",
"#85e085",


// "#196619",
// "#0f3d0f",
// "#0a290a",
// "#145214",
];
const conecttorsColorArray = [

//   "#d0e6fb",
//   "#b9d9f9",
//   "#a1ccf7",
//   "#8abff5",


//   "#196619",
//   "#0f3d0f",
//   "#0a290a",
//   "#145214",

"#c2f0c2",
"#adebad",
"#99e699",
"#85e085",



];
function stam(e) {
    console.log(e);
}

function init(body) {
    
  can = document.getElementById("Can");
  ctx = can.getContext("2d");
  amount=Math.floor(innerWidth/4.8);
  can.width = innerWidth;
  can.height = innerHeight;
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("contextmenu", (e) => {e.preventDefault();AddSome();});
  window.addEventListener('mousedown',()=>{mouse.radius=innerWidth/7.7;mouse.power=innerWidth/147.7});
  window.addEventListener('mouseup',()=>{mouse.radius=innerWidth/25.6;mouse.power=innerWidth/1280});
  window.addEventListener('keydown',(e)=>{
    if (e.key==='d') {
    for (let i = 0; i < 5; i++) {
        particleArray.pop();
    }

    
  }
  if (e.key==='=') {
    disLimitCon++;
    //console.log(e.key,disLimitCon)
  }
  if (e.key==='-') {
    disLimitCon--;
  }


});


  
 
  
  CreateParticle(amount);
  Animate();

  //   console.log(particleArray);
}
function Start(btn) {
    btn.parentNode.remove();
    requestFullScreen(document.body)
}
/* Get into full screen */
function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function resizeCanvas() {
  particleArray = [];
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  cancelAnimationFrame(animation);
  amount=Math.floor(innerWidth/4.8);
  CreateParticle(amount);
  Animate();
}

class Particle {
  constructor() {
    this.radius = 2 + Math.random() * 4;
    this.x = Math.random() * (can.width - this.radius) + this.radius;
    this.y = Math.random() * (can.height - this.radius) + this.radius;
    this.opacity = Math.random() / 2 + 0.45;
    this.baseX = this.x;
    this.baseY = this.y;
    this.angle = Math.random() * 2 * Math.PI;
    this.vel = 3 / this.radius;
    this.color = GetRandColor('red');
  }
  Render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += Math.cos(this.angle) * this.vel;
    this.y += Math.sin(this.angle) * this.vel;
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dis = Math.sqrt(dx * dx + dy * dy);
    let forceX = dx / dis;
    let forceY = dy / dis;
    let macDis = mouse.radius;
    let force = (macDis - dis) / macDis;
    let dirX = forceX * force * this.radius * mouse.power;
    let dirY = forceY * force * this.radius *  mouse.power;

    if (this.x - this.radius < 0) {
      // this hits left wall
      this.x = this.radius;
      this.angle = Math.PI - this.angle;
    } else if (this.x + this.radius > can.width) {
      // this hits right wall
      this.x = can.width - this.radius;
      this.angle = Math.PI - this.angle;
    }
    if (this.y < this.radius) {
      // this hits top wall
      this.y = this.radius;
      this.angle = Math.PI * 2 - this.angle;
    } else if (this.y + this.radius > can.height) {
      // this hits bottom wall
      this.y = can.height - this.radius;
      this.angle = Math.PI * 2 - this.angle;
    }

    if (dis < mouse.radius) {
      this.x -= dirX;
      this.y -= dirY;
      this.angle+=0.67;
    }
  }
}

function Animate() {
  ctx.clearRect(0, 0, can.width, can.height);
  connect1();
  particleArray.forEach((p) => {
    p.update();
    p.Render();
  });

  animation = requestAnimationFrame(Animate);
}

function CreateParticle(num) {
  for (let i = 0; i < num; i++) {
    particleArray.push(new Particle());
  }
}



function connect1() {
  let opacityVal = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = 0; b < particleArray.length; b++) {
      // let dx=Mouse.x-this.x;
      // let dy = Mouse.y-this.y;
      // let dis=Math.sqrt(dx*dx+dy*dy);
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let dis = Math.sqrt(dx * dx + dy * dy);

      if (dis < disLimitCon) {
        //ctx.strokeStyle=particalArray[a].color;
        opacityVal = 1 - dis / disLimitCon;
        // ctx.strokeStyle='rgba(255,255,255,'+opacityVal+')';
        ctx.strokeStyle = convertHex(GetRandColor('blue'),opacityVal);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function GetRandColor(spec) {
    if (spec==='red') {
        return partColorArray[Math.floor(Math.random()*partColorArray.length)];
    }else{
        return conecttorsColorArray[Math.floor(Math.random()*conecttorsColorArray.length)];
    }
}

function convertHex(hexCode, opacity = 1){
    var hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    var r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16);

    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;   
    }
    
    return 'rgba('+r+','+g+','+b+','+opacity+')';
}

function AddSome() {
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }
    
}

