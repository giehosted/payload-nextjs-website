import type { CollectionConfig } from 'payload'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { authenticated } from '@/access/authenticated'

export const StorefrontUsers: CollectionConfig = {
  slug: 'storefront-users',
  admin: {
    defaultColumns: ['email'],
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: authenticated,
        read: authenticated,
        update: authenticated,
      },
      defaultValue: ['customer'],
      hasMany: true,
      // hooks: {
      //   beforeChange: [ensureFirstUserIsAdmin],
      // },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
    },
    {
      name: 'purchases',
      type: 'relationship',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
      label: 'Purchases',
      relationTo: 'products',
    },
    /* {
      name: 'stripeCustomerID',
      type: 'text',
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user),
      },
      admin: {
        components: {
          Field: CustomerSelect,
        },
        position: 'sidebar',
      },
      label: 'Stripe Customer',
    }, */
    {
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              admin: {
                step: 1,
              },
              min: 0,
            },
          ],
          interfaceName: 'CartItems',
          label: 'Items',
        },
        // If you wanted to maintain a 'created on'
        // or 'last modified' date for the cart
        // you could do so here:
        // {
        //   name: 'createdOn',
        //   label: 'Created On',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
        // {
        //   name: 'lastModified',
        //   label: 'Last Modified',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
      ],
      label: 'Cart',
    },
    /* {
      name: "skipSync",
      type: "checkbox",
      admin: {
        hidden: true,
        position: "sidebar",
        readOnly: true,
      },
      label: "Skip Sync",
    }, */
  ],
}
