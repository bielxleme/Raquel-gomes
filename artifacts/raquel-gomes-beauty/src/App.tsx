import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Brush,
  Eye,
  GraduationCap,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { Photo, photoSrc, type PhotoName } from '@/components/photo';

const whatsapp = (text: string) => `https://wa.me/5516997616096?text=${encodeURIComponent(text)}`;
const appointmentUrl = whatsapp('Olá, Raquel! Gostaria de agendar um horário ou uma avaliação. Pode me passar as opções?');
const courseUrl = whatsapp('Olá, Raquel! Tenho interesse nos seus cursos/mentoria. Pode me passar mais informações?');
const instagramUrl = 'https://www.instagram.com/raquelgomesmicro/';
const facebookUrl = 'https://www.facebook.com/raquelg.makeup/?locale=pt_BR';
const mapsQuery = 'Rua Antenor Munhineli, 105 - Alto do Ouro Verde 2, Borborema - SP, 14955-000';

const navigation = [
  ['Início', '#inicio'],
  ['Especialidades', '#especialidades'],
  ['Resultados', '#resultados'],
  ['Cursos', '#cursos'],
  ['Sobre', '#sobre'],
  ['Contato', '#contato'],
] as const;

type LightboxItem = { photo: PhotoName; label: string; alt: string };

const specialties: Array<{ index: string; title: string; text: string; photo: PhotoName; alt: string; icon: typeof Sparkles; position?: string }> = [
  {
    index: '01',
    title: 'Micropigmentação',
    text: 'Sobrancelhas fio a fio, nanopigmentação realista e lábios — técnicas modernas com efeito natural.',
    photo: 'res-fios',
    alt: 'Sobrancelhas com nanopigmentação de fios realistas',
    icon: Sparkles,
    position: '82% center',
  },
  {
    index: '02',
    title: 'Maquiagem profissional',
    text: 'Produções para noivas, madrinhas e eventos, pensadas para valorizar quem você é.',
    photo: 'raquel-selfie',
    alt: 'Raquel Gomes com maquiagem profissional',
    icon: Brush,
    position: 'center 30%',
  },
  {
    index: '03',
    title: 'Design & despigmentação',
    text: 'Design do olhar, brow lamination e remoção de pigmentos antigos para recomeçar com harmonia.',
    photo: 'res-lamination',
    alt: 'Sobrancelhas com brow lamination e design',
    icon: Eye,
    position: 'center 30%',
  },
];

const results: Array<LightboxItem & { tag: string; text: string; position?: string }> = [
  {
    photo: 'res-labios',
    tag: 'Antes & depois',
    label: 'Atualização de técnica',
    text: 'Pigmento antigo corrigido com uma técnica atual — sobrancelhas e lábios mais leves e naturais.',
    alt: 'Antes e depois de atualização de técnica de micropigmentação em sobrancelhas e lábios',
  },
  {
    photo: 'res-remocao',
    tag: 'Despigmentação',
    label: 'Remoção de pigmento',
    text: 'Pigmento acinzentado removido por completo após duas sessões.',
    alt: 'Antes e depois da remoção total de pigmento acinzentado das sobrancelhas',
  },
  {
    photo: 'res-fios',
    tag: 'Nanopigmentação',
    label: 'Fios realistas',
    text: 'Sobrancelhas naturais, definidas e em harmonia com o rosto.',
    alt: 'Sobrancelhas com nanopigmentação de fios realistas',
    position: '86% center',
  },
  {
    photo: 'res-lamination',
    tag: 'Design do olhar',
    label: 'Brow lamination + tintura',
    text: 'Fios alinhados, volume e cor na medida certa.',
    alt: 'Resultado de brow lamination com tintura',
  },
];

const gallery: LightboxItem[] = [
  { photo: 'procedimento', label: 'Procedimento em andamento', alt: 'Raquel realizando micropigmentação de sobrancelhas no studio' },
  { photo: 'raquel-selfie', label: 'Beauty & makeup', alt: 'Retrato de Raquel Gomes com maquiagem' },
  { photo: 'turma-curso', label: 'Turma de formação', alt: 'Raquel com alunas certificadas no curso de sobrancelhas' },
  { photo: 'marca', label: 'Raquel Gomes Studio', alt: 'Identidade visual Raquel Gomes Studio de Beleza' },
];

