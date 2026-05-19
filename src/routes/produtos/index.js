import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Form, Carousel } from "react-bootstrap";
import { FaCartShopping, FaReply } from "react-icons/fa6";
import { Toast } from "primereact/toast";
import camisaBranca from "../../imagens/camisaBranca2.jpg";
import camisaAmarela from "../../imagens/camisaAmarela.jpg";
import camisaRoxa from "../../imagens/brancaRoxa.jpg";
import "./index.css";

/* ─── dados dos produtos ─── */
const produtos = [
  {
    id: 0,
    nome: "Camiseta Off-White",
    valor: 60,
    imagem: camisaBranca,
    imagens: "images/camisetas/branca/",
    capitulo: "Capítulo I",
    subtitulo: "A origem",
    verso:
      '"Em branco não há ausência — há espaço para tudo começar."',
    narrativa: [
      "A Off-White nasceu da vontade de criar algo limpo — sem ruído. Uma tela que carrega o logo do Slam Fundão como se ele tivesse sempre estado ali, esperando ser descoberto.",
      "Feita completamente à mão, costurada com o mesmo cuidado de um poema que não pode perder nenhuma vírgula.",
    ],
    destaque:
      '"O branco é o começo de toda história. É a página antes da primeira palavra."',
  },
  {
    id: 1,
    nome: "Camiseta Amarela",
    valor: 60,
    imagem: camisaAmarela,
    imagens: "images/camisetas/amarela/",
    capitulo: "Capítulo II",
    subtitulo: "O grito",
    verso:
      '"Amarelo é o tom da voz quando ela finalmente grita o que sempre quis dizer."',
    narrativa: [
      "Se a Off-White é o silêncio antes do poema, a Amarela é o momento em que a voz sobe. É a cor do palco, do holofote, da coragem de se colocar de pé e falar.",
      "Tingida à mão, cada peça tem nuances únicas — assim como cada slam tem sua própria frequência.",
    ],
    destaque:
      '"Há cores que sussurram. O amarelo não — ele declama."',
  },
  {
    id: 2,
    nome: "Camiseta Roxa",
    valor: 60,
    imagem: camisaRoxa,
    imagens: "images/camisetas/roxa/",
    capitulo: "Capítulo III",
    subtitulo: "A identidade",
    verso:
      '"O roxo é a cor da tinta que não seca — a que permanece depois que tudo foi dito."',
    narrativa: [
      "O roxo do Slam Fundão não é uma escolha estética — é uma declaração. É a cor da comunidade, da periferia que cria, da arte que resiste.",
      "Feita à mão, carregada de intenção. Quem veste sabe o que carrega.",
    ],
    destaque:
      '"Roxo é a cor do Fundão. Da noite que vira verso. Da raiz que não se apaga."',
  },
];

const TAMANHOS = ["P", "M", "G", "GG"];

