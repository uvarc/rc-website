function Bullet() {
  this.x = ship.x;
  this.y = ship.y;
  this.s = 5;
  this.shipSize = ship.s;
  this.v = 6.5;
  this.colors = ["white", "lightgray", "darkgray", "cornflowerblue", "skyblue", "navyblue", "blue"];
  this.c = random(this.colors);

  this.show = function() {
    fill(this.c);
    ellipse(this.x, this.y, this.s);
    // stroke(this.c);
    // line(this.x, this.y, this.x, this.y+this.s);
  }

  this.update = function() {
    this.y -= this.v;
  }

  this.checkCollision = function(b) {
    for (var i = 0; i < aliens.length; i++) {
        if (this.x >= aliens[i].x && this.x <= aliens[i].x+aliens[i].s) {
          if (this.y >= aliens[i].y && this.y <= aliens[i].y+aliens[i].s) {
            b.x = width*2;
            aliens.splice(i, 1);
          }
      }
    }
  }
}
