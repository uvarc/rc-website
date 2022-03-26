function Ship() {
  this.s = 50;
  this.v = 5;
  this.x = (width / 2) - (this.s / 2);
  this.y = height - (this.s * 1.75);

  this.show = function() {
    image(imgs[0], this.x-this.s/2, this.y, this.s, this.s);
  }

  this.update = function() {
    if (this.x >= width-this.s/2 || this.x <= 0+this.s/2) {
      settings.reset();
    }

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "ArrowRight" || keys[i] == "d") {
        this.x += this.v;
      }

      if (keys[i] == "ArrowLeft" || keys[i] == "a") {
        this.x -= this.v;
      }
    }
  }
}
