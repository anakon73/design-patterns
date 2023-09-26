class Editor {
  private text: string
  private curX: number
  private curY: number
  private selectionWidth: number

  public setText(text: string): void {
    this.text = text
  }

  public setCursor(x: number, y: number): void {
    this.curX = x
    this.curY = y
  }

  setSelectionWidth(width: number): void {
    this.selectionWidth = width
  }

  public createShapshot(): Snapshot {
    return new Snapshot(this, this.text, this.curX, this.curY, this.selectionWidth)
  }
}

class Snapshot {
  private editor: Editor
  private text: string
  private curX: number
  private curY: number
  private selectionWidth: number

  constructor(editor: Editor, text: string, x: number, y: number, selectionWidth: number) {
    this.editor = editor
    this.text = text
    this.curX = x
    this.curY = y
    this.selectionWidth = selectionWidth
  }

  public restore(): void {
    this.editor.setText(this.text)
    this.editor.setCursor(this.curX, this.curY)
    this.editor.setSelectionWidth(this.selectionWidth)
  }
}

class Command {
  private backup: Snapshot
  private editor: Editor = new Editor()

  public makeBackup(): void {
    this.backup = this.editor.createShapshot()
  }

  public undo(): void {
    if (this.backup) this.backup.restore
  }
}