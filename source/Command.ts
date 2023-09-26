interface Command {
  execute(): void
}

class SimpleCommand implements Command {
  private payload: string

  constructor(payload: string) {
    this.payload = payload
  }

  execute(): void {
    console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`)
  }
}

class ComplexCommand implements Command {
  private receiver: Receiver
  private a: string
  private b: string

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver
    this.a = a
    this.b = b
  }

  execute(): void {
    console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
    this.receiver.doSomething(this.a)
    this.receiver.doSomethingElse(this.b)
  }
}

class Receiver {
  doSomething(a: string): void {
    console.log(`Receiver: Working on (${a}.)`)
  }

  doSomethingElse(b: string): void {
    console.log(`Receiver: Also working on (${b}.)`)
  }
}

class Invoker {
  private onStart: Command | null = null
  private onFinish: Command | null = null

  setOnStart(command: Command): void {
    this.onStart = command
  }

  setOnFinish(command: Command): void {
    this.onFinish = command
  }

  doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart!)) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish!)) {
      this.onFinish.execute();
    }
  }

  private isCommand(object: Command): object is Command {
    return object.execute !== undefined;
  }
}

const invoker = new Invoker()
invoker.setOnStart(new SimpleCommand("Say hi!"))
const receiver = new Receiver()
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'))

invoker.doSomethingImportant()