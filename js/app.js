const cellY = 83;
const cellX = 100;
const maxY = cellY * 5 - 10;
const maxX = cellX * 4;

var Enemy = function(x, y, speed, player) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed;

    if (this.x <= this.player.x + 80 && this.x >= this.player.x - 80) {
      if(this.y < this.player.y && this.y > this.player.y - cellY) {
        this.player.x = 200;
        this.player.y = maxY;
      }
    }

    if (this.x > maxX + 100) {
      this.x = -100;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if(this.y === -10) {
    setTimeout(()=> {
      this.x = 200;
      this.y = maxY;
    }, 1000);
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if(key === 'up') {
    this.y -= cellY;
    if(this.y < -10) {
        this.y = -10;
      } 
  }
  if(key === 'left') {
    this.x -= cellX;
    if(this.x < 0) {
      this.x = 0;
    } 
  }
  if(key === 'right') {
    this.x += cellX;
    if(this.x > maxX) {
        this.x = maxX;
      } 
  }
  if(key === 'down') {
    this.y += cellY;
    if(this.y > maxY) {
        this.y = maxY;
      } 
  }
  console.log(this);
}

const player = new Player(200, maxY);

const allEnemies = [
  new Enemy(10, 63, 1, player),
  new Enemy(20, 150, 2, player),
  new Enemy(40, 230, 3, player),
];
 
document.addEventListener('keyup', function(event) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[event.keyCode]);
});
