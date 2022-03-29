function Alien(x, y) {
  this.x = x;
  this.y = y;
  this.s = 40;
  this.v = 5;
  this.xv = 0;
  this.alienImg = floor(random(1, 4));

  if (this.alienImg == 1) { this.v += 4; }

  this.show = function() {
    image(imgs[this.alienImg], this.x, this.y, this.s, this.s);
  }

  this.update = function() {
    if (ship.x-ship.s*1.275 > this.x-this.s-.5) {
      this.xv = 1.2;
    } else if (ship.x-ship.s*1.275 < this.x+.5) {
      this.xv = -1.2;
    } else {
      this.xv = 0;
    }
    this.x += this.xv;

    if (this.v < 0) {
      this.v = -this.v;
    }

    if (this.y <= height) {
      this.y += this.v;
    }

    if (this.y >= height) {
      this.y = -40;
    }
  }

  this.checkCollision = function() {
    if (this.x >= ship.x-ship.s/1.5 && this.x <= ship.x+ship.s/1.5) {
      if (this.y >= ship.y-ship.s/2) {
        settings.reset();
      }
    }
  }
}
