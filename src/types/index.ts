export interface FetchResult<T = null> {
  status: number,
  message?: string,
  payload?: T
}

