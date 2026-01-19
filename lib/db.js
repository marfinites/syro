import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

// Garantir que o diretório de dados existe
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// Ler dados de um ficheiro JSON
function readJson(filePath, defaultValue = []) {
  try {
    ensureDataDir()
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error(`Erro ao ler ${filePath}:`, error)
  }
  return defaultValue
}

// Escrever dados num ficheiro JSON
function writeJson(filePath, data) {
  try {
    ensureDataDir()
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Erro ao escrever ${filePath}:`, error)
    return false
  }
}

// PRODUTOS
export function getProducts() {
  return readJson(PRODUCTS_FILE, defaultProducts)
}

export function getProductById(id) {
  const products = getProducts()
  return products.find(p => p.id === parseInt(id)) || null
}

export function getProductBySlug(slug) {
  const products = getProducts()
  return products.find(p => p.slug === slug) || null
}

export function createProduct(product) {
  const products = getProducts()
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
  const newProduct = {
    ...product,
    id: newId,
    created_at: new Date().toISOString()
  }
  products.push(newProduct)
  writeJson(PRODUCTS_FILE, products)
  return newProduct
}

export function updateProduct(id, updates) {
  const products = getProducts()
  const index = products.findIndex(p => p.id === parseInt(id))
  if (index === -1) return null

  products[index] = { ...products[index], ...updates }
  writeJson(PRODUCTS_FILE, products)
  return products[index]
}

export function deleteProduct(id) {
  const products = getProducts()
  const filtered = products.filter(p => p.id !== parseInt(id))
  writeJson(PRODUCTS_FILE, filtered)
  return true
}

// ENCOMENDAS
export function getOrders() {
  return readJson(ORDERS_FILE, defaultOrders)
}

export function getOrderById(id) {
  const orders = getOrders()
  return orders.find(o => o.id === parseInt(id)) || null
}

export function createOrder(order) {
  const orders = getOrders()
  const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1
  const newOrder = {
    ...order,
    id: newId,
    status: 'pending',
    created_at: new Date().toISOString()
  }
  orders.push(newOrder)
  writeJson(ORDERS_FILE, orders)
  return newOrder
}

export function updateOrderStatus(id, status) {
  const orders = getOrders()
  const index = orders.findIndex(o => o.id === parseInt(id))
  if (index === -1) return null

  orders[index].status = status
  writeJson(ORDERS_FILE, orders)
  return orders[index]
}

export function deleteOrder(id) {
  const orders = getOrders()
  const filtered = orders.filter(o => o.id !== parseInt(id))
  writeJson(ORDERS_FILE, filtered)
  return true
}

// Dados por defeito
const defaultProducts = [
  {
    id: 1,
    name: 'PENDENTE "11:11"',
    slug: 'pendente-1111',
    description: 'Pendente exclusivo SYRO com design "11:11". Acabamento premium em rose gold. Perfeito para complementar qualquer look.',
    price: 15.00,
    image: 'https://syro-merch.pt/cdn/shop/files/PENDENTE1111ROSEGOLD2.jpg?v=1760019138',
    category: 'Joias',
    sizes: null,
    stock: 50,
    badge: null,
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'PIN "CULT"',
    slug: 'pin-cult',
    description: 'Pin metálico CULT em acabamento prateado. Design minimalista e elegante para usar em qualquer ocasião.',
    price: 8.00,
    image: 'https://syro-merch.pt/cdn/shop/files/PINCULTSILVER.jpg?v=1760019138',
    category: 'Acessórios',
    sizes: null,
    stock: 100,
    badge: null,
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 3,
    name: 'PIN "SYRO"',
    slug: 'pin-syro',
    description: 'Pin oficial SYRO em dourado. Um must-have para todos os fãs. Acabamento premium de alta qualidade.',
    price: 10.00,
    image: 'https://syro-merch.pt/cdn/shop/files/PINSYROGOLD1.jpg?v=1760019136',
    category: 'Acessórios',
    sizes: null,
    stock: 75,
    badge: 'POPULAR',
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 4,
    name: 'PORTA-CHAVES "CULT"',
    slug: 'porta-chaves-cult',
    description: 'Porta-chaves CULT disponível em dourado e prateado. Acabamento metálico de alta qualidade.',
    price: 10.00,
    image: 'https://syro-merch.pt/cdn/shop/files/CULTKEYCHAINGOLD_SILVER.jpg?v=1760019139',
    category: 'Acessórios',
    sizes: null,
    stock: 60,
    badge: null,
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 5,
    name: 'RING "CULT"',
    slug: 'ring-cult',
    description: 'Anel CULT com design exclusivo. Apresentado em caixa de presente premium. Vários tamanhos disponíveis.',
    price: 12.00,
    image: 'https://syro-merch.pt/cdn/shop/files/GIFTBOX1.jpg?v=1760019140',
    category: 'Joias',
    sizes: ['S', 'M', 'L'],
    stock: 40,
    badge: 'NOVO',
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 6,
    name: 'T-SHIRT "11:11"',
    slug: 'tshirt-1111',
    description: 'T-shirt preta com design "11:11". 100% algodão de alta qualidade. Corte regular fit.',
    price: 25.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_11_11_3.jpg?v=1760019150',
    category: 'Vestuário',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    badge: null,
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 7,
    name: 'T-SHIRT "CASTELO DE CARTAS"',
    slug: 'tshirt-castelo-de-cartas',
    description: 'T-shirt preta com design exclusivo "Castelo de Cartas". 100% algodão premium. Estampagem de alta qualidade.',
    price: 30.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_BACK.jpg?v=1765464096',
    category: 'Vestuário',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    badge: 'EXCLUSIVO',
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 8,
    name: 'T-SHIRT "PESSOA"',
    slug: 'tshirt-pessoa',
    description: 'T-shirt preta com design artístico "Pessoa". Inspirada na poesia portuguesa. 100% algodão.',
    price: 30.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_BACK_1299573d-f57b-44c3-9f30-c61a3da44bdf.jpg?v=1765465750',
    category: 'Vestuário',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    badge: null,
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 9,
    name: 'T-SHIRT "SUNDAY MEOW"',
    slug: 'tshirt-sunday-meow',
    description: 'T-shirt preta com design único "Sunday Meow". Perfeita para os amantes de gatos. 100% algodão.',
    price: 30.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_BACK.jpg?v=1765463651',
    category: 'Vestuário',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    badge: null,
    featured: true,
    created_at: '2024-01-01T00:00:00.000Z'
  }
]

const defaultOrders = [
  {
    id: 1,
    customer_name: 'João Silva',
    customer_email: 'joao@email.com',
    customer_phone: '912345678',
    address: 'Rua das Flores, 123',
    city: 'Lisboa',
    postal_code: '1000-001',
    items: [
      { name: 'T-SHIRT "11:11"', price: 25, quantity: 1, size: 'M' },
      { name: 'PIN "SYRO"', price: 10, quantity: 2 }
    ],
    total: 45.00,
    status: 'completed',
    created_at: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 2,
    customer_name: 'Maria Santos',
    customer_email: 'maria@email.com',
    customer_phone: '923456789',
    address: 'Av. da Liberdade, 456',
    city: 'Porto',
    postal_code: '4000-001',
    items: [
      { name: 'PENDENTE "11:11"', price: 15, quantity: 1 }
    ],
    total: 15.00,
    status: 'pending',
    created_at: '2024-01-18T14:20:00.000Z'
  },
  {
    id: 3,
    customer_name: 'Pedro Costa',
    customer_email: 'pedro@email.com',
    customer_phone: '934567890',
    address: 'Rua do Comércio, 789',
    city: 'Coimbra',
    postal_code: '3000-001',
    items: [
      { name: 'T-SHIRT "CASTELO DE CARTAS"', price: 30, quantity: 2, size: 'L' }
    ],
    total: 60.00,
    status: 'shipped',
    created_at: '2024-01-17T09:15:00.000Z'
  }
]
