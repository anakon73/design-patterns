import { Config, type Config as IConfig } from './config'

class Button {
  render(a?: any, b?: any): void { }
  onClick(f: Function): void { }
}

class WindowsButton extends Button {
  render(a: any, b: any) { }
  onClick(f: Function) { }
}

class HTMLButton extends Button {
  render(a: any, b: any) { }
  onClick(f: Function) { }
}

class Dialog {
  render() {
    const okButton = this.createButton()
    const closeDialog = () => { }
    okButton.onClick(closeDialog)
    okButton.render()
  }
  createButton(): Button {
    return new Button()
  }
}

class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }
}

class HTMLDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton()
  }
}

class Application {
  dialog: Dialog

  constructor() {
    this.dialog = new Dialog()
  }

  initialize() {
    const config: IConfig = Config

    if (config.OS = 'Windows') this.dialog = new WindowsDialog()
    else if (config.OS = 'Web') this.dialog = new HTMLDialog()
    else throw new Error('Error! Unknown operating system.')

  }

  main() {
    this.initialize()
    this.dialog.render()
  }
}

interface Product {
  operation(): string
}

abstract class Creator {
  public abstract factoryMethod(): Product

  public someOperation(): string {
    const product = this.factoryMethod()

    return `Creator: The same creator's code has just worked with ${product.operation()}`

  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1()
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2()
  }
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}'
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}'
  }
}


function clientCode(creator: Creator) {
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.')
  console.log(creator.someOperation())
}

clientCode(new ConcreteCreator1())
clientCode(new ConcreteCreator2())