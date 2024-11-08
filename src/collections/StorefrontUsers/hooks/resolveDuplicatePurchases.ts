import { StorefrontUser } from '@/payload-types'
import type { FieldHook } from 'payload'

interface Purchase {
  id: string | number // Replace this with the actual type of `id` if different
}

export const resolveDuplicatePurchases: FieldHook<StorefrontUser> = async ({
  operation,
  value,
}) => {
  if ((operation === 'create' || operation === 'update') && value) {
    return Array.from(
      new Set(
        value?.map((purchase: Purchase) =>
          typeof purchase === 'object' ? purchase.id : purchase,
        ) || [],
      ),
    )
  }

  return
}
