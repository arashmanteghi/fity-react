import { useState } from 'react'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { useLazyGetVideoInfoQuery } from '../store/videoApi'
import UrlForm from '../components/UrlForm'
import VideoCard from '../components/VideoCard'
import FormatList from '../components/FormatList'

function getErrorMessage(error: FetchBaseQueryError | SerializedError): string {
  if ('status' in error) {
    const data = error.data as { detail?: string; error?: string } | undefined
    return data?.detail ?? data?.error ?? 'Could not fetch video info. Check the URL and try again.'
  }
  return error.message ?? 'Could not fetch video info. Check the URL and try again.'
}

export default function Home() {
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null)
  const [trigger, { data, isFetching, isError, error }] = useLazyGetVideoInfoQuery()

  function handleSubmit(url: string) {
    setSubmittedUrl(url)
    trigger(url)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-semibold text-white tracking-tight">Fity Downloader</h1>
          <p className="text-xs text-slate-500 mt-0.5">YouTube · Instagram · Facebook · Twitter / X</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
        <UrlForm onSubmit={handleSubmit} isLoading={isFetching} />

        {isFetching && (
          <div className="flex items-center justify-center gap-3 py-10 text-slate-500 text-sm">
            <Spinner />
            Fetching video info…
          </div>
        )}

        {isError && error && (
          <div className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {getErrorMessage(error)}
          </div>
        )}

        {data && !isFetching && submittedUrl && (
          <>
            <VideoCard video={data} />
            <FormatList formats={data.formats} videoUrl={submittedUrl} title={data.title} />
          </>
        )}
      </main>
    </div>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
