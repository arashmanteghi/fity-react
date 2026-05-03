import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = import.meta.env.VITE_API_URL || ''

export const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getVideoInfo: builder.query({
      query: (url) => `/api/video/info?url=${encodeURIComponent(url)}`,
    }),
  }),
})

export const { useLazyGetVideoInfoQuery } = videoApi

export function buildStreamUrl(videoUrl, formatId, title) {
  const params = new URLSearchParams({ url: videoUrl, format: formatId })
  if (title) params.set('title', title)
  return `${API_URL}/api/video/stream?${params.toString()}`
}
