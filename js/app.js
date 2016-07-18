// Enemies our player must avoid
var wins = 0;
var loses = 0;
var moves = -1;

var sprites = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png',
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'];

var newSprite = -1;


class Enemy{
  constructor(x, y, speed){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update(dt){
    this.x += this.speed * dt;
    if(this.x >= 520)
    {
      this.x = -100;
      this.speed = (Math.random() * 1000) + 50;
    }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Gem {
  constructor(x, y){
    this.sprite = 'images/Gem Blue.png';
    this.x = x;
    this.y = y;
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

var gem = new Gem(0, 0);


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key){
    if(key == 'left') this.x -= 101;
    if(key == 'right') this.x += 101;
    if(key == 'up') this.y -= 83;
    if(key == 'down') this.y += 83;
  }

  update(){
    if(player.x > 407) player.x = 407;
    if(player.x < 3) player.x = 3;
    if(player.y > 380) player.y = 380;

    if(player.y < 48) {
      player.y = 380;
      wins++;
      document.getElementById("wins").innerHTML = "Wins: " + wins;
    }

    if(checkForCollisions())
    {
      player.x = 205;
      player.y = 380;

      loses++;
      document.getElementById("loses").innerHTML = "Loses: " + loses;
    }
  }
}

function checkForCollisions(){
  for(var i = 0; i < allEnemies.length; i++){
    if(Math.abs(player.x - allEnemies[i].x) <= 60 &&
       Math.abs(player.y - allEnemies[i].y) <= 50)
       return true;
  }
  return false;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-100, 42, 120), new Enemy(-100, 125, 170), new Enemy(-100, 208, 90),
                  new Enemy(-100, 42, 140), new Enemy(-100, 125, 270)];
// Place the player object in a variable called player
var player = new Player(205, 380);



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    moves++;
    document.getElementById("moves").innerHTML = "Moves: " + moves;
    player.handleInput(allowedKeys[e.keyCode]);
});
