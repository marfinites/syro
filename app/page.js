import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-dark-800 to-dark-900 pt-16">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold)_0%,_transparent_70%)] opacity-20"></div>
          </div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-gold">SYRO</span>
              <span className="text-white"> MERCH</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Merchandise oficial com designs exclusivos. T-shirts, pins e acessórios.
            </p>
            <a
              href="#products"
              className="btn-gold inline-block"
            >
              VER COLEÇÃO
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-gold rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                COLEÇÃO <span className="text-gold">COMPLETA</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Explora a nossa coleção de merchandise exclusivo. Cada peça foi desenhada com atenção ao detalhe.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="px-6 py-2 bg-gold text-black rounded-full text-sm font-medium">
                Todos
              </button>
              <button className="px-6 py-2 bg-dark-700 text-gray-300 rounded-full text-sm font-medium hover:bg-dark-600 transition-colors">
                Vestuário
              </button>
              <button className="px-6 py-2 bg-dark-700 text-gray-300 rounded-full text-sm font-medium hover:bg-dark-600 transition-colors">
                Acessórios
              </button>
              <button className="px-6 py-2 bg-dark-700 text-gray-300 rounded-full text-sm font-medium hover:bg-dark-600 transition-colors">
                Joias
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Envio Rápido</h3>
                <p className="text-gray-400 text-sm">Envio em 24-48h para Portugal</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Pagamento Seguro</h3>
                <p className="text-gray-400 text-sm">Múltiplos métodos de pagamento</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Qualidade Premium</h3>
                <p className="text-gray-400 text-sm">Materiais de alta qualidade</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
