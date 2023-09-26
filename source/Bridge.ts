class Remote {
  device: Device

  constructor(device: Device) {
    this.device = device
  }

  togglePower() {
    if (this.device.isEnabled()) this.device.disable()
    else this.device.enable()
  }

  volumeDown() { this.device.setVolume(this.device.getVolume() - 10) }
  volumeUp() { this.device.setVolume(this.device.getVolume() + 10) }
  channelDown() { this.device.setChannel(this.device.getChannel() - 1) }
  channelUp() { this.device.setChannel(this.device.getChannel() + 1) }
}

class AdvancedRemote extends Remote {
  mute() {
    this.device.setVolume(0)
  }
}

interface Device {
  isEnabled(): boolean
  enable(): void
  disable(): void
  getVolume(): number
  setVolume(percent: number): void
  getChannel(): number
  setChannel(channel: number): void
}

class Tv implements Device {
  volume: number = 0
  powerOn: boolean = false
  channel: number = 0

  isEnabled(): boolean {
    return this.powerOn
  }

  enable(): void {
    this.powerOn = true
  }

  disable(): void {
    this.powerOn = false
  }

  getVolume(): number {
    return this.volume
  }

  setVolume(percent: number): void {
    this.volume = percent
  }

  getChannel(): number {
    return this.channel
  }

  setChannel(channel: number): void {
    this.channel = channel
  }
}

const tv = new Tv()
const remote = new AdvancedRemote(tv)
tv.setVolume(20)
console.log(tv.getVolume())
remote.volumeUp()
console.log(tv.getVolume())