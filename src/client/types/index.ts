export type Token = string | null

export type ColorMode = 'light' | 'dark'

export type ThemeName = 'elementary' | 'beach' | 'forest' | 'rose' | 'sunset' | 'ocean'

export interface FetchResult<T = null> {
  status: number,
  message?: string,
  payload?: T
}

