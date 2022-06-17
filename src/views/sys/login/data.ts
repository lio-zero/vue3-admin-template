export type User = {
  username: string
  password: string
  rememberMe?: boolean
}

export const formData: User = reactive({
  username: 'admin',
  password: '123456'
})
