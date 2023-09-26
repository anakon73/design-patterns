interface Iterator<T> {
  current(): T
  next(): T
  key(): number
  valid(): boolean
  rewind(): void
}

interface Aggregator {
  getIterator(): Iterator<string>
}

class AlphabeticalOrderIterator implements Iterator<string> {
  private collection: WordsCollection
  private position: number = 0
  private reverse: boolean = false

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection
    this.reverse = reverse

    if (reverse) {
      this.position = collection.getCount() - 1
    }
  }

  public current(): string {
    return this.collection.getItems()[this.position]
  }

  public key(): number {
    return this.position
  }

  // @ts-ignore
  public next(): string {
    const item = this.current()
    this.position += this.reverse ? -1 : 1
    return item
  }

  public valid(): boolean {
    if (this.reverse) return this.position >= 0
    return this.position < this.collection.getCount()
  }

  public rewind(): void {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0
  }
}

class WordsCollection implements Aggregator {
  private items: string[] = []

  public getItems(): string[] {
    return this.items
  }

  public getCount(): number {
    return this.items.length
  }

  public addItem(item: string): void {
    this.items.push(item)
  }

  public getIterator(): Iterator<string> {
    // @ts-ignore
    return new AlphabeticalOrderIterator(this)
  }

  public getReverseIterator(): Iterator<string> {
    // @ts-ignore
    return new AlphabeticalOrderIterator(this, true)
  }
}

const collection = new WordsCollection()
collection.addItem('First')
collection.addItem('Second')
collection.addItem('Third')

const iterator = collection.getIterator()

while (iterator.valid()) {
  console.log(iterator.next())
}

const reverseIterator = collection.getReverseIterator()
while (reverseIterator.valid()) {
  console.log(reverseIterator.next())
}