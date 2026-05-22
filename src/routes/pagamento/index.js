import { useEffect, useRef, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { FaCheck, FaCopy, FaCreditCard, FaQrcode, FaSpinner } from "react-icons/fa6";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import logo from "../../imagens/logobanner.png";
import "./index.css";

/* ══════════════════════════════════════════
   CONFIG — preencha com seus valores
   ══════════════════════════════════════════ */
const firebaseConfig = {
  apiKey: "AIzaSyDpRd7dMzdRe2kGxmkjY5F0f-xlN8LtFiU",
  authDomain: "slamfundao-6e465.firebaseapp.com",
  projectId: "slamfundao-6e465",
  storageBucket: "slamfundao-6e465.firebasestorage.app",
  messagingSenderId: "630236696871",
  appId: "1:630236696871:web:0527806354a8e6fd05d902",
  measurementId: "G-CETV2EKTQC"
};

const STRIPE_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db  = getFirestore(app);

const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/* ── Stripe Elements style ── */
const stripeStyle = {
  base: {
    color: "#4E2759",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontSmoothing: "antialiased",
    "::placeholder": { color: "#bbb" },
  },
  invalid: { color: "#d63e3e" },
};

/* ══════════════════════════════════════════
   PIX via Firebase Extension (Stripe)
   
   Fluxo:
   1. Cria doc em /customers/{uid}/payment_intents  
      com { amount, currency, payment_method_types: ["pix"] }
   2. A extensão cria o PaymentIntent no Stripe e
      escreve client_secret + next_action.pix no doc
   3. Fazemos onSnapshot para ler o QR Code assim que aparecer
   4. Stripe webhook → extensão atualiza status → onSnapshot detecta "succeeded"
   ══════════════════════════════════════════ */
function PixSection({ total, carrinho, formulario, onSuccess }) {
  const [loading,  setLoading]  = useState(false);
  const [qrCode,   setQrCode]   = useState(null);   // URL da imagem SVG/PNG do QR
  const [qrTexto,  setQrTexto]  = useState("");      // código copia-e-cola
  const [copiado,  setCopiado]  = useState(false);
  const [erro,     setErro]     = useState("");
  const unsubRef = useRef(null);

  /* cleanup ao desmontar */
  useEffect(() => () => unsubRef.current?.(), []);

  const gerarPix = async () => {
    setLoading(true);
    setErro("");
    try {
      /*
        A extensão Stripe Firebase usa a coleção:
          customers/{customerId}/payment_intents
        
        Se você não tem autenticação, use uma coleção própria
        como "pix_requests" e direcione para uma Cloud Function
        que crie o PaymentIntent. 
        
        Aqui assumimos que você tem o customerId disponível
        ou usa uma coleção intermediária.
        
        Troque "pix_requests" pelo caminho real do seu projeto.
      */
      const docRef = await addDoc(collection(db, "pix_requests"), {
        amount:               total * 100,   // Stripe usa centavos
        currency:             "brl",
        payment_method_types: ["pix"],
        pix_expiration_time:  3600,           // 1 hora
        metadata: {
          nome:    formulario.nome,
          email:   formulario.email,
          pedido:  carrinho
            .map(i => `${i.quantidade}x ${i.nome} ${i.tamanho}`)
            .join(", "),
        },
        criadoEm: new Date(),
        status: "pending",
      });

      /* Escuta o doc — a extensão vai preencher client_secret e pix_data */
      unsubRef.current = onSnapshot(doc(db, "pix_requests", docRef.id), async (snap) => {
        const data = snap.data();
        if (!data) return;

        /* QR Code disponível */
        if (data.pix_data?.qr_code_url && !qrCode) {
          setQrCode(data.pix_data.qr_code_url);
          setQrTexto(data.pix_data.qr_code || "");
          setLoading(false);
        }

        /* Alternativa: client_secret disponível → confirmamos pelo SDK */
        if (data.client_secret && !data.pix_data) {
          const stripe = await stripePromise;
          const { paymentIntent } = await stripe.retrievePaymentIntent(data.client_secret);
          const pixData = paymentIntent?.next_action?.pix_display_qr_code;
          if (pixData) {
            setQrCode(pixData.image_url_png);
            setQrTexto(pixData.data);
            setLoading(false);
          }
        }

        /* Pagamento confirmado */
        if (data.status === "succeeded") {
          unsubRef.current?.();
          onSuccess();
        }
      });

    } catch (err) {
      console.error(err);
      setErro("Não foi possível gerar o PIX. Tente novamente.");
      setLoading(false);
    }
  };

  const copiar = () => {
    navigator.clipboard.writeText(qrTexto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  };

  /* ── tela inicial ── */
  if (!qrCode && !loading) return (
    <div className="pg-pix-start">
      <div className="pg-pix-icon">⚡</div>
      <h3>Pague com PIX</h3>
      <p>Aprovação instantânea. Escaneie o QR Code pelo app do seu banco.</p>
      {erro && <p className="pg-erro">{erro}</p>}
      <button className="pg-btn pg-btn--roxo" onClick={gerarPix}>
        <FaQrcode /> Gerar QR Code — {fmt.format(total)}
      </button>
    </div>
  );

  /* ── gerando ── */
  if (loading) return (
    <div className="pg-pix-start">
      <div className="pg-pix-icon"><FaSpinner className="pg-spin" style={{ fontSize: "2.5rem", color: "#4E2759" }} /></div>
      <h3>Gerando seu PIX...</h3>
      <p>Isso leva apenas um segundo.</p>
    </div>
  );

  /* ── QR Code pronto ── */
  return (
    <div className="pg-pix-qr">
      <p className="pg-pix-instrucao">Abra o app do banco e escaneie o código:</p>

      <div className="pg-qr-wrap">
        <img src={qrCode} alt="QR Code PIX" className="pg-qr-img" />
        <div className="pg-qr-pulse" />
      </div>

      {qrTexto && (
        <button className="pg-btn pg-btn--ghost" onClick={copiar}>
          <FaCopy /> {copiado ? "Copiado!" : "Copiar código PIX"}
        </button>
      )}

      <p className="pg-pix-aguard">
        <FaSpinner className="pg-spin" /> Aguardando confirmação do pagamento...
      </p>

      <p className="pg-pix-validade">⏱ Este QR Code expira em 1 hora.</p>
    </div>
  );
}

/* ══════════════════════════════════════════
   CARTÃO — Stripe Elements
   ══════════════════════════════════════════ */
function CartaoForm({ total, carrinho, formulario, onSuccess }) {
  const stripe   = useStripe();
  const elements = useElements();
  const [loading,    setLoading]    = useState(false);
  const [cardError,  setCardError]  = useState("");
  const [nomeCartao, setNomeCartao] = useState("");

  const pagar = async () => {
    if (!stripe || !elements) return;
    if (!nomeCartao.trim()) { setCardError("Informe o nome no cartão."); return; }

    setLoading(true);
    setCardError("");

    try {
      /* Cria PaymentIntent via Firestore (extensão Stripe) */
      const docRef = await addDoc(collection(db, "payment_intents"), {
        amount:               total * 100,
        currency:             "brl",
        payment_method_types: ["card"],
        metadata: {
          nome:   formulario.nome,
          email:  formulario.email,
          pedido: carrinho.map(i => `${i.quantidade}x ${i.nome} ${i.tamanho}`).join(", "),
        },
      });

      /* Aguarda client_secret da extensão */
      await new Promise((resolve, reject) => {
        const unsub = onSnapshot(doc(db, "payment_intents", docRef.id), (snap) => {
          const data = snap.data();
          if (data?.client_secret) { unsub(); resolve(data.client_secret); }
          if (data?.error)         { unsub(); reject(new Error(data.error.message)); }
        });
        setTimeout(() => { reject(new Error("Timeout ao criar pagamento.")); }, 15000);
      }).then(async (clientSecret) => {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: { name: nomeCartao, email: formulario.email },
          },
        });
        if (error) { setCardError(error.message); return; }
        if (paymentIntent.status === "succeeded") onSuccess();
      });

    } catch (err) {
      setCardError(err.message || "Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pg-cartao-form">
      <div className="pg-stripe-campo">
        <label className="pg-stripe-label">Nome no cartão</label>
        <input
          className="pg-stripe-input"
          placeholder="Como está impresso no cartão"
          value={nomeCartao}
          onChange={e => { setNomeCartao(e.target.value); setCardError(""); }}
          autoFocus
        />
      </div>

      <div className="pg-stripe-campo">
        <label className="pg-stripe-label">Número do cartão</label>
        <div className="pg-stripe-wrap">
          <CardNumberElement options={{ style: stripeStyle, showIcon: true }} />
        </div>
      </div>

      <div className="pg-stripe-row">
        <div className="pg-stripe-campo">
          <label className="pg-stripe-label">Validade</label>
          <div className="pg-stripe-wrap">
            <CardExpiryElement options={{ style: stripeStyle }} />
          </div>
        </div>
        <div className="pg-stripe-campo">
          <label className="pg-stripe-label">CVV</label>
          <div className="pg-stripe-wrap">
            <CardCvcElement options={{ style: stripeStyle }} />
          </div>
        </div>
      </div>

      {cardError && <p className="pg-erro">{cardError}</p>}

      <button
        className="pg-btn pg-btn--roxo pg-btn--full"
        onClick={pagar}
        disabled={loading || !stripe}
      >
        {loading
          ? <><FaSpinner className="pg-spin" /> Processando...</>
          : <><FaCreditCard /> Pagar {fmt.format(total)}</>}
      </button>

      <p className="pg-seguro">🔒 Pagamento seguro via Stripe</p>
    </div>
  );
}

/* ══════════════════════════════════════════
   SUCESSO
   ══════════════════════════════════════════ */
function Sucesso({ nome }) {
  return (
    <div className="pg-sucesso">
      <img src={logo} alt="Slam Fundão" className="pg-sucesso-logo" />
      <div className="pg-sucesso-check"><FaCheck /></div>
      <h2 className="pg-sucesso-h2">É isso, {nome}! 🎉</h2>
      <p>Pagamento confirmado. O Slam Fundão vai criar seus produtos e logo entramos em contato.</p>
    </div>
  );
}

/* ══════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ══════════════════════════════════════════ */
export default function Pagamento() {
  const { removerItemCarrinho } = useOutletContext();
  const location = useLocation();
  const { formulario, carrinho } = location.state || {};

  const [meio, setMeio] = useState(null);
  const [pago, setPago] = useState(false);

  const total = (carrinho || []).reduce((s, i) => s + i.valor * i.quantidade, 0);

  const onSuccess = () => { setPago(true); removerItemCarrinho(); };

  const Resumo = () => (
    <aside className="pg-resumo">
      <h3 className="pg-resumo-titulo">Seu pedido</h3>
      <div className="pg-resumo-itens">
        {(carrinho || []).map((item, i) => (
          <div key={i} className="pg-resumo-item">
            <img src={`../../images/${item.imagem}`} alt={item.nome} className="pg-resumo-img" />
            <div className="pg-resumo-info">
              <strong>{item.nome}</strong>
              <span>Tam. {item.tamanho} · Qtd. {item.quantidade}</span>
            </div>
            <span className="pg-resumo-preco">{fmt.format(item.valor * item.quantidade)}</span>
          </div>
        ))}
      </div>
      <div className="pg-resumo-total">
        <span>Total</span>
        <strong>{fmt.format(total)}</strong>
      </div>
    </aside>
  );

  if (pago) return (
    <div className="pg-root pg-root--center">
      <Sucesso nome={formulario?.nome || "poeta"} />
    </div>
  );

  return (
    <div className="pg-root">
      <header className="pg-header">
        <span className="pg-header-step">Etapa final</span>
        <h1 className="pg-header-h1">Como você quer pagar?</h1>
      </header>

      <div className="pg-body">
        <div className="pg-main">

          {/* seletor */}
          <div className="pg-meio-selector">
            <button
              className={`pg-meio-btn ${meio === "pix" ? "ativo" : ""}`}
              onClick={() => setMeio("pix")}
            >
              <span className="pg-meio-icone">⚡</span>
              <span className="pg-meio-texto">
                <strong>PIX</strong>
                <small>Aprovação instantânea</small>
              </span>
            </button>
            <button
              className={`pg-meio-btn ${meio === "cartao" ? "ativo" : ""}`}
              onClick={() => setMeio("cartao")}
            >
              <span className="pg-meio-icone"><FaCreditCard /></span>
              <span className="pg-meio-texto">
                <strong>Cartão de crédito</strong>
                <small>Visa, Master, Amex, Elo</small>
              </span>
            </button>
          </div>

          <div className="pg-conteudo">
            {!meio && (
              <p className="pg-hint">Selecione uma forma de pagamento acima para continuar.</p>
            )}

            {meio === "pix" && (
              <PixSection
                total={total}
                carrinho={carrinho}
                formulario={formulario}
                onSuccess={onSuccess}
              />
            )}

            {meio === "cartao" && (
              <Elements stripe={stripePromise}>
                <CartaoForm
                  total={total}
                  carrinho={carrinho}
                  formulario={formulario}
                  onSuccess={onSuccess}
                />
              </Elements>
            )}
          </div>
        </div>

        <Resumo />
      </div>
    </div>
  );
}