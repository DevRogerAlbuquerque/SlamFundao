import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo          from "../../imagens/logobanner.png";
import coroa         from "../../imagens/coroa.png";
import camisaBranca  from "../../imagens/camisaBranca.jpg";
import camisaRoxa    from "../../imagens/brancaRoxa.jpg";
import camisaAmarela from "../../imagens/camisaAmarela.jpg";
import integrantes   from "../../imagens/integrantes.jpg";

import "./index.css";

/* ─── hook: fade ao entrar na viewport ─── */
function useFade(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ─── ticker de palavras no hero ─── */
const FRASES = ["poesia", "periferia", "voz"];

function TickerWord() {
  const [idx, setIdx]       = useState(0);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSaindo(true);
      setTimeout(() => { setIdx(i => (i + 1) % FRASES.length); setSaindo(false); }, 380);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`ticker-word ${saindo ? "ticker-out" : "ticker-in"}`}>
      {FRASES[idx]}
    </span>
  );
}

/* ─── card de produto com tilt 3D no hover ─── */
function ProdutoCard({ src, nome, onClick, delay }) {
  const cardRef       = useRef(null);
  const [ref, vis]    = useFade(0.2);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 16;
    const y = ((e.clientY - top)  / height - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.04)`;
  };

  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      className={`pf ${vis ? "pf--in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={cardRef}
        className="h-prod-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && onClick()}
        aria-label={`Ver produto: ${nome}`}
      >
        <img src={src} alt={nome} />
        <div className="h-prod-ov">
          <span className="h-prod-nome">{nome}</span>
          <span className="h-prod-cta">Ver agora →</span>
        </div>
      </div>
    </div>
  );
}

