export interface VideoFormat {
  formatId: string
  ext: string
  resolution: string | null
  quality: number | null
  note: string | null
  filesize: number | null
  hasVideo: boolean
  hasAudio: boolean
  vcodec: string | null
  acodec: string | null
  tbr: number | null
}

export interface VideoInfo {
  id: string
  title: string
  thumbnail: string | null
  duration: number | null
  uploader: string | null
  platform: string | null
  webpageUrl: string
  formats: VideoFormat[]
}
