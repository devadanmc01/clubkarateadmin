import type { User } from '../payload-types'
import type { AccessArgs } from 'payload'
type isAdmin = (args: AccessArgs<User>) => boolean | { clientId: { equals: string } }
type isAdminOrSelfUser = (args: AccessArgs<User>) => boolean | { id: { equals: string } }

export const isAdminOrSelf: isAdmin = ({ req: { user } }) => {
//  console.log(user.email)
  // Need to be logged in
  if (user) {
    const role = user.roles
    // If user has role of 'admin'
    if (role === 'admin') {
      return true
    }
    const clientId = user.id
    const query = {
      clientId: {
        equals: clientId,
      },
    }
    // If any other type of user, only provide access to themselves
    return query
  }
  // Reject everyone else
  return false
}

export const isAdminOrSelfUser: isAdminOrSelfUser = ({ req: { user } }) => {
  //console.log(user.email)
  // Need to be logged in
  if (user) {
    const role = user.roles
    // If user has role of 'admin'
    if (role === 'admin') {
      return true
    }
    const userId = user.id
    const query = {
      id: {
        equals: userId,
      },
    }
    // If any other type of user, only provide access to themselves
    return query
  }
  // Reject everyone else
  return false
}
