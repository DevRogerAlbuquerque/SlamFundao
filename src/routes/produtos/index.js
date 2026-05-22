import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Container, Form, Carousel } from "react-bootstrap";
import { FaCartShopping, FaReply, FaTrash, FaPen, FaCheck, FaXmark, FaSpinner } from "react-icons/fa6";
import { Toast } from "primereact/toast";
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./index.css";
import { FaPlusCircle } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";

const IS_ADMIN = window.location.hostname === 'admin.slamfundao.com.br'
              || window.location.hostname === 'localhost';

const TAMANHOS = ["P", "M", "G", "GG"];

const PRODUTO_VAZIO = {
  nome: "", valor: "", capitulo: "", subtitulo: "",
  verso: "", destaque: "", narrativa: "", imagem: "", imagens: "",
};

/* ══ CAMPO — fora de qualquer componente pai para evitar recriação ══ */
function Campo({ label, name, tipo = "text", placeholder, linhas, form, erros, onChange }) {
  return (
    <div className="edicao-campo">
      <label className="edicao-label">
        {label}
        {erros[name] && <span className="edicao-erro"> — {erros[name]}</span>}
      </label>
      {linhas ? (
        <textarea
          className={`edicao-input ${erros[name] ? "edicao-input--erro" : ""}`}
          name={name}
          value={form[name]}
          onChange={onChange}
          placeholder={placeholder}
          rows={linhas}
        />
      ) : (
        <input
          className={`edicao-input ${erros[name] ? "edicao-input--erro" : ""}`}
          type={tipo}
          name={name}
          value={form[name]}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

/* ══ DETALHE ══ */
function DetalheView({ produto, onVoltar, onComprar }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("M");
  const [quantidade, setQuantidade] = useState(1);

  return (
    <div className="detalhe-view">
      <div className="detalhe-grid">
        <div className="detalhe-carousel-wrap">
          <Carousel>
            {[1, 2, 3, 4].map((item) => (
              <Carousel.Item key={item}>
                <img className="detalhe-img"
                  src={`${produto.imagens}${item}.jpg`}
                  alt={`${produto.nome} — foto ${item}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

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
          <div className="detalhe-secao">
            <span className="secao-label">Tamanho</span>
            <div className="tamanhos-row">
              {TAMANHOS.map(t => (
                <button key={t}
                  className={`tamanho-btn ${tamanhoSelecionado === t ? "ativo" : ""}`}
                  onClick={() => setTamanhoSelecionado(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="detalhe-secao">
            <span className="secao-label">Quantidade: {quantidade}</span>
            <Form.Range min={1} max={10} step={1} value={quantidade}
              onChange={e => setQuantidade(Number(e.target.value))}
              className="custom-range quantidade-range" />
          </div>
          <div className="detalhe-acoes">
            <button className="btn-comprar"
              onClick={() => onComprar({ ...produto, quantidade, tamanho: tamanhoSelecionado })}>
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

/* ══ CARD DE VISUALIZAÇÃO ══ */
function ProdutoCard({ produto, onAbrir, onEditar, onExcluir }) {
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const linhas = typeof produto.narrativa === "string"
    ? produto.narrativa.split("\n").filter(l => l.trim())
    : (produto.narrativa || []);

  return (
    <section ref={sectionRef}
      className={`produto-section ${visible ? "visivel" : ""}`}
      id={`produto-${produto.id}`}>
      <div className="produto-section-inner">

        <div className="card-imagem-wrap"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(h => !h)}
          onClick={() => onAbrir(produto)}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === "Enter" && onAbrir(produto)}
          aria-label={`Ver detalhes de ${produto.nome}`}>
          <img src={`../../images/${produto.imagem}`} alt={produto.nome} className="card-imagem" />
          <div className={`card-overlay ${hovered ? "visivel" : ""}`}>
            <p className="overlay-verso">{produto.verso}</p>
            <p className="overlay-hint">clique para ver mais</p>
          </div>

          {IS_ADMIN && (
            <div className="adm-card-acoes">
              <button className="adm-card-btn adm-card-btn--edit"
                onClick={e => { e.stopPropagation(); onEditar(produto); }}
                title="Editar"><FaPen /></button>
              <button className="adm-card-btn adm-card-btn--del"
                onClick={e => { e.stopPropagation(); onExcluir(produto); }}
                title="Excluir"><FaTrash /></button>
            </div>
          )}
        </div>

        <div className="produto-narrativa">
          <span className="narrativa-capitulo">{produto.capitulo}</span>
          <h2 className="narrativa-nome">{produto.nome}</h2>
          <span className="narrativa-subtitulo">{produto.subtitulo}</span>
          <blockquote className="narrativa-destaque">{produto.destaque}</blockquote>
          {linhas.map((p, i) => <p key={i} className="narrativa-texto">{p}</p>)}
          <div className="narrativa-tamanhos">
            {TAMANHOS.map(t => <span key={t} className="tamanho-pill">{t}</span>)}
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

/* ══ CARD DE INCLUSÃO / EDIÇÃO INLINE ══ */
function CardEdicao({ inicial = PRODUTO_VAZIO, onSalvar, onCancelar, salvando }) {
  const [form, setForm] = useState({ ...PRODUTO_VAZIO, ...inicial });
  const [erros, setErros] = useState({});
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* onChange estável — não recria a cada render */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErros(er => ({ ...er, [name]: "" }));
  };

  const validar = () => {
    const e = {};
    if (!form.nome.trim())   e.nome   = "Obrigatório";
    if (!form.valor)         e.valor  = "Obrigatório";
    if (!form.imagem.trim()) e.imagem = "Obrigatório";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSalvar = () => { if (validar()) onSalvar(form); };

  /* props compartilhadas para todos os campos */
  const campoProps = { form, erros, onChange: handleChange };

  return (
    <section ref={sectionRef}
      className={`produto-section ${visible ? "visivel" : ""} edicao-section`}>
      <div className="edicao-wrap">

        <div className="edicao-header">
          <div>
            <span className="edicao-eyebrow">
              {inicial.id ? "Editando produto" : "Novo produto"}
            </span>
            <h2 className="edicao-titulo">
              {form.nome || (inicial.id ? "Editar" : "Adicionar ao catálogo")}
            </h2>
          </div>
          <button className="edicao-fechar" onClick={onCancelar} title="Cancelar">
            <FaXmark />
          </button>
        </div>

        <div className="edicao-preview-wrap">
          {form.imagem ? (
            <img src={`../../images/${form.imagem}`} alt="preview" className="edicao-preview"
              onError={e => e.target.style.opacity = 0.3} />
          ) : (
            <div className="edicao-preview-vazio">
              <span>Prévia da imagem</span>
            </div>
          )}
          <div className="edicao-preview-campos">
            <Campo {...campoProps} label="URL da imagem principal *" name="imagem"
              placeholder="https://... ou /imagens/camiseta.jpg" />
            <Campo {...campoProps} label="Pasta do carrossel (ex: images/camisetas/nova/)"
              name="imagens" placeholder="images/camisetas/nova/" />
          </div>
        </div>

        <div className="edicao-grid">
          <Campo {...campoProps} label="Nome do produto *" name="nome" placeholder="Ex: Camiseta Verde" />
          <Campo {...campoProps} label="Valor (R$) *" name="valor" tipo="number" placeholder="60" />
          <Campo {...campoProps} label="Capítulo" name="capitulo" placeholder="Ex: Capítulo IV" />
          <Campo {...campoProps} label="Subtítulo" name="subtitulo" placeholder="Ex: A força" />
        </div>

        <Campo {...campoProps} label="Verso (aparece no hover da foto)"
          name="verso" linhas={2}
          placeholder='"Uma frase poética curta..."' />

        <Campo {...campoProps} label="Destaque (citação em destaque na narrativa)"
          name="destaque" linhas={2}
          placeholder='"Frase marcante que resume o produto..."' />

        <Campo {...campoProps}
          label="Narrativa (use Enter para separar parágrafos)"
          name="narrativa" linhas={5}
          placeholder={"Primeiro parágrafo da história...\n\nSegundo parágrafo..."} />

        <div className="edicao-acoes">
          <button className="btn-voltar" onClick={onCancelar}>
            <FaXmark /> Cancelar
          </button>
          <button className="btn-comprar" onClick={handleSalvar} disabled={salvando}>
            {salvando
              ? <><FaSpinner className="adm-spin" /> Salvando...</>
              : <><FaCheck /> {inicial.id ? "Salvar alterações" : "Publicar produto"}</>}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══ BOTÃO FLUTUANTE ══ */
function BotaoAdicionar({ onClick }) {
  return (
    <div className="adm-fab" onClick={onClick} title="Adicionar produto" role="button" tabIndex={0}>
      <FaPlusCircle />
    </div>
  );
}

/* ══ TRILHA ══ */
function Trilha({ produtos, visitados, ativo, onNavegar }) {
  return (
    <nav className="trilha" aria-label="Navegação do catálogo">
      {produtos.filter(x => x.subtitulo).map((p, i) => (
        <div key={p.id} className="trilha-item">
          <button
            className={`trilha-step ${visitados.includes(i) ? "visitado" : ""} ${ativo === i ? "ativo" : ""}`}
            onClick={() => onNavegar(i)} aria-label={`Ir para ${p.nome}`}>
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

/* ══ COMPONENTE PRINCIPAL ══ */
export default function Produtos() {
  const { adicionarItensCarrinho } = useOutletContext();
  const { showToast } = useToast();

  const [lista,            setLista]            = useState([]);
  const [carregando,       setCarregando]        = useState(true);
  const [produtoDetalhado, setProdutoDetalhado]  = useState(null);
  const [modoEdicao,       setModoEdicao]        = useState(false);
  const [salvando,         setSalvando]          = useState(false);
  const [visitados,        setVisitados]         = useState([]);
  const [ativo,            setAtivo]             = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "produtos"), snap => {
      const docs = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
      setLista(docs);
      setCarregando(false);
    }, err => { console.error(err); setCarregando(false); });
    return unsub;
  }, []);

  useEffect(() => {
    if (produtoDetalhado || modoEdicao) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number(e.target.dataset.idx);
          setAtivo(idx);
          setVisitados(prev => prev.includes(idx) ? prev : [...prev, idx]);
        }
      });
    }, { threshold: 0.4 });
    sectionsRef.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [produtoDetalhado, modoEdicao, lista]);

  const navegarPara = idx => {
    document.getElementById(`produto-${lista[idx]?.id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const comprar = item => {
    adicionarItensCarrinho(item);
    showToast({
      severity: "success", summary: "Slam Fundão informa:",
      detail: "Seu produto foi adicionado ao carrinho!", className: "backgroundAmarelo",
    });
    
    setProdutoDetalhado(null);
  };

  const salvar = async (form) => {

    if (Array.isArray(form.narrativa))
      return;

    setSalvando(true);
    try {
      const dados = {
        nome:      form.nome.trim(),
        valor:     Number(form.valor),
        capitulo:  form.capitulo.trim(),
        subtitulo: form.subtitulo.trim(),
        verso:     form.verso.trim(),
        destaque:  form.destaque.trim(),
        narrativa: form.narrativa.trim(),
        imagem:    form.imagem.trim(),
        imagens:   form.imagens.trim(),
        atualizadoEm: serverTimestamp(),
      };

      if (modoEdicao?.id) {
        await updateDoc(doc(db, "produtos", modoEdicao.id), dados);
        showToast({ severity: "success", summary: "Produto atualizado!", life: 4000, className: "backgroundAmarelo"});
      } else {
        await addDoc(collection(db, "produtos"), {
          ...dados, ordem: lista.length, criadoEm: serverTimestamp(),
        });
        showToast({ severity: "success", summary: "Produto publicado!", life: 4000, className: "backgroundAmarelo" });
      }
      setModoEdicao(false);
    } catch (err) {
      console.error(err);
      showToast({ severity: "success", summary: "Erro ao salvar.", life: 5000, className: "backgroundAmarelo" });
    } finally {
      setSalvando(false);
    }
  };

  const excluir = async produto => {
    if (!window.confirm(`Excluir "${produto.nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await deleteDoc(doc(db, "produtos", produto.id));
      showToast({ severity: "success", summary: "Produto removido.", life: 4000 });
    } catch (err) {
      console.error(err);
      showToast({ severity: "success", summary: "Erro ao excluir.", life: 5000 });
    }
  };

  if (produtoDetalhado) return (
    <>
      <Container fluid className="catalog-container">
        <DetalheView produto={produtoDetalhado}
          onVoltar={() => setProdutoDetalhado(null)} onComprar={comprar} />
      </Container>
    </>
  );

  if (carregando) return (
    <div className="catalog-loading">
      <FaSpinner className="adm-spin" style={{ fontSize: "2.5rem", color: "#4E2759" }} />
    </div>
  );

  return (
    <>
      <div className="catalog-container">
        <header className="catalog-header">
          <p className="catalog-eyebrow">Drop do Fundão · Coleção 2025</p>
          <h1 className="catalog-titulo">
            Três cores<br />Três poesias.
          </h1>
          <p className="catalog-subtitulo">
            Role e descubra a história por trás de cada peça. Passe o mouse nas
            fotos para ler o verso de cada uma.
          </p>
        </header>

        <Trilha produtos={lista} visitados={visitados} ativo={ativo} onNavegar={navegarPara} />

        <div>
          {lista.map((produto, i) => (
            <div key={produto.id} ref={el => sectionsRef.current[i] = el} data-idx={i}>
              {modoEdicao?.id === produto.id ? (
                <CardEdicao
                  inicial={produto}
                  onSalvar={salvar}
                  onCancelar={() => setModoEdicao(false)}
                  salvando={salvando}
                />
              ) : (
                <ProdutoCard
                  produto={produto}
                  onAbrir={setProdutoDetalhado}
                  onEditar={p => {
                    setModoEdicao(p);
                    setTimeout(() => document.getElementById(`produto-${p.id}`)
                      ?.scrollIntoView({ behavior: "smooth" }), 50);
                  }}
                  onExcluir={excluir}
                />
              )}
            </div>
          ))}

          {IS_ADMIN && modoEdicao === "novo" && (
            <CardEdicao
              onSalvar={salvar}
              onCancelar={() => setModoEdicao(false)}
              salvando={salvando}
            />
          )}
        </div>

        <footer className="catalog-footer">
          <p className="footer-verso">
            "Cada peça, um capítulo de uma história que ainda está sendo escrita — por você."
          </p>
        </footer>
      </div>

      {IS_ADMIN && !modoEdicao && (
        <BotaoAdicionar onClick={() => {
          setModoEdicao("novo");
          setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 50);
        }} />
      )}
    </>
  );
}