import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-12 bg-[rgb(18,18,18)]">
      {/* Footer Image Section */}
      <div className="flex flex-col items-center py-12 px-4">
        {/* Image in box - not stretched */}
        <div className="relative w-full max-w-[550px] aspect-[550/424] rounded-lg overflow-hidden mb-6">
          <Image
            src="https://syro-merch.pt/cdn/shop/files/543001291_18532312672024887_4129404704821775462_n.png?v=1760021364&width=1100"
            alt="SYRO Merch"
            fill
            className="object-contain"
          />
        </div>

        {/* Syro Merch Title */}
        <h2 className="text-2xl font-medium text-[rgb(245,245,245)] mb-4">Syro Merch</h2>

        {/* Description */}
        <p className="text-[rgba(245,245,245,0.75)] text-sm text-center max-w-md mb-6">
          Merch Oficial SYRO: T-shirts exclusivas, pins e acessórios do seu artista favorito. Vista o estilo e apoie a música portuguesa!
        </p>

        {/* Social Icons - NO BORDER */}
        <div className="flex gap-4">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
             className="w-10 h-10 flex items-center justify-center text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="w-10 h-10 flex items-center justify-center text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M13.23 3.492c-.84-.037-1.096-.046-3.23-.046-2.144 0-2.39.01-3.238.055-.776.027-1.195.164-1.487.273a2.4 2.4 0 0 0-.912.593 2.5 2.5 0 0 0-.602.922c-.11.282-.238.702-.274 1.486-.046.84-.046 1.095-.046 3.23s.01 2.39.046 3.229c.004.51.097 1.016.274 1.495.145.365.319.639.602.913.282.282.538.456.92.602.474.176.974.268 1.479.273.848.046 1.103.046 3.238.046s2.39-.01 3.23-.046c.784-.036 1.203-.164 1.486-.273.374-.146.648-.329.921-.602.283-.283.447-.548.602-.922.177-.476.27-.979.274-1.486.037-.84.046-1.095.046-3.23s-.01-2.39-.055-3.229c-.027-.784-.164-1.204-.274-1.495a2.4 2.4 0 0 0-.593-.913 2.6 2.6 0 0 0-.92-.602c-.284-.11-.703-.237-1.488-.273ZM6.697 2.05c.857-.036 1.131-.045 3.302-.045a63 63 0 0 1 3.302.045c.664.014 1.321.14 1.943.374a4 4 0 0 1 1.414.922c.41.397.728.88.93 1.414.23.622.354 1.279.365 1.942C18 7.56 18 7.824 18 10.005c0 2.17-.01 2.444-.046 3.292-.036.858-.173 1.442-.374 1.943-.2.53-.474.976-.92 1.423a3.9 3.9 0 0 1-1.415.922c-.51.191-1.095.337-1.943.374-.857.036-1.122.045-3.302.045-2.171 0-2.445-.009-3.302-.055-.849-.027-1.432-.164-1.943-.364a4.15 4.15 0 0 1-1.414-.922 4.1 4.1 0 0 1-.93-1.423c-.183-.51-.329-1.085-.365-1.943C2.009 12.45 2 12.167 2 10.004c0-2.161 0-2.435.055-3.302.027-.848.164-1.432.365-1.942a4.4 4.4 0 0 1 .92-1.414 4.2 4.2 0 0 1 1.415-.93c.51-.183 1.094-.33 1.943-.366Zm.427 4.806a4.105 4.105 0 1 1 5.805 5.805 4.105 4.105 0 0 1-5.805-5.805m1.882 5.371a2.668 2.668 0 1 0 2.042-4.93 2.668 2.668 0 0 0-2.042 4.93m5.922-5.942a.958.958 0 1 1-1.355-1.355.958.958 0 0 1 1.355 1.355" clipRule="evenodd"/>
            </svg>
          </a>

          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
             className="w-10 h-10 flex items-center justify-center text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18.8 6.4c-.2-.8-.8-1.4-1.6-1.6C15.6 4.4 10 4.4 10 4.4s-5.6 0-7.2.4c-.8.2-1.4.8-1.6 1.6C.8 8 .8 10 .8 10s0 2 .4 3.6c.2.8.8 1.4 1.6 1.6 1.6.4 7.2.4 7.2.4s5.6 0 7.2-.4c.8-.2 1.4-.8 1.6-1.6.4-1.6.4-3.6.4-3.6s0-2-.4-3.6zM8.4 12.4V7.6l4.8 2.4-4.8 2.4z" clipRule="evenodd"/>
            </svg>
          </a>

          {/* X (Twitter) */}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer"
             className="w-10 h-10 flex items-center justify-center text-[rgba(245,245,245,0.6)] hover:text-[rgb(245,245,245)] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.75 2h2.84l-6.2 7.1L20 18h-5.7l-4.47-5.85L4.8 18H1.96l6.63-7.58L1.5 2h5.85l4.04 5.34L15.75 2zm-1 14.36h1.57L5.82 3.6H4.14l10.61 12.76z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Divider line - gray */}
      <div className="border-t border-[rgba(245,245,245,0.1)]" />

      {/* Bottom Footer - same background color */}
      <div className="py-4 px-4 bg-[rgb(18,18,18)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright - 11px, letter-spacing 0.7px, rgba(245,245,245,0.75) */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.7px',
            lineHeight: '18.7px',
            color: 'rgba(245, 245, 245, 0.75)'
          }}>
            © 2026, Syro Merch by{' '}
            <a
              href="https://lastro.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[rgb(245,245,245)] transition-colors"
              style={{ color: 'rgba(245, 245, 245, 0.75)' }}
            >
              LASTRO
            </a>
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.7px',
            lineHeight: '18.7px',
            color: 'rgba(245, 245, 245, 0.75)'
          }}>
            <Link href="/refund" className="hover:text-[rgb(245,245,245)] transition-colors">Política de reembolso</Link>
            <Link href="/privacy" className="hover:text-[rgb(245,245,245)] transition-colors">Política de privacidade</Link>
            <Link href="/terms" className="hover:text-[rgb(245,245,245)] transition-colors">Termos de serviço</Link>
            <Link href="/shipping" className="hover:text-[rgb(245,245,245)] transition-colors">Política de envio</Link>
            <Link href="/contact" className="hover:text-[rgb(245,245,245)] transition-colors">Informações de contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
