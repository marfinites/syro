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
        {/* Hero Section - Full screen with gradient overlay */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{
                backgroundImage: 'url(https://syro-merch.pt/cdn/shop/files/543001291_18532312672024887_4129404704821775462_n.png?v=1760021364)',
                filter: 'grayscale(100%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgb(18,18,18)]/30 via-[rgb(18,18,18)]/50 to-[rgb(18,18,18)]" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p className="text-[rgba(245,245,245,0.5)] text-sm tracking-[0.3em] uppercase mb-6">
              Diogo Lopes · Barreiro, Portugal
            </p>
            <h1
              className="text-[rgb(245,245,245)] font-light tracking-tight"
              style={{ fontSize: 'clamp(80px, 20vw, 200px)', lineHeight: '0.85' }}
            >
              SYRO
            </h1>
            <p className="text-[rgba(245,245,245,0.6)] text-lg mt-8 italic">
              "Emotionally unavailable"
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[rgba(245,245,245,0.3)]" />
          </div>
        </section>

        {/* Biography Section - Flowing text */}
        <section className="relative">
          <div className="max-w-2xl mx-auto px-6 py-32">
            <div className="space-y-12 text-[rgba(245,245,245,0.8)] leading-[1.9]" style={{ fontSize: '17px' }}>
              <p>
                Há quem nasça com o ritmo no sangue. <span className="text-[rgb(245,245,245)]">Diogo Lopes</span> nasceu com ele nas mãos.
                Aos doze anos, num canto qualquer do Barreiro, descobriu que a bateria era mais do que um instrumento,
                era uma linguagem, uma forma de traduzir o que as palavras não conseguiam dizer.
              </p>

              <p>
                Das margens do Tejo, onde o industrial encontra o humano, emergiu um artista que recusa a plasticidade
                das letras modernas. <span className="text-[rgb(245,245,245)]">SYRO</span> é a metamorfose de anos de estudo, de palcos partilhados,
                de noites em que a música era a única certeza.
              </p>

              <p className="text-center text-[rgba(245,245,245,0.4)] text-sm tracking-[0.2em] py-8">
                ·
              </p>

              <p>
                Formado em Jazz e Música Moderna, carrega consigo a sofisticação de quem estudou os mestres
                e a rebeldia de quem escolheu criar o seu próprio caminho. Com os <em>Caelum</em>, aprendeu o peso
                de uma banda, a força do coletivo. Mas havia algo dentro dele que pedia espaço, uma voz que
                precisava de ser só sua.
              </p>

              <p>
                Em 2018, nasceu SYRO. Não como uma reinvenção, mas como uma revelação.
                <em> "Deixa Passar"</em> foi o primeiro sussurro; <em>"Perto de Mim"</em> tornou-se um grito
                que ecoou por milhões.
              </p>

              <p className="text-center text-[rgba(245,245,245,0.4)] text-sm tracking-[0.2em] py-8">
                ·
              </p>

              <p>
                A sua música é feita de saudade e esperança, de madrugadas que não acabam e de amores
                que transcendem o romântico. Canta sobre o amor entre irmãos, entre avós e netos, entre almas
                que a vida juntou sem pedir licença.
              </p>

              <p className="text-[rgb(245,245,245)] text-center text-xl leading-relaxed py-8">
                Cada canção é uma carta aberta,<br />
                escrita com a tinta da vulnerabilidade.
              </p>

              <p>
                <em>Genesis</em> foi o princípio de tudo, um álbum que mapeia as origens, os medos, os sonhos.
                <em> 11:11</em> veio depois, às onze horas e onze minutos de um dia de novembro, como quem acredita
                que há magia nos números e verdade nas coincidências.
              </p>

              <p>
                Colaborou com <span className="text-[rgb(245,245,245)]">Gisela João</span> e trouxe o fado para o pop.
                Juntou-se a <span className="text-[rgb(245,245,245)]">Piruka</span> e provou que as fronteiras entre géneros
                são apenas linhas imaginárias. Com <span className="text-[rgb(245,245,245)]">David Carreira</span> e
                <span className="text-[rgb(245,245,245)]"> Daniela Mercury</span>, atravessou oceanos sem sair de casa.
              </p>

              <p className="text-center text-[rgba(245,245,245,0.4)] text-sm tracking-[0.2em] py-8">
                ·
              </p>

              <p className="text-center">
                Em 2025, <em>"Castelo de Cartas"</em> tornou-se hino.<br />
                E SYRO, que um dia foi apenas um rapaz do Barreiro com baquetas nas mãos,<br />
                é agora uma das vozes mais autênticas da música portuguesa.
              </p>

              <p className="text-[rgb(245,245,245)] text-center text-lg mt-16 tracking-wide">
                A música nunca foi sobre fama.<br />
                Foi sempre sobre sentir. E fazer sentir.
              </p>
            </div>
          </div>
        </section>

        {/* Spotify Player Section - Minimal */}
        <section className="border-t border-[rgba(245,245,245,0.08)]">
          <div className="max-w-4xl mx-auto px-6 py-24">
            <p className="text-center text-[rgba(245,245,245,0.4)] text-xs tracking-[0.3em] uppercase mb-12">
              Ouvir
            </p>

            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://open.spotify.com/embed/artist/55axQKUUXr8LoUcKagMp5x?utm_source=generator&theme=0"
                width="100%"
                height="400"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Timeline Section - Vertical elegant */}
        <section className="border-t border-[rgba(245,245,245,0.08)]">
          <div className="max-w-3xl mx-auto px-6 py-24">
            <p className="text-center text-[rgba(245,245,245,0.4)] text-xs tracking-[0.3em] uppercase mb-20">
              A Jornada
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(245,245,245,0.1)] -translate-x-1/2" />

              {/* Timeline items */}
              <div className="space-y-20">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                      <span className="text-[rgba(245,245,245,0.3)] text-xs tracking-[0.2em]">{milestone.year}</span>
                      <h3 className="text-[rgb(245,245,245)] text-lg font-light mt-1">{milestone.title}</h3>
                      <p className="text-[rgba(245,245,245,0.5)] text-sm mt-2 leading-relaxed">{milestone.description}</p>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[rgb(245,245,245)]" />

                    {/* Empty space */}
                    <div className="w-5/12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Links Section - Minimal */}
        <section className="border-t border-[rgba(245,245,245,0.08)]">
          <div className="max-w-2xl mx-auto px-6 py-24 text-center">
            <p className="text-[rgba(245,245,245,0.4)] text-xs tracking-[0.3em] uppercase mb-12">
              Ligações
            </p>

            <div className="flex justify-center gap-12">
              <a
                href="https://open.spotify.com/artist/55axQKUUXr8LoUcKagMp5x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] transition-colors text-sm tracking-wide"
              >
                Spotify
              </a>
              <a
                href="https://www.instagram.com/syromusic/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] transition-colors text-sm tracking-wide"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCsyromusic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] transition-colors text-sm tracking-wide"
              >
                YouTube
              </a>
              <a
                href="https://www.facebook.com/musicsyro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.5)] hover:text-[rgb(245,245,245)] transition-colors text-sm tracking-wide"
              >
                Facebook
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section - Elegant */}
        <section className="border-t border-[rgba(245,245,245,0.08)]">
          <div className="max-w-2xl mx-auto px-6 py-32 text-center">
            <p className="text-[rgba(245,245,245,0.5)] text-sm mb-6">
              Explora a coleção oficial
            </p>
            <Link
              href="/"
              className="inline-block text-[rgb(245,245,245)] text-2xl font-light hover:opacity-60 transition-opacity"
            >
              Ver Merch →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </>
  )
}
