import { NextResponse } from 'next/server'
import { getOrderById, updateOrderStatus, deleteOrder } from '@/lib/db'

export async function GET(request, { params }) {
  try {
    const order = getOrderById(params.id)

    if (!order) {
      return NextResponse.json({ error: 'Encomenda não encontrada' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json()
    const { status } = body

    updateOrderStatus(params.id, status)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    deleteOrder(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
