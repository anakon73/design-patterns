type engine = [string, number]

class Car {
  seats: number = 0
  engine: engine = ['', 0]
  tripComputer: boolean = false
  GPS: boolean = false
}

class Manual {
  seats: number = 0
  engine: engine = ['', 0]
  tripComputer: boolean = false
  GPS: boolean = false
}

interface Builder {
  reset(): void
  setSeats(count: number): void
  setEngine(engine: engine): void
  setTripComputer(hasTripComputer: boolean): void
  setGPS(hasGPS: boolean): void
}

class CarBuilder implements Builder {
  private car: Car = new Car()

  reset(): void {
    this.car = new Car()
  }

  setSeats(count: number): void {
    this.car.seats = count
  }

  setEngine(engine: engine): void {
    this.car.engine = engine
  }

  setTripComputer(hasTripComputer: boolean): void {
    this.car.tripComputer = hasTripComputer
  }

  setGPS(hasGPS: boolean): void {
    this.car.GPS = hasGPS
  }

  getResult(): Car {
    return this.car
  }
}

class CarManualBuilder implements Builder {
  private Manual: Manual = new Manual()

  reset(): void {
    this.Manual = new Car()
  }

  setSeats(count: number): void {
    this.Manual.seats = count
  }

  setEngine(engine: engine): void {
    this.Manual.engine = engine
  }

  setTripComputer(hasTripComputer: boolean): void {
    this.Manual.tripComputer = hasTripComputer
  }

  setGPS(hasGPS: boolean): void {
    this.Manual.GPS = hasGPS
  }

  getResult(): Manual {
    return this.Manual
  }
}

class Director {
  constructSportCar(builder: Builder) {
    builder.reset()
    builder.setSeats(2)
    builder.setEngine(['V8', 4.0])
    builder.setTripComputer(true)
    builder.setGPS(true)
  }
}

class Application {
  makeCar() {
    const director = new Director()

    const carBuilder = new CarBuilder()
    director.constructSportCar(carBuilder)
    const car = carBuilder.getResult()

    return car
  }
}

const app = new Application()

console.log(app.makeCar())