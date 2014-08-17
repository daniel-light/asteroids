;(function(root) {
  "use strict";

  var Asteroids = root.Asteroids = (root.Asteroids || {});;

  var Game = Asteroids.Game = function(context, dim_x, dim_y) {
    this.context = context;
    this.DIM_X = dim_x;
    this.DIM_Y = dim_y;
    this.background = {
      img: document.getElementById('background'),
      pos_x: 0,
      pos_y: 0,
      drift_x: 3,
      drift_y: 2
    };
    this.background.width = this.background.img.width;
    this.background.height = this.background.img.height;

    this.ship = new Asteroids.Ship({x: dim_x / 2, y: dim_y / 2});
    this.bullets = [];
    this.asteroids = _(10).times(function() {
      return Asteroids.Asteroid.randomAsteroid(dim_x, dim_y, this.ship);
    }.bind(this));

    this.score = 0;
  }

  Game.prototype.render = function() {
    var context = this.context;
    context.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.renderBackground();

    context.fillStyle = 'white';
    context.font = 'bold 30pt sans-serif';
    context.fillText(this.score.toString(), this.DIM_X / 2 - 20, 50);

    this.ship.render(context);
    this.asteroids.concat(this.bullets).forEach(function (movingObject) {
      movingObject.render(context);
    });
  }

  Game.prototype.renderBackground = function() {
    var bg = this.background;
    var x_portion = Math.min((bg.width - bg.pos_x) / 2, this.DIM_X);
    var y_portion = Math.min(bg.height - this.DIM_Y, this.DIM_Y);
    this.context.drawImage(bg.img,
      400, 400,           // src x, y
      2 * this.DIM_X, 2 * this.DIM_Y, // src w, h
      0, 0,                         // dest x, y
      this.DIM_X, this.DIM_Y);        // dest w, h

  }

  Game.prototype.moveObjects = function(movingObjects) {
    var that = this;
    movingObjects.forEach(function(movingObject) {
      movingObject.move(that.DIM_X, that.DIM_Y);
    });
    return movingObjects.filter(function (movingObject) {
      return !movingObject.isOffscreen(that.DIM_X, that.DIM_Y);
    });
  }

  Game.prototype.move = function() {
    this.asteroids = this.moveObjects(this.asteroids);
    this.bullets = this.moveObjects(this.bullets);

    this.handleInputs();
    this.ship.move(this.DIM_X, this.DIM_Y);
  }

  Game.prototype.FRAME_STEP_TIME = 20;

  Game.prototype.step = function() {
    this._lastTime = this._lastTime || 0;
    this._lastTime = Date.now();
    this.spawnRoids();
    this.move();
    this.render();
    this.checkCollisions();
  }

  Game.prototype.start = function() {
    this.render();
    this.context.fillStyle = 'white';
    this.context.font = 'bold 30pt sans-serif';
    this.context.fillText(
      'Press Space to Play',
      this.DIM_X / 2 - 190,
      this.DIM_Y / 2 - 15);

    key('space', function() {
      key.unbind('space');
      this.play(this.FRAME_STEP_TIME);
    }.bind(this));
  }

  Game.prototype.play = function(interval) {
    this.bindKeys();
    this.gameIntervalId = setInterval(this.step.bind(this), interval);
  }

  Game.prototype.checkCollisions = function() {
    var game = this;

    this.asteroids.forEach(function(asteroid, asteroid_index, asteroids) {
      if (game.bullets.some(function(bullet, bullet_index) {
        if (bullet.isCollidedWith(asteroid)) {
          game.bullets.splice(bullet_index, 1);
          return true;
        } else {
          return false;
        }
      })) {
        var count = asteroids.length;
        asteroids.splice.apply(asteroids, [asteroid_index, 1].concat(asteroid.split()));
        this.score += 1;
      }
    }.bind(this));

    if (this.asteroids.some(function (asteroid) {
      return asteroid.isCollidedWith(game.ship);
    })) {
      alert("You lose!");
      clearInterval(this.gameIntervalId);
    }
  }

  Game.prototype.bindKeys = function() {
    var that = this;
    key("space", function() {
      that.bullets.push(that.ship.fireBullet());
    });
  }

  Game.prototype.handleInputs = function() {
    var ship = this.ship;
    if(key.isPressed("up")) {
      ship.power(0.4);
    }
    if(key.isPressed("down")) {
      ship.power(-0.4);
    }
    if(key.isPressed("left")) {
      ship.rotate(0.1);
    }
    if(key.isPressed("right")) {
      ship.rotate(-0.1);
    }
  }

  Game.prototype.spawnRoids = function() {
    var dim_x = this.DIM_X;
    var dim_y = this.DIM_Y;
    if (this.asteroids.length < 8 || Math.random() < .0004 * this.interval) {
      this.asteroids.push(
        Asteroids.Asteroid.randomAsteroid(dim_x, dim_y, this.ship));
    }
  }

})(this);