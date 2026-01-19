// Dados dos produtos para uso no cliente (sem necessidade de base de dados)
export const products = [
  {
    id: 1,
    name: 'PENDENTE "11:11"',
    slug: 'pendente-1111',
    description: 'Pendente exclusivo SYRO com design "11:11". Acabamento premium em rose gold. Perfeito para complementar qualquer look.',
    price: 15.00,
    image: 'https://syro-merch.pt/cdn/shop/files/PENDENTE1111ROSEGOLD2.jpg?v=1760019138',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/PENDENTE_11_11_GOLD_1.jpg?v=1760019140',
    images: [
      'https://syro-merch.pt/cdn/shop/files/PENDENTE1111ROSEGOLD2.jpg?v=1760019138',
      'https://syro-merch.pt/cdn/shop/files/PENDENTE_11_11_GOLD_1.jpg?v=1760019140'
    ],
    category: 'Joias',
    colors: ['Rose Gold', 'Gold'],
    sizes: null,
    stock: 50,
    badge: null,
    featured: true
  },
  {
    id: 2,
    name: 'PIN "CULT"',
    slug: 'pin-cult',
    description: 'Pin metálico CULT em acabamento prateado. Design minimalista e elegante para usar em qualquer ocasião.',
    price: 8.00,
    image: 'https://syro-merch.pt/cdn/shop/files/PINCULTSILVER.jpg?v=1760019138',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/PINCULTGOLD.jpg?v=1760019138',
    images: [
      'https://syro-merch.pt/cdn/shop/files/PINCULTSILVER.jpg?v=1760019138',
      'https://syro-merch.pt/cdn/shop/files/PINCULTGOLD.jpg?v=1760019138'
    ],
    category: 'Acessórios',
    colors: ['Silver', 'Gold'],
    sizes: null,
    stock: 100,
    badge: null,
    featured: true
  },
  {
    id: 3,
    name: 'PIN "SYRO"',
    slug: 'pin-syro',
    description: 'Pin oficial SYRO em dourado. Um must-have para todos os fãs. Acabamento premium de alta qualidade.',
    price: 10.00,
    image: 'https://syro-merch.pt/cdn/shop/files/PINSYROGOLD1.jpg?v=1760019136',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/PINSYROGOLD2.jpg?v=1760019136',
    images: [
      'https://syro-merch.pt/cdn/shop/files/PINSYROGOLD1.jpg?v=1760019136',
      'https://syro-merch.pt/cdn/shop/files/PINSYROGOLD2.jpg?v=1760019136'
    ],
    category: 'Acessórios',
    colors: ['Gold'],
    sizes: null,
    stock: 75,
    badge: 'POPULAR',
    featured: true
  },
  {
    id: 4,
    name: 'PORTA-CHAVES "CULT"',
    slug: 'porta-chaves-cult',
    description: 'Porta-chaves CULT disponível em dourado e prateado. Acabamento metálico de alta qualidade.',
    price: 10.00,
    image: 'https://syro-merch.pt/cdn/shop/files/CULTKEYCHAINGOLD_SILVER.jpg?v=1760019139',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/CULT_KEYCHAIN_SILVER.jpg?v=1760019139',
    images: [
      'https://syro-merch.pt/cdn/shop/files/CULTKEYCHAINGOLD_SILVER.jpg?v=1760019139',
      'https://syro-merch.pt/cdn/shop/files/CULT_KEYCHAIN_SILVER.jpg?v=1760019139'
    ],
    category: 'Acessórios',
    colors: ['Gold', 'Silver'],
    sizes: null,
    stock: 60,
    badge: null,
    featured: true
  },
  {
    id: 5,
    name: 'RING "CULT"',
    slug: 'ring-cult',
    description: 'Anel CULT com design exclusivo. Apresentado em caixa de presente premium. Vários tamanhos disponíveis.',
    price: 12.00,
    image: 'https://syro-merch.pt/cdn/shop/files/GIFTBOX1.jpg?v=1760019140',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/CULT_RING_GOLD.jpg?v=1760019142',
    images: [
      'https://syro-merch.pt/cdn/shop/files/GIFTBOX1.jpg?v=1760019140',
      'https://syro-merch.pt/cdn/shop/files/CULT_RING_GOLD.jpg?v=1760019142'
    ],
    category: 'Joias',
    colors: ['Gold'],
    sizes: ['S', 'M', 'L'],
    stock: 40,
    badge: 'NOVO',
    featured: true
  },
  {
    id: 6,
    name: 'T-SHIRT "11:11"',
    slug: 'tshirt-1111',
    description: 'T-shirt preta com design "11:11". 100% algodão de alta qualidade. Corte regular fit.',
    price: 25.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_11_11_3.jpg?v=1760019150',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_11_11_1.jpg?v=1760019148',
    images: [
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_11_11_3.jpg?v=1760019150',
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_11_11_1.jpg?v=1760019148',
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1111_2.jpg?v=1760019147'
    ],
    category: 'Vestuário',
    colors: ['Cinzento'],
    sizes: ['S', 'M', 'L', 'XL'],
    sizeType: 'Oversize',
    stock: 30,
    badge: null,
    featured: true
  },
  {
    id: 7,
    name: 'T-SHIRT "CASTELO DE CARTAS"',
    slug: 'tshirt-castelo-de-cartas',
    description: 'T-shirt preta com design exclusivo "Castelo de Cartas". 100% algodão premium. Estampagem de alta qualidade.',
    price: 30.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_BACK.jpg?v=1765464096',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_FRONT.png?v=1765464097',
    images: [
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_BACK.jpg?v=1765464096',
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_FRONT.png?v=1765464097'
    ],
    colorVariants: {
      'Preto': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_BACK.jpg?v=1765464096',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_BLACK_FRONT.png?v=1765464097'
      ],
      'Verde': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_GREEN_BACK.jpg?v=1765464096',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_GREEN_FRONT.png?v=1765464098'
      ],
      'Branco': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_WHITE_BACK.jpg?v=1765464096',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_3_WHITE_FRONT.png?v=1765464096'
      ]
    },
    category: 'Vestuário',
    colors: ['Preto', 'Verde', 'Branco'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    badge: 'EXCLUSIVO',
    featured: true
  },
  {
    id: 8,
    name: 'T-SHIRT "PESSOA"',
    slug: 'tshirt-pessoa',
    description: 'T-shirt preta com design artístico "Pessoa". Inspirada na poesia portuguesa. 100% algodão.',
    price: 30.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_BACK_1299573d-f57b-44c3-9f30-c61a3da44bdf.jpg?v=1765465750',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_FFRONT_6391b244-f0c2-4a46-84e4-a93f35524608.png?v=1765465751',
    images: [
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_BACK_1299573d-f57b-44c3-9f30-c61a3da44bdf.jpg?v=1765465750',
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_FFRONT_6391b244-f0c2-4a46-84e4-a93f35524608.png?v=1765465751'
    ],
    colorVariants: {
      'Preto': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_BACK_1299573d-f57b-44c3-9f30-c61a3da44bdf.jpg?v=1765465750',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_BLACK_FFRONT_6391b244-f0c2-4a46-84e4-a93f35524608.png?v=1765465751'
      ],
      'Verde': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_GREEN_BACK_f03810fd-9331-4741-9102-96c26c3c7d8c.jpg?v=1765465750',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_GREEN_FRONT_0ea7708c-ed65-418b-8916-78b369fd32ee.png?v=1765465751'
      ],
      'Branco': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_WHITE_BACK_b9adeb04-6f60-4eec-98bd-cbf2eeab1e22.jpg?v=1765465750',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_1_WHITE_FRONT_60ea995f-fef8-4475-adb5-d798a4be2653.png?v=1765465751'
      ]
    },
    category: 'Vestuário',
    colors: ['Preto', 'Verde', 'Branco'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    badge: null,
    featured: true
  },
  {
    id: 9,
    name: 'T-SHIRT "SUNDAY MEOW"',
    slug: 'tshirt-sunday-meow',
    description: 'T-shirt preta com design único "Sunday Meow". Perfeita para os amantes de gatos. 100% algodão.',
    price: 30.00,
    image: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_BACK.jpg?v=1765463651',
    hoverImage: 'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_FRONT.png?v=1765463651',
    images: [
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_BACK.jpg?v=1765463651',
      'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_FRONT.png?v=1765463651'
    ],
    colorVariants: {
      'Preto': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_BACK.jpg?v=1765463651',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_BLACK_FRONT.png?v=1765463651'
      ],
      'Verde': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_GREEN_BACK.jpg?v=1765463650',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_GREEN_FRONT.png?v=1765463653'
      ],
      'Branco': [
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_WHITE_BACK.jpg?v=1765463650',
        'https://syro-merch.pt/cdn/shop/files/T-SHIRT_2_WHITE_FRONT.png?v=1765463651'
      ]
    },
    category: 'Vestuário',
    colors: ['Preto', 'Verde', 'Branco'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    badge: null,
    featured: true
  }
]

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null
}

export function getAllProducts() {
  return products
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured)
}
