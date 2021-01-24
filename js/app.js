window.ctx.font = "22px Verdana";
window.ctx.strokeStyle = "white";
const cellY = 83;
const cellX = 100;
const maxY = cellY * 5 - 10;
const maxX = cellX * 4;

const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed;

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
    
    document.addEventListener('keyup', (event) => {
      var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };
      this.handleInput(allowedKeys[event.keyCode]);
    });
};

Player.prototype.update = function() {
  
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
}

const Text = function(text) {
  this.text = text;
};

Text.prototype.update =function() {

}

Text.prototype.render = function() {
  window.ctx.strokeText(this.text, 210, 100);
}

// --------------------------------------------------------
const Controller = function(Player, Enemy, Text) {
  this.gameResult = new Text('');

  this.player = new Player(200, maxY);

  this.enemies = [
    new Enemy(10, 63, 1),
    new Enemy(20, 150, 2),
    new Enemy(40, 230, 3),
  ];

  this.items = [
    ...this.enemies,
    this.player,
    this.gameResult,
  ];
};

Controller.prototype.update = function() {
  this.checkIfWin();
  this.checkIfLose();

  this.items.forEach(function(item) {
    item.update();
  });
}


Controller.prototype.checkIfWin = function() {
  if(this.player.y === -10) {
    this.gameResult.text = 'Winner';
    setTimeout(()=> {
      this.player.x = 200;
      this.player.y = maxY;
      this.gameResult.text = '';
    }, 1000);
  }
}

Controller.prototype.checkIfLose = function() {
  this.enemies.forEach((enemy) => {
    if (enemy.x <= this.player.x + 80 && enemy.x >= this.player.x - 80) {
      if(enemy.y < this.player.y && enemy.y > this.player.y - cellY) {
        this.player.x = 200;
        this.player.y = maxY;
      }
    }
  });
}

Controller.prototype.render = function() {
  this.items.forEach(function(item) {
      item.render();
  });
}
// --------------------------------------------------------

const controller = new Controller(Player, Enemy, Text);

