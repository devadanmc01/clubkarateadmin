import { cache } from 'react'

import type { NavPreferences, Payload, TypedUser } from 'payload'

export const getNavPrefs = cache(
  async ({
    payload,
    user,
  }: {
    payload: Payload
    user?: TypedUser
  }): Promise<NavPreferences | null> =>
    user
      ? await payload
        .find({
          collection: 'payload-preferences',
          depth: 0,
          limit: 1,
          user,
          where: {
            and: [
              {
                key: {
                  equals: 'nav',
                },
              },
              {
                'user.relationTo': {
                  equals: user.collection,
                },
              },
              {
                'user.value': {
                  equals: user.id,
                },
              },
            ],
          },
        })
        ?.then((res) => res?.docs?.[0]?.value as NavPreferences)
      : null,
)
