interface ThirdPartyYouTubeLib {
  listVideos(): void
  getVideoInfo(id: number): void
  downloadVideo(id: number): void
}

class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
  listVideos(): string[] {
    return ['21', '321312', '321312321']
  }

  getVideoInfo(id: number): string {
    return `video #${id}`
  }

  downloadVideo(id: number): void { }
}

class CachedYouTubeClass implements ThirdPartyYouTubeLib {
  private service: ThirdPartyYouTubeLib
  private listCache: any
  private videoCache: any
  needReset: boolean

  constructor(service: ThirdPartyYouTubeLib) {
    this.service = service
  }

  listVideos(): void {
    if (this.listCache == null || this.needReset) this.listCache = this.service.listVideos()
  }

  getVideoInfo(id: number): void {
    if (this.videoCache == null || this.needReset) this.videoCache = this.service.getVideoInfo(id)
  }

  downloadExists(id: number): boolean {
    return id > 10 ? true : false
  }

  downloadVideo(id: number): void {
    if (!this.downloadExists(id) || this.needReset) this.service.downloadVideo(id)
  }
}

class YouTubeManager {
  protected service: ThirdPartyYouTubeLib
  info: any
  list: any

  constructor(service: ThirdPartyYouTubeLib) {
    this.service = service
  }

  renderVideoPage(id: number) { this.info = this.service.getVideoInfo(id) }

  renderListPanel() { this.list = this.service.listVideos() }

  reactOnUserInput() {
    this.renderVideoPage(1)
    this.renderListPanel()
  }
}

class Application {
  init() {
    const YouTubeService = new ThirdPartyYouTubeClass()
    const YouTubeProxy = new CachedYouTubeClass(YouTubeService)
    const manager = new YouTubeManager(YouTubeProxy)
    manager.reactOnUserInput()
  }
}

