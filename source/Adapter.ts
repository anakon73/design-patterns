class RoundHole {
  radius: number

  constructor(radius: number) {
    this.radius = radius
  }

  getRadius() {
    return this.radius
  }

  fits(peg: RoundPeg) {
    return this.getRadius() >= peg.getRadius()
  }
}

class RoundPeg {
  radius: number

  constructor(radius: number) {
    this.radius = radius
  }

  getRadius() {
    return this.radius
  }
}

class SquarePeg {
  width: number

  constructor(width: number) {
    this.width = width
  }

  getWidth() {
    return this.width
  }
}

class SquarePegAdapter {
  private peg: SquarePeg

  constructor(peg: SquarePeg) {
    this.peg = peg
  }

  getRadius() {
    this.peg.getWidth() * Math.sqrt(2) / 2
  }
}

const hole = new RoundHole(5)
const rpeg = new RoundPeg(5)
console.log(hole.fits(rpeg))

const small_sqpeg = new SquarePeg(5)
const large_sqpeg = new SquarePeg(10)
// console.log(hole.fits(small_sqpeg))

const small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg)
const large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg)