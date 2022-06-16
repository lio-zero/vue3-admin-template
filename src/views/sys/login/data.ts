export type User = {
  username: string
  password: number
  rememberMe?: boolean
}

export const model: User = reactive({
  username: 'admin',
  password: 123456
})
