import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export default async function Page() {
  const payload = await getPayloadHMR({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
  })

  return (
    <main>
      <div>
        {products.docs.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </main>
  )
}