/* ─── componente principal ─── */
export default function Home() {
  const navigate = useNavigate();

  /* parallax hero */
  const bgRef    = useRef(null);
  const coroaRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current)    bgRef.current.style.transform    = `translateY(${y * 0.25}px)`;
      if (coroaRef.current) coroaRef.current.style.transform = `translateY(${y * 0.15}px) rotate(${y * 0.02}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* fades de seção */
  const [prodHeaderRef, prodHeaderVis] = useFade();
  const [sobreRef, sobreVis]           = useFade();
  const [locRef,   locVis]             = useFade();
  const [ctaRef,   ctaVis]             = useFade(0.3);

  return (
    <div id="home">

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="h-hero">
        <div className="h-hero-bg" ref={bgRef} />

        <div className="h-hero-text">
          <img src={logo} alt="Slam Fundão" className="h-logo" />

          <h1 className="h-h1">
            Cultura,&nbsp;<TickerWord /><br />e resistência periférica.
          </h1>

          <p className="h-hero-sub">
            Do Fundão de Guarulhos para o mundo — poesia que transforma.
          </p>

          <div className="h-hero-actions">
            <button className="h-btn h-btn--amarelo" onClick={() => navigate("/sobre")}>
              Conheça o movimento
            </button>
            <button className="h-btn h-btn--ghost" onClick={() => navigate("/produtos")}>
              Ver drop →
            </button>
          </div>
        </div>

        <div className="h-hero-coroa" ref={coroaRef}>
          <img src={coroa} alt="Coroa Slam Fundão" />
        </div>

        <a href="#produtos" className="h-scroll-hint" aria-label="Rolar para produtos">
          <span className="h-scroll-line" />
        </a>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════ */}
      <div className="h-marquee" aria-hidden="true">
        <div className="h-marquee-track">
          {["POESIA","RESISTÊNCIA","FUNDÃO","GUARULHOS","SLAM","CULTURA","PERIFERIA","VOZ",
            "POESIA","RESISTÊNCIA","FUNDÃO","GUARULHOS","SLAM","CULTURA","PERIFERIA","VOZ"].map((w, i) => (
            <span key={i} className="h-marquee-word">
              {w} <span className="h-marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ PRODUTOS ══════════════════════════════════════ */}
      <section className="h-section" id="produtos">
        <div
          ref={prodHeaderRef}
          className={`h-prod-header hf ${prodHeaderVis ? "hf--in" : ""}`}
        >
          <span className="h-eyebrow">Drop Slam Fundão</span>
          <h2 className="h-h2">
            Veste a poesia.<br />
            <em>Apoia o movimento.</em>
          </h2>
          <p className="h-prod-sub">
            Camisetas artesanais, feitas à mão, 100% algodão. Cada peça conta uma história.
          </p>
        </div>

        <div className="h-prod-grid">
          <ProdutoCard src={camisaBranca}  nome="Camiseta Off-White" onClick={() => navigate("/produtos")} delay={0}   />
          <ProdutoCard src={camisaAmarela} nome="Camiseta Amarela"   onClick={() => navigate("/produtos")} delay={120} />
          <ProdutoCard src={camisaRoxa}    nome="Camiseta Roxa"      onClick={() => navigate("/produtos")} delay={240} />
        </div>

        <div className="h-prod-footer">
          <button className="h-btn h-btn--roxo" onClick={() => navigate("/produtos")}>
            Ver catálogo completo
          </button>
        </div>
      </section>

      {/* ══ SOBRE ═════════════════════════════════════════ */}
      <section className="h-section--sobre">
        <div ref={sobreRef} className={`h-sobre-inner hf ${sobreVis ? "hf--in" : ""}`}>
          <div className="h-sobre-img-wrap">
            <img src={integrantes} alt="Integrantes do Slam Fundão" className="h-sobre-img" />
            <div className="h-sobre-badge">
              <span>Desde</span>
              <strong>2023</strong>
            </div>
          </div>

          <div className="h-sobre-text">
            <span className="h-eyebrow">O movimento</span>
            <h2 className="h-h2">O que é o<br />Slam Fundão?</h2>
            <p>
              Uma batalha de poesias que nasce como <strong>espaço de resistência e expressão
              cultural</strong> nas periferias de Guarulhos — criado para democratizar o acesso à
              cultura para jovens e adolescentes.
            </p>
            <p>
              Mais do que um evento: um <strong>encontro de vozes que transforma a realidade
              através da arte</strong>.
            </p>
            <button className="h-btn h-btn--amarelo" onClick={() => navigate("/sobre")}>
              Nossa história →
            </button>
          </div>
        </div>
      </section>

      {/* ══ LOCALIZAÇÃO ═══════════════════════════════════ */}
      <section className="h-section--loc">
        <div ref={locRef} className={`h-loc-inner hf ${locVis ? "hf--in" : ""}`}>
          <div className="h-loc-text">
            <span className="h-eyebrow">Onde acontece</span>
            <h2 className="h-h2">No fundão<br />de Guarulhos.</h2>
            <p>
              📍 <strong>Praça Estrela</strong><br />
              Cidade Soberana – Guarulhos / SP
            </p>
            <p className="h-loc-info">
              Chega junto, cola com a gente e fortalece a cena cultural periférica.
            </p>
          </div>

          <div className="h-mapa-wrap">
            <iframe
              title="Localização Slam Fundão"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.089239685564!2d-46.40092998445125!3d-23.710245484610684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8e0b5d86f2b7%3A0xef5b83f93d1b6d8c!2sPra%C3%A7a%20Estrela%2C%20Cidade%20Soberana%2C%20Guarulhos%20-%20SP!5e0!3m2!1sen!2sbr!4v1697816407156!5m2!1sen!2sbr"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════ */}
      <section className="h-section--cta">
        <div ref={ctaRef} className={`h-cta-inner hf ${ctaVis ? "hf--in" : ""}`}>
          <p className="h-cta-eyebrow">Pronto pra fazer parte?</p>
          <h2 className="h-cta-h2">A poesia espera<br />por você.</h2>
          <div className="h-cta-btns">
            <button className="h-btn h-btn--roxo" onClick={() => navigate("/produtos")}>
              Ver drop de camisetas
            </button>
            <button className="h-btn h-btn--ghost-dark" onClick={() => navigate("/sobre")}>
              Conhecer o Slam
            </button>
          </div>
        </div>
      </section>

      {/* ══ CTA FIXO MOBILE ══════════════════════════════ */}
      <div className="h-cta-mobile">
        <button className="h-btn h-btn--roxo h-cta-mobile-btn" onClick={() => navigate("/produtos")}>
          Ver produtos
        </button>
      </div>
    </div>
  );
}