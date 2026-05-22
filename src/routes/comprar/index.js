import { useState } from "react";
import { FaCheck, FaChevronRight, FaChevronLeft, FaCartShopping, FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendar } from "react-icons/fa6";
import ReactInputMask from "react-input-mask";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./index.css";
import { validarCPF } from "../../utils/validarCPF";

/* ─── steps ─── */
const STEPS = [
  { id: 0, label: "Identificação", icon: <FaUser /> },
  { id: 1, label: "Contato",       icon: <FaPhone /> },
  { id: 2, label: "Confirmar",     icon: <FaCartShopping /> },
];

/* ─── campo estilizado ─── */
function Campo({ label, icon, children, error }) {
  return (
    <div className={`ck-campo ${error ? "ck-campo--erro" : ""}`}>
      <label className="ck-label">
        <span className="ck-label-icon">{icon}</span>
        {label}
      </label>
      {children}
      {error && <span className="ck-erro-msg">{error}</span>}
    </div>
  );
}

export default function ComprarProduto() {
  const { itensCarrinho } = useOutletContext();
  const navigate = useNavigate();

  const [step, setStep]       = useState(0);
  const [errors, setErrors]   = useState({});
  const [formData, setFormData] = useState({
    nome: "", email: "", telefone: "", cpf: "", nascimento: "",
  });

  const options = { style: "currency", currency: "BRL" };
  const fmt     = new Intl.NumberFormat("pt-BR", options);
  const total   = itensCarrinho.reduce((s, i) => s + i.valor * i.quantidade, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));

    if (name === "cpf" && value.replaceAll("-", "").replaceAll("_", "").replaceAll(".", "").length === 11 && !validarCPF(value))
        setErrors(er => ({ ...er, cpf: "CPF inválido" }))
    else 
        setErrors(er => ({ ...er, [name]: "" }));
  };

  /* validação por step */
  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!formData.nome.trim())       e.nome       = "Informe seu nome completo";
      if (!formData.cpf || formData.cpf.includes("_")) e.cpf = "CPF inválido";
      if (!formData.nascimento)        e.nascimento = "Informe sua data de nascimento";
    }
    if (step === 1) {
      if (!formData.telefone || formData.telefone.includes("_")) e.telefone = "Telefone inválido";
      if (!formData.email || !formData.email.includes("@"))      e.email    = "E-mail inválido";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const avancar = () => { if (validate()) setStep(s => s + 1); };
  const voltar  = () => setStep(s => s - 1);

  const concluir = () => {
    if (!itensCarrinho.length) return;
    navigate("/pagamento", { state: { formulario: formData, carrinho: itensCarrinho } });
  };

  return (
    <div className="ck-root">

      {/* ── barra de progresso ── */}
      <div className="ck-progress">
        {STEPS.map((s, i) => (
          <div key={s.id} className="ck-progress-item">
            <div className={`ck-step-dot ${i < step ? "done" : ""} ${i === step ? "active" : ""}`}>
              {i < step ? <FaCheck /> : s.icon}
            </div>
            <span className={`ck-step-label ${i === step ? "active" : ""}`}>{s.label}</span>
            {i < STEPS.length - 1 && (
              <div className={`ck-step-line ${i < step ? "done" : ""}`} />
            )}
          </div>
        ))}
      </div>

      <div className="ck-body">

        {/* ── formulário ── */}
        <div className="ck-form-panel">

          {/* step 0 — identificação */}
          {step === 0 && (
            <div className="ck-step-content">
              <h2 className="ck-title">Quem é você?</h2>
              <p className="ck-subtitle">Precisamos de algumas informações básicas.</p>

              <Campo label="Nome completo" icon={<FaUser />} error={errors.nome}>
                <input
                  className="ck-input"
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  autoFocus
                />
              </Campo>

              <div className="ck-row">
                <Campo label="CPF" icon={<FaIdCard />} error={errors.cpf}>
                  <ReactInputMask
                    className="ck-input"
                    mask="999.999.999-99"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </Campo>

                <Campo label="Nascimento" icon={<FaCalendar />} error={errors.nascimento}>
                  <input
                    className="ck-input"
                    type="date"
                    name="nascimento"
                    value={formData.nascimento}
                    onChange={handleChange}
                  />
                </Campo>
              </div>
            </div>
          )}

          {/* step 1 — contato */}
          {step === 1 && (
            <div className="ck-step-content">
              <h2 className="ck-title">Como te encontramos?</h2>
              <p className="ck-subtitle">Para confirmar seu pedido.</p>

              <Campo label="Telefone (WhatsApp)" icon={<FaPhone />} error={errors.telefone}>
                <ReactInputMask
                  className="ck-input"
                  mask="(99) 99999-9999"
                  name="telefone"
                  placeholder="(11) 99999-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </Campo>

              <Campo label="E-mail" icon={<FaEnvelope />} error={errors.email}>
                <input
                  className="ck-input"
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Campo>
            </div>
          )}

          {/* step 2 — confirmar */}
          {step === 2 && (
            <div className="ck-step-content">
              <h2 className="ck-title">Tudo certo!</h2>
              <p className="ck-subtitle">Confira seu pedido antes de finalizar.</p>

              <div className="ck-resumo-dados">
                <div className="ck-dado"><span>Nome</span><strong>{formData.nome}</strong></div>
                <div className="ck-dado"><span>CPF</span><strong>{formData.cpf}</strong></div>
                <div className="ck-dado"><span>Nascimento</span><strong>{formData.nascimento}</strong></div>
                <div className="ck-dado"><span>Telefone</span><strong>{formData.telefone}</strong></div>
                <div className="ck-dado"><span>E-mail</span><strong>{formData.email}</strong></div>
              </div>
            </div>
          )}

          {/* navegação */}
          <div className="ck-nav">
            {step > 0 && (
              <button className="ck-btn ck-btn--ghost" onClick={voltar}>
                <FaChevronLeft /> Voltar
              </button>
            )}
            {step < 2 && (
              <button className="ck-btn ck-btn--roxo" onClick={avancar}>
                Continuar <FaChevronRight />
              </button>
            )}
            {step === 2 && (
              <button
                className="ck-btn ck-btn--amarelo"
                onClick={concluir}
                disabled={!itensCarrinho.length}
              >
                <FaCheck /> Finalizar — {fmt.format(total)}
              </button>
            )}
          </div>
        </div>

        {/* ── resumo lateral ── */}
        <aside className="ck-sidebar">
          <h3 className="ck-sidebar-title">
            <FaCartShopping /> Seu carrinho
          </h3>

          <div className="ck-items">
            {itensCarrinho.length === 0 && (
              <p className="ck-empty">Nenhum item no carrinho.</p>
            )}
            {itensCarrinho.map((item, i) => (
              <div key={i} className="ck-item">
                <img src={`../../images/${item.imagem}`} alt={item.nome} className="ck-item-img" />
                <div className="ck-item-info">
                  <strong>{item.nome}</strong>
                  <span>Tam. {item.tamanho} · Qtd. {item.quantidade}</span>
                  <span className="ck-item-preco">{fmt.format(item.valor * item.quantidade)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ck-total">
            <span>Total</span>
            <strong>{fmt.format(total)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}