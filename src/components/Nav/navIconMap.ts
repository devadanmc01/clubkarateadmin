import { CollectionSlug, GlobalSlug } from 'payload'
import { CreditCard, SquareCheckBig, User, Users, LucideProps } from 'lucide-react'
import { ExoticComponent } from 'react'

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  attendances: SquareCheckBig,
  members: Users,
  payments: CreditCard,
  users: User,
}

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined
