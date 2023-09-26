interface Graphic {
  move(x: number, y: number): void
  draw(): string
}

class Dot implements Graphic {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  move(x: number, y: number): void {
    this.x += x
    this.y += y
  }

  draw(): string {
    return `(x: ${this.x}, y: {${this.y}})`
  }
}

class Circle extends Dot {
  radius: number = 0

  constructor(x: number, y: number, radius: number) {
    super(x, y)
    this.radius = radius
  }

  draw(): string {
    return `(x: ${this.x}, y: {${this.y}}), radius: ${this.radius}`
  }
}

class CompoundGraphic implements Graphic {
  children: Graphic[] = []

  add(child: Graphic) {
    this.children.push(child)
  }

  remove(child: Graphic) {
    const componentIndex = this.children.indexOf(child)
    this.children.splice(componentIndex, 1)
  }

  move(x: number, y: number): void {
    this.children.forEach((child) => { child.move(x, y) })
  }

  draw(): string {
    return this.children.toString()
  }
}

class ImageEditor {
  all: CompoundGraphic = new CompoundGraphic()

  load() {
    this.all = new CompoundGraphic()
    this.all.add(new Dot(1, 2))
    this.all.add(new Circle(5, 3, 10))
  }

  groupSelected(components: Graphic[]) {
    const group = new CompoundGraphic()
    components.forEach((component) => {
      group.add(component)
      this.all.remove(component)
    })
    this.all.add(group)
    this.all.draw()
  }
}

const editor = new ImageEditor()
editor.load()
console.log(editor.all)