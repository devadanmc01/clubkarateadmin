import { CollectionSlug, GlobalSlug } from 'payload'
import { CreditCard, SquareCheckBig, User, Users, LucideProps } from 'lucide-react'
import { ExoticComponent } from 'react'
import { BeltIcon } from '../ui/icons/Belt'

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps> | any>
> = {
  attendances: SquareCheckBig,
  members: Users,
  belts: BeltIcon,
  payments: CreditCard,
  users: User,
}

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug) ? navIconMap[slug as CollectionSlug | GlobalSlug] : undefined
