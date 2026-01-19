import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import CookieBanner from '@/components/CookieBanner'
import { products } from '@/lib/products'

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#121212]">
        {/* Products Section - Direct grid like Shopify */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Products Grid - 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
