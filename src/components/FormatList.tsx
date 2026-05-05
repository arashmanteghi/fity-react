import type { VideoFormat } from '../types/video'
import { buildStreamUrl } from '../store/videoApi'
import { formatBytes } from '../utils/format'

interface FormatListProps {
  formats: VideoFormat[]
  videoUrl: string
  title: string
}

interface FormatRowProps {
  format: VideoFormat
  videoUrl: string
  title: string
}

interface SectionProps {
  title: string
  note?: string
  children: React.ReactNode
}

interface IconProps {
  size?: number
}

export default function FormatList({ formats, videoUrl, title }: FormatListProps) {
  const visible = formats.filter((f) => f.ext !== 'mhtml')
  const withAudio = visible.filter((f) => f.hasVideo && f.hasAudio)
  const videoOnly = visible.filter((f) => f.hasVideo && !f.hasAudio)
  const audioOnly = visible.filter((f) => !f.hasVideo && f.hasAudio)

  const bestUrl = buildStreamUrl(videoUrl, 'best', title)

  return (
    <div className="flex flex-col gap-4">
      <a
        href={bestUrl}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg
                   bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
      >
        <DownloadIcon />
        Download Best Quality
      </a>

      {withAudio.length > 0 && (
        <Section title="Video + Audio">
          {withAudio.map((f) => (
            <FormatRow key={f.formatId} format={f} videoUrl={videoUrl} title={title} />
          ))}
        </Section>
      )}

      {videoOnly.length > 0 && (
        <Section title="Video Only" note="No audio track — requires ffmpeg on the server to merge">
          {videoOnly.map((f) => (
            <FormatRow key={f.formatId} format={f} videoUrl={videoUrl} title={title} />
          ))}
        </Section>
      )}

      {audioOnly.length > 0 && (
        <Section title="Audio Only">
          {audioOnly.map((f) => (
            <FormatRow key={f.formatId} format={f} videoUrl={videoUrl} title={title} />
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ title, note, children }: SectionProps) {
  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden">
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-baseline gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {note && <span className="text-xs text-slate-600">{note}</span>}
      </div>
      <div className="divide-y divide-slate-800">{children}</div>
    </div>
  )
}

function FormatRow({ format, videoUrl, title }: FormatRowProps) {
  const { formatId, resolution, note, ext, filesize, vcodec, acodec, tbr } = format
  const url = buildStreamUrl(videoUrl, formatId, title)
  const size = formatBytes(filesize)
  const codec = vcodec ?? acodec ?? null
  const quality = note ?? resolution ?? formatId

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-950 hover:bg-slate-900 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-white text-sm font-medium w-24 truncate">{quality}</span>
        <div className="flex gap-1.5 flex-wrap">
          <Tag>{ext}</Tag>
          {codec && <Tag>{codec.split('.')[0]}</Tag>}
          {tbr && <Tag>{Math.round(tbr)}kbps</Tag>}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {size && <span className="text-xs text-slate-500">{size}</span>}
        <a
          href={url}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700
                     text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700"
        >
          <DownloadIcon size={12} />
          Download
        </a>
      </div>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">
      {children}
    </span>
  )
}

function DownloadIcon({ size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
