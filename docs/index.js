const canvas = document.getElementById('game');
const context = canvas.getContext("2d");
const {width, height} = canvas;
const elementSize = 20;

class Snake {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.trail = [];
    this.tail = 5;
  }

  setVelocity({x, y}) {
    this.velocity = {x, y};
  }

  setPosition({x, y}) {
    this.position = {x, y};
  }

  getPosition() {
    return this.position;
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw() {
    context.fillStyle = "#ffffff";

    this.trail.forEach(({x, y}) => {
      context.fillRect(x * elementSize, y * elementSize, elementSize - 2, elementSize - 2);
      
      if (x === this.position.x && y === this.position.y) {
        this.tail = 5;
      }
    });
  
    this.trail = [...this.trail, {...this.position}];
  
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }
  }

  eat() {
    this.tail++;
  }
}

class Apple {
  constructor() {
    this.position = {
      x: 15,
      y: 15
    }
  }

  getPosition() {
    return this.position;
  }

  setRandomPosition() {
    this.position.x = Math.floor(Math.random() * width / elementSize);
    this.position.y = Math.floor(Math.random() * height / elementSize);
  }

  draw() {
    context.fillStyle = "#0d0d0d";
    context.fillRect(this.position.x * elementSize, this.position.y * elementSize, elementSize - 2, elementSize - 2);
  }
}

class Game {
  constructor() {
    this.snake = new Snake();
    this.apple = new Apple();

    this.handleKeydown = this.handleKeydown.bind(this);
    this.run = this.run.bind(this);

    this.start();
  }

  handleKeydown(e) {
    switch(e.keyCode) {
      case 37:
        this.snake.setVelocity({x: -1, y: 0});
        break;
      case 38:
        this.snake.setVelocity({x: 0, y: -1});
        break;
      case 39:
      this.snake.setVelocity({x: 1, y: 0});
        break;
      case 40:
      this.snake.setVelocity({x: 0, y: 1});
        break;
    }
  }

  changePosition() {
    const {x, y} = this.snake.getPosition();

    if (x < 0) {
      this.snake.setPosition({x: width / elementSize - 1, y});
    }
  
    if (x > width / elementSize - 1) {
      this.snake.setPosition({x: 0, y});
    }
  
    if (y < 0) {
      this.snake.setPosition({x, y: width / elementSize - 1});
    }
  
    if (y > height / elementSize - 1) {
      this.snake.setPosition({x, y: 0});
    }
  }

  drawBackground() {
    context.fillStyle = "#ff5c6a";
    context.fillRect(0, 0, width, height);
  }

  checkApple() {
    const applePosition = this.apple.getPosition();
    const snakePosition = this.snake.getPosition();

    if (applePosition.x === snakePosition.x && applePosition.y === snakePosition.y) {
      this.snake.eat();
      this.apple.setRandomPosition();
    }
  
    this.apple.draw();
  };

  run() {
    this.snake.move();
    this.changePosition();
    this.drawBackground();
    this.snake.draw();
    this.checkApple();
  }

  start() {
    document.addEventListener("keydown", this.handleKeydown);
    setInterval(this.run, 1000/15);
  }
}

new Game();