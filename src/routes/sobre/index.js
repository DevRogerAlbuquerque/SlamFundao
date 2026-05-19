import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../imagens/logoAmarelo.png";
import primeiraEdicao from "../../imagens/imagemEdicao.jpg";
import comoSurgiu from "../../imagens/comoSurgiu.jpg";
import oficinaMaior from "../../imagens/oficinaMaior.jpg";
import oficinaPimentas from "../../imagens/oficinaPimentas.jpg";
import imagemOficina from "../../imagens/imagemOficina.jpg";
import "./index.css";

/* ── hook: fade-in ao entrar na viewport ── */
function useFadeIn(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── hook: contador animado ── */
function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ── subcomponente: stat card com contador ── */
function StatCard({ valor, sufixo = "", label, delay = 0, active }) {
  const count = useCounter(valor, 1600, active);
  return (
    <div className="sn-stat" style={{ transitionDelay: `${delay}ms` }}>
      <span className="sn-stat-num">{count}{sufixo}</span>
      <span className="sn-stat-label">{label}</span>
    </div>
  );
}

/* ── subcomponente: seção fade ── */
function FadeSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      className={`sn-fade ${visible ? "sn-fade--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── subcomponente: linha do tempo ── */
const timeline = [
  { ano: "2022", titulo: "A semente", texto: "Nasce a ideia de criar um espaço de voz para os jovens das periferias de Guarulhos." },
  { ano: "2023", titulo: "Primeira edição", texto: "O Slam Fundão faz sua estreia na Praça Estrela, reunindo poetas e comunidade pela primeira vez." },
  { ano: "2023", titulo: "Primeiras oficinas", texto: "As oficinas de escrita criativa chegam às escolas estaduais da região." },
  { ano: "2024", titulo: "20+ oficinas", texto: "Mais de vinte oficinas realizadas em escolas, ONGs, CEUs e universidades de Guarulhos." },
  { ano: "2024", titulo: "Slam Estadual", texto: "O campeão do Slam Fundão conquista vaga no Slam Estadual, levando a voz da periferia para um palco maior." },
];

function Timeline() {
  const [ref, visible] = useFadeIn(0.1);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div ref={ref} className={`sn-timeline ${visible ? "sn-fade--in" : "sn-fade"}`}>
      <div className="sn-timeline-track">
        {timeline.map((item, i) => (
          <button
            key={i}
            className={`sn-tl-node ${i === activeIdx ? "ativo" : ""} ${i < activeIdx ? "passado" : ""}`}
            onClick={() => setActiveIdx(i)}
            aria-label={`${item.ano} — ${item.titulo}`}
          >
            <span className="sn-tl-dot" />
            <span className="sn-tl-ano">{item.ano}</span>
          </button>
        ))}
        <div className="sn-tl-bar">
          <div
            className="sn-tl-progress"
            style={{ width: `${(activeIdx / (timeline.length - 1)) * 100}%` }}
          />
        </div>
      </div>
      <div className="sn-tl-card">
        <span className="sn-tl-card-ano">{timeline[activeIdx].ano}</span>
        <h3 className="sn-tl-card-titulo">{timeline[activeIdx].titulo}</h3>
        <p className="sn-tl-card-texto">{timeline[activeIdx].texto}</p>
      </div>
    </div>
  );
}

/* ── subcomponente: galeria de oficinas ── */
function GaleriaOficinas() {
  const fotos = [
    { src: imagemOficina, alt: "Oficina de escrita criativa" },
    { src: oficinaMaior, alt: "Oficina maior" },
    { src: oficinaPimentas, alt: "Oficina Pimentas" },
  ];
  const [ativa, setAtiva] = useState(1);

  return (
    <div className="sn-galeria">
      {fotos.map((foto, i) => (
        <div
          key={i}
          className={`sn-galeria-item ${i === ativa ? "principal" : "lateral"} ${Math.abs(i - ativa) > 1 ? "oculto" : ""}`}
          onClick={() => setAtiva(i)}
          style={{ cursor: i !== ativa ? "pointer" : "default" }}
        >
          <img src={foto.src} alt={foto.alt} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════ */
export default function SobreNos() {
  const navigate = useNavigate();

  /* stats */
  const [statsRef, statsVisible] = useFadeIn(0.3);

  /* parallax sutil no hero */
  const heroRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sn-root" id="home">

      {/* ── HERO ── */}
      <section className="sn-hero">
        <div className="sn-hero-bg" ref={heroRef} />
        <div className="sn-hero-content">
          <img src={logo} alt="Logo Slam Fundão" className="sn-hero-logo" />
          <p className="sn-hero-tagline">Do Fundão para o fundão</p>
          <a href="#o-que-e" className="sn-hero-scroll" aria-label="Rolar para baixo">
            <span className="sn-scroll-arrow" />
          </a>
        </div>
      </section>

      {/* ── O QUE É ── */}
      <section className="sn-section" id="o-que-e">
        <FadeSection className="sn-section-label">O que é</FadeSection>
        <div className="sn-two-col">
          <FadeSection className="sn-img-wrap" delay={100}>
            <img src={primeiraEdicao} alt="Edição do Slam Fundão" className="sn-img" />
            <div className="sn-img-caption">Praça Estrela · 2023</div>
          </FadeSection>
          <FadeSection className="sn-text-col" delay={200}>
            <h2 className="sn-h2">Uma batalha de poesias que é muito mais do que um evento.</h2>
            <p className="sn-p">
              O Slam Fundão nasce como um <strong>espaço de resistência e expressão cultural</strong> nas
              periferias de Guarulhos — criado para <strong>democratizar o acesso à cultura e à
              literatura</strong> para jovens e adolescentes.
            </p>
            <p className="sn-p">
              Aqui, a poesia falada se torna uma ferramenta poderosa: para expressar sentimentos,
              vivências e perspectivas que a mídia nunca mostrou. Mais do que palavras — é um
              <strong> encontro de vozes que transformam a realidade por meio da arte</strong>.
            </p>
            <div className="sn-pill-row">
              <span className="sn-pill">Poesia falada</span>
              <span className="sn-pill">Resistência cultural</span>
              <span className="sn-pill">Periferia de Guarulhos</span>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="sn-stats-band" ref={statsRef}>
        <StatCard valor={20} sufixo="+" label="Oficinas realizadas" delay={0}   active={statsVisible} />
        <StatCard valor={3}  sufixo=""  label="Anos de história"    delay={150} active={statsVisible} />
        <StatCard valor={30} sufixo="+" label="Edições" delay={450} active={statsVisible} />
      </section>

      {/* ── COMO SURGIU + TIMELINE ── */}
      <section className="sn-section sn-section--alt" id="como-surgiu">
        <FadeSection className="sn-section-label">Como surgiu</FadeSection>
        <div className="sn-two-col sn-two-col--rev">
          <FadeSection className="sn-text-col" delay={100}>
            <h2 className="sn-h2">Uma resposta urgente ao isolamento cultural.</h2>
            <p className="sn-p">
              Criado como uma <strong>resposta ao isolamento cultural</strong> enfrentado por jovens da periferia,
              o Slam Fundão oferece um <strong>espaço seguro e inclusivo</strong> onde cada voz importa.
            </p>
            <p className="sn-p">
              Com o objetivo de levar voz e lazer para as comunidades, a primeira edição aconteceu
              em <strong>início de 2023</strong>. Desde então, <strong>os laços comunitários se fortalecem</strong> a
              cada encontro — e talentos que nunca tiveram palco finalmente ganham o deles.
            </p>
          </FadeSection>
          <FadeSection className="sn-img-wrap" delay={200}>
            <img src={comoSurgiu} alt="Como surgiu o Slam Fundão" className="sn-img sn-img--portrait" />
          </FadeSection>
        </div>

        {/* linha do tempo */}
        <FadeSection delay={100}>
          <h3 className="sn-h3-center">Nossa trajetória</h3>
          <Timeline />
        </FadeSection>
      </section>

      {/* ── EDIÇÕES ── */}
      <section className="sn-section" id="edicoes">
        <FadeSection className="sn-section-label">Edições</FadeSection>
        <FadeSection>
          <h2 className="sn-h2-center">Onde a poesia acontece</h2>
        </FadeSection>

        <div className="sn-edicoes-grid">
          <FadeSection className="sn-map-wrap" delay={100}>
            <iframe
              title="Localização Praça Estrela"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.089239685564!2d-46.40092998445125!3d-23.710245484610684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8e0b5d86f2b7%3A0xef5b83f93d1b6d8c!2sPra%C3%A7a%20Estrela%2C%20Cidade%20Soberana%2C%20Guarulhos%20-%20SP!5e0!3m2!1sen!2sbr!4v1697816407156!5m2!1sen!2sbr"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="sn-map-label">Praça Estrela · Cidade Soberana · Guarulhos — SP</p>
          </FadeSection>

          <div className="sn-edicoes-cards">
            <FadeSection className="sn-edicao-card" delay={150}>
              <div className="sn-edicao-icon">🎤</div>
              <h3>Edições mensais</h3>
              <p>
                Todo mês, poetas de diversas vivências compartilham suas palavras. Cada edição
                consagra um <strong>campeão mensal</strong>, que avança para a grande final do ano.
              </p>
            </FadeSection>
            <FadeSection className="sn-edicao-card sn-edicao-card--destaque" delay={250}>
              <div className="sn-edicao-icon">🏆</div>
              <h3>Edição final</h3>
              <p>
                No fim do ano, os campeões mensais se enfrentam em uma batalha decisiva. O vencedor
                garante sua vaga no <strong>Slam Estadual</strong>, representando a voz da periferia
                num cenário ainda maior.
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── OFICINAS ── */}
      <section className="sn-section sn-section--alt" id="oficinas">
        <FadeSection className="sn-section-label">Oficinas</FadeSection>
        <FadeSection>
          <h2 className="sn-h2-center">O Fundão chega até você</h2>
          <p className="sn-p-center">
            O Slam Fundão também atua fora das batalhas — com <strong>oficinas de escrita criativa</strong> em
            escolas, ONGs, CEUs e universidades. Um espaço onde a poesia se torna acessível e novas formas
            de expressão são descobertas.
          </p>
        </FadeSection>

        <FadeSection delay={100}>
          <GaleriaOficinas />
        </FadeSection>

        <FadeSection className="sn-oficinas-cta" delay={200}>
          <div className="sn-cta-card">
            <h3>Quer o Fundão na sua organização?</h3>
            <p>
              Se você é aluno, professor ou parte de uma organização e deseja levar nossas oficinas
              para o seu espaço, entre em contato e venha fazer parte dessa transformação cultural.
            </p>
            <button className="sn-btn-cta" onClick={() => navigate("/contato")}>
              Entre em contato
            </button>
          </div>
        </FadeSection>
      </section>

    </div>
  );
}