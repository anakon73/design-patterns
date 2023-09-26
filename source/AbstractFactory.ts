import { Config, type Config as IConfig, } from './config'

class Button {
  paint(): void { }
}

class WinButton extends Button {
  paint(): void { }
}

class MacButton extends Button {
  paint(): void { }
}

class Checkbox {
  paint(): void { }
}

class WinCheckbox extends Checkbox {
  paint(): void { }
}

class MacCheckbox extends Checkbox {
  paint(): void { }
}

abstract class GUIFactory {
  abstract createButton(): Button
  abstract createCheckbox(): Checkbox
}

class WinFactory extends GUIFactory {
  createButton(): Button {
    return new WinButton()
  }

  createCheckbox(): Checkbox {
    return new WinCheckbox()
  }
}

class MacFactory extends GUIFactory {
  createButton(): Button {
    return new MacButton()
  }
  createCheckbox(): Checkbox {
    return new MacCheckbox()
  }
}

class Application {
  private factory: GUIFactory
  private button: Button = new Button()

  constructor(factory: GUIFactory) {
    this.factory = factory
  }

  createUI() {
    this.button = this.factory.createButton()
  }

  paint() {
    this.button.paint()
  }
}

class ApplicationConfigurator {
  main() {
    const config: IConfig = Config
    let factory: GUIFactory

    if (config.OS = 'Windows') factory = new WinFactory()
    else if (config.OS = 'Mac') factory = new MacFactory()
    else throw new Error('Error! Unknown operating system.')

    const app: Application = new Application(factory)
  }
}

abstract class AbstractFactory {
  abstract createProductA(): AbstractProductA
  abstract createProductB(): AbstractProductB
}

class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1()
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB1()
  }
}

class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2()
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB2()
  }
}

interface AbstractProductA {
  usefulFunctionA(): string
}

class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA(): string {
    return 'The result of the product A1.'
  }
}

class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA(): string {
    return 'The result of the product A2.'
  }
}

interface AbstractProductB {
  usefulFunctionB(): string
  anotherUsefulFunctionB(collaborator: AbstractProductA): string
}

class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB(): string {
    return 'The result of the product B1.'
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA()
    return `The result of the B2 collaborating with the (${result})`
  }
}

class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB(): string {
    return 'The result of the product B2.'
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA()
    return `The result of the B2 collaborating with the (${result})`
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA()
  const productB = factory.createProductB()

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

clientCode(new ConcreteFactory1());