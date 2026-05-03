import { useState } from 'react'

const PLATFORMS = ['YouTube', 'Instagram', 'Facebook', 'Twitter / X']

export default function UrlForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = url.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a video URL…"
          required
          className="flex-1 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500
                     px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                     disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
        >
          {isLoading ? 'Fetching…' : 'Get Links'}
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Supports: {PLATFORMS.join(' · ')}
      </p>
    </form>
  )
}
