
class Octava {
  constructor() {
    this.freqs = []
    this.sineVolume = []
    this.amplitudRelativa = []
    this.freqs[0] = 82.41
    this.freqs[1] = 87.31
    this.freqs[2] = 92.5
    this.freqs[3] = 98
    this.freqs[4] = 103.38
    this.freqs[5] = 110
    this.freqs[6] = 116
    this.freqs[7] = 123.47
    for (let i = 0; i < 8; i++) {
      this.sineVolume[i] = 0
      this.amplitudRelativa[i] = 0

    }
  }
  relativeAmplitudeDetector(relativeAmplitude, ID) {
    if (this.sineVolume[ID] != relativeAmplitude) {
      if (this.sineVolume[ID] < relativeAmplitude) {
        this.sineVolume[ID] += .1
      } else if (this.sineVolume[ID] > relativeAmplitude) {
        this.sineVolume[ID] -= .1
      }
    }
    if (this.sineVolume[ID] >= .3) {
      this.sineVolume[ID] = .3;
    } else if (this.sineVolume[ID] <= 0) {
      this.sineVolume[ID] = 0
    }
    //sineWaves[ID].amp(this.sineVolume[ID])
  }
}
class Particles {
  constructor(_x) {
    this.cantidad = 9
    this.initX = _x
    this.x = []
    this.y = []
    this.lastX = []
    this.lastY = []
    this.vel = 1
    this.tamX = []
    this.tamY = []
    for (let i = 0; i < 3; i++) {
      this.x[i] = []
      this.y[i] = []
      this.lastX[i] = []
      this.lastY[i] = []
      this.tamX[i] = []
      this.tamY[i] = []
      for (let j = 0; j < 3; j++) {
        this.lastX[i][j] = random(_x, _x + width / 8)
        this.lastY[i][j] = random(height, height + height / 2)
        this.x[i][j] = random(_x, _x + width / 8)
        this.y[i][j] = random(height, height + height / 2)
        this.tamX[i][j] = random(2, 12)
        this.tamY[i][j] = random(height / 3, height / 2)
      }
    }
    this.initX = round(map(this.initX, 0, width, 0, 7))
    this.actualizar(100, this.initX)
  }
  fade(velocidad, nX) {
    background(0, 0, 30, 15);
    push()
    if (mouseX > nX && mouseX < nX + width / 8) {
      fill(255, velocidad / .09 + 20)
      if (mouseIsPressed) {
        fill(255, velocidad / .09 + 50)
      }
    } else {
      fill(255, velocidad / .09)
    }
    rect(nX, 0, width / 8, height)
    pop()
  }
  imagen(x, y, tamX, velocidad) {
    let strokeW
    strokeW = velocidad / 10
    if (strokeW > 1) {
      strokeW = 1
    }
    push()
    let maped = map(y, height, 0, 0, 255)
    stroke(255, maped / 10)
    strokeWeight(strokeW)
    line(x, y, this.lastXParticle, this.lastYParticle)
    fill(255, maped)
    circle(x, y, tamX / 100)
    pop()
    this.lastXParticle = x
    this.lastYParticle = y
  }
  actualizar(velocidad, ID) {
    let nX = ID * width / 8;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.y[i][j] -= random(velocidad * 10, velocidad * 20)
        if (this.y[i][j] < 0 - height) {
          this.tamX[i][j] = random(1, 3)
          this.tamY[i][j] = random(1, 3)
          this.x[i][j] = random(nX + width / 27, nX + width / 9)
          this.y[i][j] = random(height, height * 2)
        }
        this.imagen(this.x[i][j], this.y[i][j], this.lastX[i][j], this.lastY[i][j], this.tamX[i][j], this.tamY[i][j], velocidad, ID)
        this.lastX[i][j] = this.x[i][j]
        this.lastY[i][j] = this.y[i][j]
      }
    }
    this.fade(velocidad, nX)
  }
}
var fullHtml, octava
var particles, particles1, particles2, particles3, particles4, particles5, particles6, particles7
let osc
function mouseIsPressed(){
}
function setup() {
  smooth()
  background(255)
  frameRate(12)
  fullHtml = document.querySelector('html')
  var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation
  if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
    width = fullHtml.clientWidth
    height = fullHtml.clientHeight / 1.45
  } else {
    width = fullHtml.clientWidth
    height = fullHtml.clientHeight
  }
  octava = new Octava()
  particles = new Particles(0)
  particles1 = new Particles(width / 8)
  particles2 = new Particles(width / 8 * 2)
  particles3 = new Particles(width / 8 * 3)
  particles4 = new Particles(width / 2)
  particles5 = new Particles(width / 2 + width / 8)
  particles6 = new Particles(width / 2 + width / 8 * 2)
  particles7 = new Particles(width / 2 + width / 8 * 3)
  osc = new p5.Oscillator('sine')
  osc.start()
  //osc.freq(300)
  osc.amp(10)


  createCanvas(width, height)
}
function draw() {
  if (mouseIsPressed) {
    getAudioContext().resume()
  }
  for (let i = 0; i < 8; i++) {
    let valor = document.getElementById("valor" + i).innerHTML
    if (i == 0) {
      particles.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    } else if (i == 1) {
      particles1.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    } else if (i == 2) {
      particles2.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    } else if (i == 3) {
      particles3.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    }
    else if (i == 4) {
      particles4.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    }
    else if (i == 5) {
      particles5.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    }
    else if (i == 6) {
      particles6.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    }
    else if (i == 7) {
      particles7.actualizar(valor, i)
      octava.relativeAmplitudeDetector(valor, i)
    }
  }
  push()
  for (let nX = 0; nX < width; nX += width / 8) {
    for (let i = 0; i < height; i += height / 30) {
      let iY = map(i, 0, height, .9, 0)
      stroke(lerpColor(color(0), color(200, 200, 255), iY))
      line(nX, i, nX, i + height / 30)
    }
  }
  pop()
}
