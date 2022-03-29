function Settings() {
  this.reset = function() {
    location.reload();
  }

  this.popup = function() {
    rectMode(CENTER);
    noStroke();
    fill('#6495ED');
    rect(width/2, height/2, 200, 200, 5);
  }
}
