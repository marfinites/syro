import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function generateOrderNumber() {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `ORD-${dateStr}-${random}`
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data: orders, error } = await query

    if (error) throw error

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, postalCode, items, total, userId } = body

    const orderNumber = generateOrderNumber()
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal >= 50 ? 0 : 4.99

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: userId || null,
        name,
        email,
        phone: phone || null,
        address,
        city,
        postal_code: postalCode,
        subtotal,
        shipping,
        total,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_image: item.image,
      size: item.size || null,
      color: item.color || null,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return NextResponse.json({
      success: true,
      orderId: order.order_number
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
