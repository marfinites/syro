import { NextResponse } from 'next/server'
import { getOrders, createOrder } from '@/lib/db'

// TODO: Supabase integration temporarily disabled
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
// const supabase = createClient(supabaseUrl, supabaseServiceKey)

function generateOrderNumber() {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `ORD-${dateStr}-${random}`
}

export async function GET(request) {
  try {
    const orders = getOrders()
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, postalCode, items, total } = body

    const orderNumber = generateOrderNumber()
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal >= 50 ? 0 : 4.99

    const order = createOrder({
      order_number: orderNumber,
      customer_name: name,
      customer_email: email,
      customer_phone: phone || null,
      address,
      city,
      postal_code: postalCode,
      items,
      subtotal,
      shipping,
      total,
      status: 'pending'
    })

    return NextResponse.json({
      success: true,
      orderId: order.order_number || order.id
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
