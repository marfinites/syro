'use client'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export default function BiographyPage() {
  const milestones = [
    { year: '2007', title: 'O Início', description: 'Com apenas 12 anos, Diogo descobre a bateria e inicia a sua jornada musical.' },
    { year: '2012', title: 'Caelum', description: 'Co-funda a banda Caelum, vencedora do EDP Live Bands.' },
    { year: '2018', title: 'SYRO Nasce', description: 'Lança "Deixa Passar", o primeiro single a solo.' },
    { year: '2020', title: 'Explosão', description: '"Perto de Mim" conquista milhões e assina com a Sony Music.' },
    { year: '2021', title: 'Genesis', description: 'Lança o álbum de estreia com 12 faixas de pura emoção.' },
    { year: '2022', title: 'Festival da Canção', description: 'Representa Portugal com "Ainda nos Temos". Nomeado nos MTV EMA.' },
    { year: '2023', title: '11:11', description: 'Segundo álbum com 22 faixas e colaborações memoráveis.' },
    { year: '2025', title: 'Castelo de Cartas', description: 'Um dos maiores êxitos do ano em Portugal.' },
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[rgb(18,18,18)]">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgb(18,18,18)]" />
          <div className="absolute inset-0 bg-[rgb(18,18,18)]/40" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://syro-merch.pt/cdn/shop/files/543001291_18532312672024887_4129404704821775462_n.png?v=1760021364)',
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-10 pb-16">
            <h1
              className="text-[rgb(245,245,245)] font-bold tracking-tight"
              style={{ fontSize: 'clamp(48px, 12vw, 120px)', lineHeight: '0.9' }}
            >
              SYRO
            </h1>
            <p className="text-[rgba(245,245,245,0.7)] text-lg md:text-xl mt-4 max-w-xl">
              Diogo Lopes · Barreiro, Portugal
            </p>
          </div>
        </section>

        {/* Biography Section */}
        <section className="px-6 md:px-10 py-20">
          <div className="max-w-4xl">
            {/* Quote */}
            <blockquote className="mb-16">
              <p
                className="text-[rgb(245,245,245)] italic leading-relaxed"
                style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}
              >
                "Emotionally unavailable"
              </p>
              <cite className="text-[rgba(245,245,245,0.5)] text-sm mt-4 block">— Bio do Spotify</cite>
            </blockquote>

            {/* Main Biography - Poetic */}
            <div className="space-y-8 text-[rgba(245,245,245,0.85)] leading-relaxed" style={{ fontSize: '18px' }}>
              <p>
                Há quem nasça com o ritmo no sangue. <strong className="text-[rgb(245,245,245)]">Diogo Lopes</strong> nasceu com ele nas mãos.
                Aos doze anos, num canto qualquer do Barreiro, descobriu que a bateria era mais do que um instrumento —
                era uma linguagem, uma forma de traduzir o que as palavras não conseguiam dizer.
              </p>

              <p>
                Das margens do Tejo, onde o industrial encontra o humano, emergiu um artista que recusa a plasticidade
                das letras modernas. <strong className="text-[rgb(245,245,245)]">SYRO</strong> é a metamorfose de anos de estudo, de palcos partilhados,
                de noites em que a música era a única certeza. Formado em Jazz e Música Moderna, carrega consigo
                a sofisticação de quem estudou os mestres e a rebeldia de quem escolheu criar o seu próprio caminho.
              </p>

              <p>
                Com os <em>Caelum</em>, aprendeu o peso de uma banda, a força do coletivo. Mas havia algo dentro dele
                que pedia espaço — uma voz que precisava de ser só sua. Em 2018, nasceu SYRO. Não como uma reinvenção,
                mas como uma revelação. <em>"Deixa Passar"</em> foi o primeiro sussurro; <em>"Perto de Mim"</em> tornou-se um grito
                que ecoou por milhões.
              </p>

              <p>
                A sua música é feita de <strong className="text-[rgb(245,245,245)]">saudade e esperança</strong>, de madrugadas que não acabam e de amores
                que transcendem o romântico. Canta sobre o amor entre irmãos, entre avós e netos, entre almas
                que a vida juntou sem pedir licença. Cada canção é uma carta aberta, escrita com a tinta
                da vulnerabilidade.
              </p>

              <p>
                <em>Genesis</em> foi o princípio de tudo — um álbum que mapeia as origens, os medos, os sonhos.
                <em>11:11</em> veio depois, às onze horas e onze minutos de um dia de novembro, como quem acredita
                que há magia nos números e verdade nas coincidências. Vinte e duas faixas de quem não tem pressa,
                de quem sabe que a arte não se mede em segundos de streaming.
              </p>

              <p>
                Colaborou com <strong className="text-[rgb(245,245,245)]">Gisela João</strong> e trouxe o fado para o pop. Juntou-se a <strong className="text-[rgb(245,245,245)]">Piruka</strong> e provou
                que as fronteiras entre géneros são apenas linhas imaginárias. Com <strong className="text-[rgb(245,245,245)]">David Carreira</strong> e
                <strong className="text-[rgb(245,245,245)]"> Daniela Mercury</strong>, atravessou oceanos sem sair de casa.
              </p>

              <p>
                Em 2025, <em>"Castelo de Cartas"</em> tornou-se hino. E SYRO, que um dia foi apenas um rapaz
                do Barreiro com baquetas nas mãos, é agora uma das vozes mais autênticas da música portuguesa.
              </p>

              <p className="text-[rgb(252,228,119)] font-medium">
                Porque a música, para ele, nunca foi sobre fama. Foi sempre sobre sentir.
                E fazer sentir.
              </p>
            </div>
          </div>
        </section>

        {/* Spotify Player Section */}
        <section className="px-6 md:px-10 py-16 bg-[rgb(24,24,24)]">
          <div className="max-w-4xl">
            <h2 className="text-[rgb(245,245,245)] text-2xl font-medium mb-8">Ouve SYRO</h2>

            {/* Spotify Embed */}
            <div className="rounded-xl overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/artist/55axQKUUXr8LoUcKagMp5x?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>

            {/* Top Tracks */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="https://open.spotify.com/track/4wvhSaSZOCaXJCBOgWyT1j"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-[rgb(32,32,32)] p-4 rounded-lg hover:bg-[rgb(40,40,40)] transition-colors">
                  <p className="text-[rgb(245,245,245)] font-medium text-sm group-hover:text-[rgb(252,228,119)] transition-colors">Brutos Diamantes</p>
                  <p className="text-[rgba(245,245,245,0.5)] text-xs mt-1">12.6M plays</p>
                </div>
              </a>
              <a
                href="https://open.spotify.com/track/1q8eTAV1L1YVzV5l9RxJdT"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-[rgb(32,32,32)] p-4 rounded-lg hover:bg-[rgb(40,40,40)] transition-colors">
                  <p className="text-[rgb(245,245,245)] font-medium text-sm group-hover:text-[rgb(252,228,119)] transition-colors">Perto de Mim</p>
                  <p className="text-[rgba(245,245,245,0.5)] text-xs mt-1">10.3M plays</p>
                </div>
              </a>
              <a
                href="https://open.spotify.com/track/3aMSE0SfULMJy0oLFHTCvz"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-[rgb(32,32,32)] p-4 rounded-lg hover:bg-[rgb(40,40,40)] transition-colors">
                  <p className="text-[rgb(245,245,245)] font-medium text-sm group-hover:text-[rgb(252,228,119)] transition-colors">Acordar</p>
                  <p className="text-[rgba(245,245,245,0.5)] text-xs mt-1">6.1M plays</p>
                </div>
              </a>
              <a
                href="https://open.spotify.com/track/0V5xqKxLvYLRHJGhVJGVKv"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-[rgb(32,32,32)] p-4 rounded-lg hover:bg-[rgb(40,40,40)] transition-colors">
                  <p className="text-[rgb(245,245,245)] font-medium text-sm group-hover:text-[rgb(252,228,119)] transition-colors">Castelo de Cartas</p>
                  <p className="text-[rgba(245,245,245,0.5)] text-xs mt-1">1.5M plays</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-6 md:px-10 py-20">
          <div className="max-w-4xl">
            <h2 className="text-[rgb(245,245,245)] text-2xl font-medium mb-12">A Jornada</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(245,245,245,0.1)] transform md:-translate-x-1/2" />

              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Content */}
                    <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                      <span className="text-[rgb(252,228,119)] text-sm font-medium">{milestone.year}</span>
                      <h3 className="text-[rgb(245,245,245)] text-lg font-medium mt-1">{milestone.title}</h3>
                      <p className="text-[rgba(245,245,245,0.6)] text-sm mt-2">{milestone.description}</p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-[rgb(252,228,119)] rounded-full transform -translate-x-1/2 md:-translate-x-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="px-6 md:px-10 py-16 bg-[rgb(24,24,24)]">
          <div className="max-w-4xl">
            <h2 className="text-[rgb(245,245,245)] text-2xl font-medium mb-8">Segue SYRO</h2>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://open.spotify.com/artist/55axQKUUXr8LoUcKagMp5x"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[rgb(32,32,32)] px-6 py-3 rounded-full hover:bg-[rgb(40,40,40)] transition-colors"
              >
                <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="text-[rgb(245,245,245)] text-sm font-medium">Spotify</span>
              </a>

              <a
                href="https://www.instagram.com/syromusic/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[rgb(32,32,32)] px-6 py-3 rounded-full hover:bg-[rgb(40,40,40)] transition-colors"
              >
                <svg className="w-5 h-5 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="text-[rgb(245,245,245)] text-sm font-medium">Instagram</span>
              </a>

              <a
                href="https://www.youtube.com/channel/UCsyromusic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[rgb(32,32,32)] px-6 py-3 rounded-full hover:bg-[rgb(40,40,40)] transition-colors"
              >
                <svg className="w-5 h-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-[rgb(245,245,245)] text-sm font-medium">YouTube</span>
              </a>

              <a
                href="https://www.facebook.com/musicsyro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[rgb(32,32,32)] px-6 py-3 rounded-full hover:bg-[rgb(40,40,40)] transition-colors"
              >
                <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-[rgb(245,245,245)] text-sm font-medium">Facebook</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-10 py-20 text-center">
          <h2 className="text-[rgb(245,245,245)] text-3xl font-medium mb-4">Veste o Estilo</h2>
          <p className="text-[rgba(245,245,245,0.6)] mb-8 max-w-md mx-auto">
            Explora a coleção oficial de merch SYRO e apoia a música portuguesa.
          </p>
          <Link
            href="/"
            className="inline-block bg-[rgb(252,228,119)] text-[rgb(18,18,18)] font-semibold px-8 py-4 text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Ver Coleção
          </Link>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
