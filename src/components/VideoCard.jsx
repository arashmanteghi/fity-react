import { formatDuration } from '../utils/format'

export default function VideoCard({ video }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
      {video.thumbnail && (
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-40 h-24 object-cover rounded-lg flex-shrink-0"
        />
      )}
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <h2 className="text-white font-medium text-sm leading-snug line-clamp-2">
          {video.title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {video.uploader && (
            <Badge>{video.uploader}</Badge>
          )}
          {video.platform && (
            <Badge>{video.platform}</Badge>
          )}
          {video.duration && (
            <Badge>{formatDuration(video.duration)}</Badge>
          )}
        </div>
      </div>
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
      {children}
    </span>
  )
}
