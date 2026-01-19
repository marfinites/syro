import { NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/db'

export async function GET() {
  try {
    const products = getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, category, sizes, stock, badge, featured } = body

    const product = createProduct({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description || '',
      price,
      image,
      category,
      sizes: sizes || null,
      stock: stock || 100,
      badge: badge || null,
      featured: featured || false
    })

    return NextResponse.json({
      success: true,
      productId: product.id
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
