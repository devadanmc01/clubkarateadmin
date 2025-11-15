import type { User } from '../payload-types'
import type { AccessArgs } from 'payload'
type isAdmin = (args: AccessArgs<User>) => boolean

export const isAdmin: isAdmin = ({ req: { user } }) => {
  let role: string = ''

  if (user !== null && user.roles) {
    role = user.roles
  }

  // Return true or false based on if the user has an admin role
  return Boolean(role === 'admin')
}
export const isAdminFieldLevel: isAdmin = ({ req: { user } }) => {
  let role: string = ''
  if (user !== null && user.roles) {
    role = user.roles
  }
  // Return true or false based on if the user has an admin role
  return Boolean(role === 'admin')
}
