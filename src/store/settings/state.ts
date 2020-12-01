export interface UserDataInterface {
  userName: string
  userId: string
  apiToken: string
}

export interface AuthInterface {
  login: string
  password: string
}

export interface SettingsInterface {
  userData: UserDataInterface
}

const state: SettingsInterface = {
  userData: {
    userName: 'dpankrashov',
    userId: '',
    apiToken: ''
  }
}

export default state
