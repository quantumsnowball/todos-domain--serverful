import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../../../types'


const contentSlice = createSlice({
  name: 'content',
  initialState: {
    todos: [] as Todo[],
  },
  reducers: {
    setTodos: (s, a: PayloadAction<Todo[]>) => {
      s.todos = a.payload
    },
  }
})

export const contentActions = contentSlice.actions

export const contentReducer = contentSlice.reducer

