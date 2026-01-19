import { NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/db'

export async function GET(request, { params }) {
  try {
    const product = getProductById(params.id)

    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const { name, slug, description, price, image, category, sizes, stock, badge, featured } = body

    updateProduct(params.id, {
      name,
      slug,
      description: description || '',
      price,
      image,
      category,
      sizes: sizes || null,
      stock: stock || 100,
      badge: badge || null,
      featured: featured || false
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    deleteProduct(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
