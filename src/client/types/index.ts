export type Token = string | null

export type ColorMode = 'light' | 'dark'

export type ThemeName = 'elementary' | 'beach' | 'forest' | 'rose' | 'sunset' | 'ocean'

export interface FetchBody<T extends object = {}> {
  message?: string,
  payload?: T
}
export interface FetchResult<T extends object = {}> extends FetchBody<T> {
  status: number,
}

