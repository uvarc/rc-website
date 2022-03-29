var keys = [];
var ship;
var bullets = [];
var aliens = [];
var settings;

var imgs = [];
function preload() {
  imgs.push(loadImage('img/ship.png'));
  imgs.push(loadImage('img/alien0.png'));
  imgs.push(loadImage('img/alien1.png'));
  imgs.push(loadImage('img/alien2.png'));
}

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  var alienC = floor(width/60);

  createCanvas(width, height);
  noStroke();

  setInterval(function() {
    var ax = random(50, width-50);
    var ay = -40;
    aliens.push(new Alien(ax, ay));
  }, 1000);

  setInterval(function() {
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "ArrowUp" || keys[i] == 'w') {
        bullets.push(new Bullet());
      }
    }
  }, 80);

  settings = new Settings();
  ship = new Ship();
}

function draw() {
  background(0);
  ship.show();
  ship.update();

  for (var i = bullets.length-1; i >= 0; i--) {
    var yp = bullets[i].y;
    if (yp <= 0) {
      bullets.splice(i, 1);
    }
  }

  for (var i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].update();
    aliens[i].checkCollision();
  }

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].show(ship.x, ship.y);
    bullets[i].update();

    for (var j = 0; j < aliens.length; j++) {
      bullets[i].checkCollision(bullets[i]);
    }
  }

  // settings.popup();
}

function keyPressed() {
  if (keyIsPressed) {
    keys.push(key);
  }
}

function keyReleased() {
  for (var i = 0; i < keys.length; i++) {
    keys.splice(key[i], 1);
  }
}
