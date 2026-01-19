import Link from 'next/link'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-gold">SYRO</span>
              <span className="text-white ml-1 text-sm font-normal">MERCH</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Official Syro merch featuring exclusive t-shirts, pins and accessories.
              Merchandise oficial com designs exclusivos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4 text-sm">LIGAÇÕES</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#products" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-gold text-sm transition-colors">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold font-semibold mb-4 text-sm">REDES SOCIAIS</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-700 rounded-full text-gray-400 hover:text-gold hover:bg-dark-600 transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-700 rounded-full text-gray-400 hover:text-gold hover:bg-dark-600 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-700 rounded-full text-gray-400 hover:text-gold hover:bg-dark-600 transition-all"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-700 rounded-full text-gray-400 hover:text-gold hover:bg-dark-600 transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} SYRO Merch. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs">Pagamentos seguros</span>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-dark-700 rounded text-xs text-gray-400">VISA</div>
              <div className="px-2 py-1 bg-dark-700 rounded text-xs text-gray-400">MC</div>
              <div className="px-2 py-1 bg-dark-700 rounded text-xs text-gray-400">MBWAY</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
