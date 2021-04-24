//设置画布
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//定义生成随机数的函数
function random(min, max){
  const num = Math.floor(Math.random() * (max - min)) +min;
  return num;
}

//定义生成随机颜色的函数
function randomColor(){
  let color = 'rgb(' +
              random(0, 255) + ',' +
              random(0, 255) + ',' +
              random(0, 255) + ')';
  return color;
}

//定义Ball构造函数
function Ball(x, y, velX, velY, color, size){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//定义彩球绘制函数
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
};

//定义彩球更新函数
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width ) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

//定义碰撞检测函数
Ball.prototype.collistionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (this !== balls[i]) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < (this.size + balls[i].size)){
        this.color = balls[i].color = randomColor();
    }
    }
}
}

//定义一个数组，生成并保存所有的小球
let balls = [];

while (balls.length < 25) {
    const size = random(10,20);
    let ball = new Ball(
        random(0+size, width-size),
        random(0+size, height-size),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size
      );
    balls.push(ball);
}

//定义一个循环来不停地播放
function loop(){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collistionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
