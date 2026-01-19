'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Package, FileText, Mail, Settings, LogOut, ChevronRight, Download, Eye } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { useAuth } from '@/components/AuthContext'

export default function ProfilePage() {
  const { user, orders, isLoaded, register, login, logout, updateUser, toggleNewsletter } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')
  const [showLogin, setShowLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    newsletter: false
  })
  const [editMode, setEditMode] = useState(false)

  if (!isLoaded) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-12 px-6 bg-[rgb(18,18,18)]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[rgba(245,245,245,0.5)] text-sm">A carregar...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Not logged in - Show login/register form
  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[rgb(18,18,18)] py-16">
          <div className="max-w-md mx-auto px-6">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-[rgb(26,26,26)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User size={32} className="text-[rgba(245,245,245,0.3)]" />
              </div>
              <h1 className="text-2xl font-light text-[rgb(245,245,245)]">
                {showLogin ? 'Entrar' : 'Criar Conta'}
              </h1>
            </div>

            <div className="bg-[rgb(26,26,26)] rounded-2xl p-8">
              {showLogin ? (
                // Login Form
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const result = login(formData.email, formData.password)
                  if (!result) {
                    alert('Conta não encontrada. Cria uma conta primeiro.')
                  }
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="o.teu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[rgb(245,245,245)] text-[rgb(18,18,18)] py-4 rounded-xl font-medium text-sm mt-6 hover:opacity-90 transition-opacity"
                  >
                    Entrar
                  </button>
                </form>
              ) : (
                // Register Form
                <form onSubmit={(e) => {
                  e.preventDefault()
                  register(formData)
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="O teu nome"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="o.teu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Telefone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="+351 912 345 678"
                      />
                    </div>
                    <div>
                      <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Morada</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                        placeholder="Rua, número, andar"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Código Postal</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                          placeholder="1000-000"
                        />
                      </div>
                      <div>
                        <label className="block text-[rgba(245,245,245,0.6)] text-xs mb-2">Cidade</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                          placeholder="Lisboa"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                        className="w-5 h-5 rounded bg-[rgb(36,36,36)] border-none"
                      />
                      <span className="text-[rgba(245,245,245,0.6)] text-sm">Quero receber novidades e promoções</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[rgb(245,245,245)] text-[rgb(18,18,18)] py-4 rounded-xl font-medium text-sm mt-6 hover:opacity-90 transition-opacity"
                  >
                    Criar Conta
                  </button>
                </form>
              )}

              <button
                onClick={() => setShowLogin(!showLogin)}
                className="w-full text-center text-[rgba(245,245,245,0.5)] text-sm mt-6 hover:text-[rgb(245,245,245)] transition-colors"
              >
                {showLogin ? 'Não tens conta? Criar conta' : 'Já tens conta? Entrar'}
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <CookieBanner />
      </>
    )
  }

  // Logged in - Show profile
  const tabs = [
    { id: 'orders', label: 'Encomendas', icon: Package },
    { id: 'invoices', label: 'Faturas', icon: FileText },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'settings', label: 'Dados', icon: Settings },
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[rgb(18,18,18)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[rgb(26,26,26)] rounded-2xl flex items-center justify-center">
                <User size={28} className="text-[rgba(245,245,245,0.5)]" />
              </div>
              <div>
                <h1 className="text-xl font-medium text-[rgb(245,245,245)]">{user.name}</h1>
                <p className="text-[rgba(245,245,245,0.5)] text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] text-sm transition-colors"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-[rgb(26,26,26)] rounded-2xl p-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[rgb(36,36,36)] text-[rgb(245,245,245)]'
                        : 'text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] hover:bg-[rgb(32,32,32)]'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-lg font-medium text-[rgb(245,245,245)] mb-6">As Minhas Encomendas</h2>

                  {orders.length === 0 ? (
                    <div className="bg-[rgb(26,26,26)] rounded-2xl p-12 text-center">
                      <Package size={40} className="text-[rgba(245,245,245,0.2)] mx-auto mb-4" />
                      <p className="text-[rgba(245,245,245,0.5)] text-sm">Ainda não fizeste nenhuma encomenda.</p>
                      <Link
                        href="/"
                        className="inline-block mt-6 text-[rgb(245,245,245)] text-sm hover:opacity-70 transition-opacity"
                      >
                        Ver Produtos →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-[rgb(26,26,26)] rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-[rgb(245,245,245)] font-medium">{order.id}</p>
                              <p className="text-[rgba(245,245,245,0.4)] text-xs mt-1">
                                {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-[rgb(36,36,36)] text-[rgba(245,245,245,0.6)]'
                            }`}>
                              {order.status === 'delivered' ? 'Entregue' :
                               order.status === 'shipped' ? 'Enviado' : 'Pendente'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-[rgba(245,245,245,0.1)]">
                            <p className="text-[rgba(245,245,245,0.6)] text-sm">
                              {order.items?.length || 0} artigo(s)
                            </p>
                            <p className="text-[rgb(245,245,245)] font-medium">
                              €{order.total?.toFixed(2).replace('.', ',') || '0,00'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Invoices Tab */}
              {activeTab === 'invoices' && (
                <div>
                  <h2 className="text-lg font-medium text-[rgb(245,245,245)] mb-6">Faturas</h2>

                  {orders.length === 0 ? (
                    <div className="bg-[rgb(26,26,26)] rounded-2xl p-12 text-center">
                      <FileText size={40} className="text-[rgba(245,245,245,0.2)] mx-auto mb-4" />
                      <p className="text-[rgba(245,245,245,0.5)] text-sm">Não tens faturas disponíveis.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-[rgb(26,26,26)] rounded-2xl p-5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[rgb(36,36,36)] rounded-xl flex items-center justify-center">
                              <FileText size={18} className="text-[rgba(245,245,245,0.5)]" />
                            </div>
                            <div>
                              <p className="text-[rgb(245,245,245)] text-sm font-medium">Fatura {order.id}</p>
                              <p className="text-[rgba(245,245,245,0.4)] text-xs mt-1">
                                {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="p-2 text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] transition-colors">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] transition-colors">
                              <Download size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Newsletter Tab */}
              {activeTab === 'newsletter' && (
                <div>
                  <h2 className="text-lg font-medium text-[rgb(245,245,245)] mb-6">Newsletter</h2>

                  <div className="bg-[rgb(26,26,26)] rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[rgb(36,36,36)] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-[rgba(245,245,245,0.5)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[rgb(245,245,245)] font-medium">Novidades e Promoções</h3>
                        <p className="text-[rgba(245,245,245,0.5)] text-sm mt-2 leading-relaxed">
                          Recebe em primeira mão as novidades, lançamentos exclusivos e promoções especiais da SYRO.
                        </p>

                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-[rgba(245,245,245,0.6)] text-sm">
                            {user.newsletter ? 'Subscrito' : 'Não subscrito'}
                          </span>
                          <button
                            onClick={toggleNewsletter}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              user.newsletter ? 'bg-[rgb(245,245,245)]' : 'bg-[rgb(36,36,36)]'
                            }`}
                          >
                            <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                              user.newsletter
                                ? 'right-1 bg-[rgb(18,18,18)]'
                                : 'left-1 bg-[rgba(245,245,245,0.3)]'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-[rgb(245,245,245)]">Os Meus Dados</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="text-[rgba(245,245,245,0.5)] text-sm hover:text-[rgb(245,245,245)] transition-colors"
                    >
                      {editMode ? 'Cancelar' : 'Editar'}
                    </button>
                  </div>

                  <div className="bg-[rgb(26,26,26)] rounded-2xl p-8">
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      updateUser({
                        name: formData.name || user.name,
                        phone: formData.phone || user.phone,
                        address: formData.address || user.address,
                        postalCode: formData.postalCode || user.postalCode,
                        city: formData.city || user.city
                      })
                      setEditMode(false)
                    }}>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-[rgba(245,245,245,0.4)] text-xs mb-2">Nome</label>
                          {editMode ? (
                            <input
                              type="text"
                              defaultValue={user.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                            />
                          ) : (
                            <p className="text-[rgb(245,245,245)]">{user.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[rgba(245,245,245,0.4)] text-xs mb-2">Email</label>
                          <p className="text-[rgb(245,245,245)]">{user.email}</p>
                        </div>

                        <div>
                          <label className="block text-[rgba(245,245,245,0.4)] text-xs mb-2">Telefone</label>
                          {editMode ? (
                            <input
                              type="tel"
                              defaultValue={user.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                              placeholder="+351 912 345 678"
                            />
                          ) : (
                            <p className="text-[rgb(245,245,245)]">{user.phone || '—'}</p>
                          )}
                        </div>

                        <div className="pt-5 border-t border-[rgba(245,245,245,0.1)]">
                          <label className="block text-[rgba(245,245,245,0.4)] text-xs mb-2">Morada</label>
                          {editMode ? (
                            <input
                              type="text"
                              defaultValue={user.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                              placeholder="Rua, número, andar"
                            />
                          ) : (
                            <p className="text-[rgb(245,245,245)]">{user.address || '—'}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[rgba(245,245,245,0.4)] text-xs mb-2">Código Postal</label>
                            {editMode ? (
                              <input
                                type="text"
                                defaultValue={user.postalCode}
                                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                                placeholder="1000-000"
                              />
                            ) : (
                              <p className="text-[rgb(245,245,245)]">{user.postalCode || '—'}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[rgba(245,245,245,0.4)] text-xs mb-2">Cidade</label>
                            {editMode ? (
                              <input
                                type="text"
                                defaultValue={user.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full bg-[rgb(36,36,36)] text-[rgb(245,245,245)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[rgba(245,245,245,0.3)]"
                                placeholder="Lisboa"
                              />
                            ) : (
                              <p className="text-[rgb(245,245,245)]">{user.city || '—'}</p>
                            )}
                          </div>
                        </div>

                        {editMode && (
                          <button
                            type="submit"
                            className="w-full bg-[rgb(245,245,245)] text-[rgb(18,18,18)] py-4 rounded-xl font-medium text-sm mt-4 hover:opacity-90 transition-opacity"
                          >
                            Guardar Alterações
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
