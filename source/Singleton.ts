class Database {
  private static instance: Database

  private constructor() { }

  static getInstance() {
    if (Database.instance == null) Database.instance = new Database()

    return Database.instance
  }

  query(sql: string) { }
}

class Application {
  main() {
    const foo = Database.getInstance()
    foo.query('SELECT ...')

    const bar = Database.getInstance()
    bar.query('Select ...')
  }
}

class Singleton {
  private static instance: Singleton

  private constructor() { }

  public static getInstance(): Singleton {
    if (!Singleton.instance) Singleton.instance = new Singleton()


    return Singleton.instance
  }
}

function clientCode() {
  const s1 = Singleton.getInstance()
  const s2 = Singleton.getInstance()

  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.')
  } else {
    console.log('Singleton failed, variables contain different instances.')
  }
}

clientCode();