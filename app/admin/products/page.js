'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    image: '',
    category: 'Vestuário',
    sizes: '',
    stock: 100,
    badge: '',
    featured: false
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: product.price,
        image: product.image,
        category: product.category,
        sizes: product.sizes ? product.sizes.join(',') : '',
        stock: product.stock,
        badge: product.badge || '',
        featured: product.featured
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        image: '',
        category: 'Vestuário',
        sizes: '',
        stock: 100,
        badge: '',
        featured: false
      })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : null,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : '/api/products'

      const method = editingProduct ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      if (res.ok) {
        fetchProducts()
        setShowModal(false)
      }
    } catch (error) {
      console.error('Erro ao guardar produto:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Tens a certeza que queres eliminar este produto?')) return

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      fetchProducts()
    } catch (error) {
      console.error('Erro ao eliminar produto:', error)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
          <p className="text-gray-400">{products.length} produtos no catálogo</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-gold flex items-center gap-2"
        >
          <Plus size={18} />
          Novo Produto
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-dark w-full pl-12"
        />
      </div>

      {/* Products Table */}
      <div className="bg-dark-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left p-4 text-gray-400 font-medium">Produto</th>
                <th className="text-left p-4 text-gray-400 font-medium">Categoria</th>
                <th className="text-left p-4 text-gray-400 font-medium">Preço</th>
                <th className="text-left p-4 text-gray-400 font-medium">Stock</th>
                <th className="text-right p-4 text-gray-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-dark-700 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                        {product.badge && (
                          <span className="text-xs px-2 py-0.5 bg-gold/20 text-gold rounded">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{product.category}</td>
                  <td className="p-4 text-gold font-medium">€{product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`${product.stock > 20 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-gray-400 hover:text-gold transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-dark-700">
              <h2 className="text-xl font-bold text-white">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Nome *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="input-dark w-full"
                    placeholder="Auto-gerado se vazio"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-dark w-full h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Preço (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    className="input-dark w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Categoria *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input-dark w-full"
                  >
                    <option value="Vestuário">Vestuário</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Joias">Joias</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">URL da Imagem *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  required
                  className="input-dark w-full"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Tamanhos (separados por vírgula)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
                    className="input-dark w-full"
                    placeholder="S, M, L, XL"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    className="input-dark w-full"
                    placeholder="NOVO, POPULAR, etc."
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded bg-dark-700 border-dark-600 text-gold focus:ring-gold"
                />
                <label htmlFor="featured" className="text-gray-300">
                  Produto em destaque
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 btn-gold">
                  {editingProduct ? 'Guardar' : 'Criar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