const heroWords = ['A', 'arte', 'de', 'realçar', 'a', 'sua'];

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CircleBadge() {
  return (
    <div className="circle-badge" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text>
          <textPath href="#badge-circle">Micropigmentação · Makeup · Design · </textPath>
        </text>
      </svg>
      <span>RG</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<LightboxItem | null>(null);
  const lightboxRef = useRef<HTMLDialogElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    if (activeImage && !dialog.open) dialog.showModal();
    if (!activeImage && dialog.open) dialog.close();
  }, [activeImage]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap header-inner">
          <a className="wordmark" href="#inicio" aria-label="Raquel Gomes Beauty and Makeup — início">
            <span className="monogram" aria-hidden="true">R</span>
            <span className="wordmark-copy">
              <span className="wordmark-title">Raquel Gomes</span>
              <span className="wordmark-sub">Beauty &amp; Makeup</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="header-cta" href={appointmentUrl} target="_blank" rel="noreferrer">
            Agendar avaliação <ArrowRight size={14} aria-hidden="true" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação móvel">
            {navigation.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
            <a className="mobile-cta" href={appointmentUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
              Agendar pelo WhatsApp
            </a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow hero-fade" style={{ animationDelay: '.05s' }}>Raquel Gomes Micro · Borborema, SP</span>
              <h1 className="serif" aria-label="A arte de realçar a sua beleza natural.">
                {heroWords.map((word, i) => (
                  <span className="word" key={`${word}-${i}`} aria-hidden="true" style={{ animationDelay: `${0.12 + i * 0.07}s` }}>
                    {word}{' '}
                  </span>
                ))}
                <em className="word" aria-hidden="true" style={{ animationDelay: '.6s' }}>beleza natural.</em>
              </h1>
              <p className="hero-desc hero-fade" style={{ animationDelay: '.75s' }}>
                Especialista em micropigmentação, maquiagem e design do olhar — com técnica apurada e atenção a cada detalhe.
              </p>
              <div className="hero-actions hero-fade" style={{ animationDelay: '.85s' }}>
                <a className="button-primary shine" href={appointmentUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={15} aria-hidden="true" /> Agendar pelo WhatsApp
                </a>
                <a className="button-outline" href="#especialidades">
                  Conhecer procedimentos <ArrowDownRight size={15} aria-hidden="true" />
                </a>
              </div>
              <dl className="hero-stats hero-fade" style={{ animationDelay: '.95s' }}>
                <div><dt>+10 mil</dt><dd>seguidores no Instagram</dd></div>
                <div><dt>Cursos</dt><dd>e mentoria para profissionais</dd></div>
              </dl>
            </div>
            <div className="hero-visual hero-fade" style={{ animationDelay: '.2s' }}>
              <div className="hero-photo">
                <Photo
                  name="raquel-retrato"
                  alt="Raquel Gomes, especialista em micropigmentação e maquiagem"
                  sizes="(max-width: 680px) 90vw, 46vw"
                  priority
                  style={{ objectPosition: 'center 26%' }}
                />
              </div>
              <CircleBadge />
              <button
                className="hero-result"
                type="button"
                onClick={() => setActiveImage(results[3])}
                aria-label="Ver resultado: brow lamination com tintura"
              >
                <Photo name="res-lamination" alt="" sizes="96px" style={{ objectPosition: 'center 30%' }} />
                <span><small>Resultado real</small>Brow lamination</span>
              </button>
              <div className="hero-caption">Raquel Gomes · Beauty &amp; Makeup</div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Áreas de atuação">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, n) => (
              <div className="marquee-group" key={n} aria-hidden={n === 1}>
                <span>Micropigmentação</span><i />
                <span>Nanopigmentação realista</span><i />
                <span>Maquiagem profissional</span><i />
                <span>Brow lamination</span><i />
                <span>Despigmentação</span><i />
                <span>Cursos &amp; mentoria</span><i />
              </div>
            ))}
          </div>
        </div>

        <section className="section specialties" id="especialidades">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <span className="eyebrow">O que fazemos</span>
              <h2 className="serif">Precisão que respeita a sua essência.</h2>
              <p>Cada atendimento começa com escuta e avaliação. Conheça as especialidades do studio.</p>
            </div>
            <div className="specialty-grid">
              {specialties.map((item, i) => {
                const Icon = item.icon;
                return (
                  <article className="specialty-card" key={item.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
                    <div className="specialty-media">
                      <Photo name={item.photo} alt={item.alt} sizes="(max-width: 680px) 92vw, 32vw" style={{ objectPosition: item.position }} />
                      <span className="service-index">{item.index}</span>
                    </div>
                    <div className="specialty-body">
                      <span className="service-icon"><Icon size={18} strokeWidth={1.4} aria-hidden="true" /></span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <a className="text-link" href={appointmentUrl} target="_blank" rel="noreferrer">
                        Agendar avaliação <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section results" id="resultados">
          <div className="wrap">
            <div className="split-heading">
              <div className="section-heading" data-reveal>
                <span className="eyebrow">Resultados reais</span>
                <h2 className="serif">Transformações que falam por si.</h2>
              </div>
              <p className="side-note" data-reveal>
                Procedimentos realizados por Raquel Gomes no studio. Clique em uma imagem para ver em tamanho ampliado.
              </p>
            </div>
            <div className="results-grid">
              {results.map((item, i) => (
                <figure className="result-card" key={item.label} data-reveal style={{ transitionDelay: `${i * 0.07}s` }}>
                  <button
                    type="button"
                    className="result-media"
                    onClick={() => setActiveImage(item)}
                    aria-label={`Ampliar: ${item.label}`}
                    data-testid={`button-result-${i + 1}`}
                  >
                    <Photo name={item.photo} alt={item.alt} sizes="(max-width: 680px) 46vw, (max-width: 1100px) 46vw, 24vw" style={{ objectPosition: item.position }} />
                    <span className="result-tag">{item.tag}</span>
                    <span className="zoom-hint" aria-hidden="true"><ArrowUpRight size={16} /></span>
                  </button>
                  <figcaption>
                    <h3>{item.label}</h3>
                    <p>{item.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section courses" id="cursos">
          <div className="wrap courses-grid">
            <div className="courses-visual" data-reveal>
              <Photo name="bancada-curso" alt="Bancada preparada para o Curso Especialista em Sobrancelhas por Raquel Gomes" sizes="(max-width: 680px) 92vw, 42vw" style={{ objectPosition: 'center 12%' }} />
            </div>
            <div className="courses-copy" data-reveal>
              <span className="eyebrow">Para profissionais</span>
              <h2 className="serif">Cursos &amp; mentoria.</h2>
              <p>
                Além dos atendimentos, Raquel compartilha a sua técnica com quem quer se especializar, em cursos e
                mentorias com acompanhamento de perto.
              </p>
              <ul className="course-list">
                <li><GraduationCap size={18} strokeWidth={1.4} aria-hidden="true" /><div><b>Curso Especialista em Sobrancelhas</b><span>Formação completa para quem quer se especializar em sobrancelhas.</span></div></li>
                <li><GraduationCap size={18} strokeWidth={1.4} aria-hidden="true" /><div><b>Mentoria de Nanopigmentação Realista</b><span>Formato exclusivo, com foco em fios realistas e naturais.</span></div></li>
              </ul>
              <a className="button-primary" href={courseUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={15} aria-hidden="true" /> Quero saber das turmas
              </a>
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="wrap">
            <div className="split-heading">
              <div className="section-heading" data-reveal>
                <span className="eyebrow">Um olhar por dentro</span>
                <h2 className="serif">Cuidado que se vê nos detalhes.</h2>
              </div>
              <a className="button-outline ig-button" href={instagramUrl} target="_blank" rel="noreferrer" data-reveal>
                <Instagram size={15} aria-hidden="true" /> @raquelgomesmicro
              </a>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <figure className="gallery-item" key={item.label} data-reveal data-testid={`gallery-image-${index + 1}`} style={{ transitionDelay: `${index * 0.06}s` }}>
                  <button
                    className="gallery-image-button"
                    type="button"
                    aria-label={`Ampliar imagem: ${item.label}`}
                    onClick={() => setActiveImage(item)}
                    data-testid={`button-gallery-image-${index + 1}`}
                  >
                    <Photo name={item.photo} alt={item.alt} sizes="(max-width: 680px) 92vw, 40vw" />
                  </button>
                  <figcaption className="gallery-label">{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="sobre">
          <div className="wrap about-grid">
            <div className="about-visual" data-reveal>
              <Photo name="raquel-studio" alt="Raquel Gomes no seu studio de beleza" sizes="(max-width: 680px) 88vw, 44vw" style={{ objectPosition: 'center 28%' }} />
              <span className="photo-tag">Raquel Gomes</span>
            </div>
            <div className="about-copy" data-reveal>
              <span className="eyebrow">A profissional</span>
              <h2 className="serif">Técnica apurada.<br />Cuidado de perto.</h2>
              <p>
                Raquel Gomes é especialista em micropigmentação, nanopigmentação realista, maquiagem e design do
                olhar. Seu trabalho une estudo constante, técnica atualizada e um atendimento individualizado.
              </p>
              <div className="about-quote">
                Cada rosto tem a sua harmonia — o objetivo é realçar, nunca esconder.
              </div>
              <p>
                No studio, o atendimento começa com uma conversa: entender o que você busca, avaliar sua pele e seus
                traços e cuidar de cada etapa com atenção.
              </p>
              <div className="about-signature"><b>Raquel Gomes</b><span>Beauty &amp; Makeup · Raquel Gomes Micro</span></div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contato">
          <div className="wrap contact-grid">
            <div className="section-heading" data-reveal>
              <span className="eyebrow">Vamos conversar</span>
              <h2 className="serif">Seu próximo cuidado começa aqui.</h2>
              <p>Agende um horário ou converse sobre uma avaliação. Será um prazer receber você no studio.</p>
              <div className="contact-actions">
                <a className="button-primary shine" href={appointmentUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={15} aria-hidden="true" /> Falar pelo WhatsApp
                </a>
                <a className="button-outline" href="mailto:raquelsg10@gmail.com">
                  <AtSign size={15} aria-hidden="true" /> Enviar e-mail
                </a>
              </div>
            </div>
            <div className="contact-side" data-reveal>
              <div className="contact-details">
                <div className="contact-row">
                  <MapPin className="contact-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  <div><small>Visite o studio</small><address>Rua Antenor Munhineli, 105<br />Alto do Ouro Verde 2<br />Borborema - SP, CEP 14955-000</address></div>
                </div>
                <div className="contact-row">
                  <MessageCircle className="contact-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  <div><small>WhatsApp</small><a href={appointmentUrl} target="_blank" rel="noreferrer">(16) 99761-6096</a></div>
                </div>
                <div className="contact-row">
                  <AtSign className="contact-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  <div><small>E-mail</small><a href="mailto:raquelsg10@gmail.com">raquelsg10@gmail.com</a></div>
                </div>
              </div>
              <div className="map-frame">
                <iframe
                  title="Mapa do studio Raquel Gomes em Borborema"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div>
            <a className="footer-brand" href="#inicio">Raquel Gomes</a>
            <div className="footer-caption">Beauty &amp; Makeup · Raquel Gomes Micro</div>
          </div>
          <nav className="footer-links" aria-label="Redes sociais">
            <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a href="mailto:raquelsg10@gmail.com">E-mail</a>
          </nav>
          <span className="footer-copy">© {new Date().getFullYear()} Raquel Gomes. Todos os direitos reservados.</span>
        </div>
      </footer>

      <dialog
        className="lightbox"
        ref={lightboxRef}
        aria-label={activeImage?.alt ?? 'Imagem ampliada'}
        onClose={() => setActiveImage(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) lightboxRef.current?.close();
        }}
      >
        {activeImage && (
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              type="button"
              aria-label="Fechar imagem ampliada"
              onClick={() => lightboxRef.current?.close()}
              data-testid="button-close-gallery-image"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <img src={photoSrc(activeImage.photo, 'large')} alt={activeImage.alt} />
            <p>{activeImage.label}</p>
          </div>
        )}
      </dialog>

      <a className="floating-whatsapp" href={appointmentUrl} target="_blank" rel="noreferrer" aria-label="Agende um horário ou avaliação pelo WhatsApp">
        <MessageCircle size={17} aria-hidden="true" /> <span>Agendar avaliação</span>
      </a>
    </div>
  );
}

export default App;
