import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    defaultColumns: ['title', '_status'],
    /* preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    }, */
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedOn',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    /* {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock, Archive],
              required: true,
            },
          ],
          label: "Content",
        },
        {
          label: "Product Details",
        },
      ],
    }, */
    /* {
      name: "categories",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "categories",
    }, */
    {
      name: 'relatedProducts',
      type: 'relationship',
      /* filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      }, */
      hasMany: true,
      relationTo: 'products',
    },
    ...slugField(),
    {
      name: 'skipSync',
      type: 'checkbox',
      admin: {
        hidden: true,
        position: 'sidebar',
        readOnly: true,
      },
      label: 'Skip Sync',
    },
  ],
  /* hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [deleteProductFromCarts],
    afterRead: [populateArchiveBlock],
    beforeChange: [beforeProductChange],
  }, */
  versions: {
    drafts: true,
  },
}