/* ─── subcomponente: visão de detalhe ─── */
function DetalheView({ produto, onVoltar, onComprar }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");
  const [quantidade, setQuantidade] = useState(1);

  return (
    <div className="detalhe-view">
      <div className="detalhe-grid">
        {/* carrossel */}
        <div className="detalhe-carousel-wrap">
          <Carousel>
            {[1, 2, 3, 4].map((item) => (
              <Carousel.Item key={item}>
                <img
                  className="detalhe-img"
                  src={`${produto.imagens}${item}.jpg`}
                  alt={`${produto.nome} — foto ${item}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* info */}
        <div className="detalhe-info">
          <span className="detalhe-capitulo">{produto.capitulo}</span>
          <h1 className="detalhe-titulo">{produto.nome}</h1>

          <blockquote className="detalhe-verso">{produto.verso}</blockquote>

          <p className="detalhe-desc">
            Nossa camisa do Slam Fundão é confeccionada em 100% algodão,
            garantindo conforto e durabilidade. Feita totalmente à mão, ela
            carrega o cuidado e a exclusividade de um produto artesanal.
          </p>

          <div className="detalhe-preco">
            <span className="preco-moeda">R$</span>
            <span className="preco-valor">{produto.valor}</span>
          </div>

          {/* tamanho */}
          <div className="detalhe-secao">
            <span className="secao-label">Tamanho</span>
            <div className="tamanhos-row">
              {TAMANHOS.map((t) => (
                <button
                  key={t}
                  className={`tamanho-btn ${tamanhoSelecionado === t ? "ativo" : ""}`}
                  onClick={() => setTamanhoSelecionado(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* quantidade */}
          <div className="detalhe-secao">
            <span className="secao-label">Quantidade: {quantidade}</span>
            <Form.Range
              min={1}
              max={10}
              step={1}
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              className="custom-range quantidade-range"
            />
          </div>

          {/* ações */}
          <div className="detalhe-acoes">
            <button
              className="btn-comprar"
              onClick={() => onComprar({ ...produto, quantidade, tamanho: tamanhoSelecionado })}
            >
              <FaCartShopping /> Adicionar ao carrinho
            </button>
            <button className="btn-voltar" onClick={onVoltar}>
              <FaReply /> Voltar ao catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── subcomponente: card do catálogo ─── */
function ProdutoCard({ produto, onAbrir }) {
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`produto-section ${visible ? "visivel" : ""}`}
      id={`produto-${produto.id}`}
    >
      <div className="produto-section-inner">
        {/* card imagem */}
        <div
          className="card-imagem-wrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered((h) => !h)}
          onClick={() => onAbrir(produto)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onAbrir(produto)}
          aria-label={`Ver detalhes de ${produto.nome}`}
        >
          <img src={produto.imagem} alt={produto.nome} className="card-imagem" />
          <div className={`card-overlay ${hovered ? "visivel" : ""}`}>
            <p className="overlay-verso">{produto.verso}</p>
            <p className="overlay-hint">clique para ver mais</p>
          </div>
        </div>

        {/* narrativa */}
        <div className="produto-narrativa">
          <span className="narrativa-capitulo">{produto.capitulo}</span>
          <h2 className="narrativa-nome">{produto.nome}</h2>
          <span className="narrativa-subtitulo">{produto.subtitulo}</span>

          <blockquote className="narrativa-destaque">
            {produto.destaque}
          </blockquote>

          {produto.narrativa.map((p, i) => (
            <p key={i} className="narrativa-texto">{p}</p>
          ))}

          <div className="narrativa-tamanhos">
            {TAMANHOS.map((t) => (
              <span key={t} className="tamanho-pill">{t}</span>
            ))}
          </div>

          <div className="narrativa-preco">
            <span className="preco-moeda">R$</span>
            <span className="preco-valor">{produto.valor}</span>
          </div>

          <button className="btn-ver" onClick={() => onAbrir(produto)}>
            <FaCartShopping /> Quero essa
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── subcomponente: trilha de progresso ─── */
function Trilha({ visitados, ativo, onNavegar }) {
  return (
    <nav className="trilha" aria-label="Navegação do catálogo">
      {produtos.map((p, i) => (
        <div key={p.id} className="trilha-item">
          <button
            className={`trilha-step ${visitados.includes(i) ? "visitado" : ""} ${ativo === i ? "ativo" : ""}`}
            onClick={() => onNavegar(i)}
            aria-label={`Ir para ${p.nome}`}
          >
            <span className="trilha-dot" />
            <span className="trilha-label">{p.subtitulo}</span>
          </button>
          {i < produtos.length - 1 && (
            <div className={`trilha-linha ${visitados.includes(i) ? "done" : ""}`} />
          )}
        </div>
      ))}
    </nav>
  );
}

/* ─── componente principal ─── */
export default function Produtos() {
  const [produtoDetalhado, setProdutoDetalhado] = useState(null);
  const [visitados, setVisitados] = useState([]);
  const [ativo, setAtivo] = useState(0);
  const toast = useRef(null);
  const { adicionarItensCarrinho } = useOutletContext();
  const sectionsRef = useRef([]);

  /* scroll spy */
  useEffect(() => {
    if (produtoDetalhado) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setAtivo(idx);
            setVisitados((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [produtoDetalhado]);

  const navegarPara = (idx) => {
    const el = document.getElementById(`produto-${idx}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const comprar = (item) => {
    adicionarItensCarrinho(item);
    toast.current.show({
      severity: "success",
      summary: "Slam Fundão informa:",
      detail: "Seu produto foi adicionado ao carrinho!",
      life: 6000,
      className: "backgroundAmarelo",
    });
    setProdutoDetalhado(null);
  };

  /* ── detalhe ── */
  if (produtoDetalhado) {
    return (
      <>
        <Container fluid className="catalog-container">
          <DetalheView
            produto={produtoDetalhado}
            onVoltar={() => setProdutoDetalhado(null)}
            onComprar={comprar}
          />
        </Container>
        <Toast ref={toast} position="center" />
      </>
    );
  }

  /* ── catálogo narrativo ── */
  return (
    <>
      <div className="catalog-container">
        {/* cabeçalho */}
        <header className="catalog-header">
          <p className="catalog-eyebrow">Drop do Fundão · Coleção 2025</p>
          <h1 className="catalog-titulo">
            Três cores.<br />Uma poesia.
          </h1>
          <p className="catalog-subtitulo">
            Role e descubra a história por trás de cada peça. Passe o mouse nas
            fotos para ler o verso de cada uma.
          </p>
        </header>

        {/* trilha fixa */}
        <Trilha visitados={visitados} ativo={ativo} onNavegar={navegarPara} />

        {/* seções */}
        <div>
          {produtos.map((produto, i) => (
            <div
              key={produto.id}
              ref={(el) => (sectionsRef.current[i] = el)}
              data-idx={i}
            >
              <ProdutoCard produto={produto} onAbrir={setProdutoDetalhado} />
            </div>
          ))}
        </div>

        {/* rodapé */}
        <footer className="catalog-footer">
          <p className="footer-verso">
            "Três camisetas. Três capítulos de uma história que ainda está sendo
            escrita — por você."
          </p>
        </footer>
      </div>

      <Toast ref={toast} position="center" />
    </>
  );
}