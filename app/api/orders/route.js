import { NextResponse } from 'next/server'
import { getOrders, createOrder } from '@/lib/db'

export async function GET() {
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

    const order = createOrder({
      customer_name: name,
      customer_email: email,
      customer_phone: phone || '',
      address,
      city,
      postal_code: postalCode,
      items,
      total
    })

    return NextResponse.json({
      success: true,
      orderId: order.id
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
