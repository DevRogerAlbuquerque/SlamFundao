import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import logo from "../../imagens/logobanner.png";
import "./index.css";
import { auth } from "../../firebase";

/* ── erros do Firebase em português ── */
const ERROS = {
  "auth/invalid-email":          "E-mail inválido.",
  "auth/user-not-found":         "Nenhuma conta encontrada com esse e-mail.",
  "auth/wrong-password":         "Senha incorreta.",
  "auth/invalid-credential":     "E-mail ou senha incorretos.",
  "auth/too-many-requests":      "Muitas tentativas. Aguarde alguns minutos.",
  "auth/user-disabled":          "Esta conta foi desativada.",
  "auth/network-request-failed": "Sem conexão. Verifique sua internet.",
};

const traduzirErro = (code) => ERROS[code] || "Ocorreu um erro. Tente novamente.";

export default function Login() {
  const navigate = useNavigate();

  const [email,        setEmail]        = useState("");
  const [senha,        setSenha]        = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [erro,         setErro]         = useState("");
  const [modoReset,    setModoReset]    = useState(false);
  const [resetEnviado, setResetEnviado] = useState(false);

  /* ── login ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !senha) { setErro("Preencha e-mail e senha."); return; }
    setLoading(true);
    setErro("");
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (err) {
      setErro(traduzirErro(err.code));
    } finally {
      setLoading(false);
    }
  };

  /* ── reset ── */
  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) { setErro("Informe seu e-mail para redefinir a senha."); return; }
    setLoading(true);
    setErro("");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEnviado(true);
    } catch (err) {
      setErro(traduzirErro(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ln-root">

      {/* ── painel visual ── */}
      <div className="ln-visual" aria-hidden="true">
        <div className="ln-visual-bg" />
        <div className="ln-visual-content">
          <img src={logo} alt="Slam Fundão" className="ln-visual-logo" />
          <div className="ln-visual-pills">
            <span>Guarulhos</span><span>✦</span>
            <span>Poesia</span><span>✦</span>
            <span>Resistência</span>
          </div>
        </div>
      </div>

      {/* ── painel formulário ── */}
      <div className="ln-form-panel">
        <div className="ln-form-inner">
          <img src={logo} alt="Slam Fundão" className="ln-logo-mobile" />

          {!modoReset ? (
            <>
              <div className="ln-heading">
                <span className="ln-eyebrow">Área restrita</span>
                <h1 className="ln-h1">Entrar</h1>
                <p className="ln-subtitle">Faça login para acessar o painel do Slam Fundão.</p>
              </div>

              <form className="ln-form" onSubmit={handleLogin} noValidate>
                <div className="ln-campo">
                  <label className="ln-label" htmlFor="email">
                    <FaEnvelope className="ln-label-icon" /> E-mail
                  </label>
                  <input
                    id="email"
                    className="ln-input"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErro(""); }}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <div className="ln-campo">
                  <label className="ln-label" htmlFor="senha">
                    <FaLock className="ln-label-icon" /> Senha
                  </label>
                  <div className="ln-senha-wrap">
                    <input
                      id="senha"
                      className="ln-input"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="••••••••"
                      value={senha}
                      onChange={e => { setSenha(e.target.value); setErro(""); }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="ln-olho"
                      onClick={() => setMostrarSenha(v => !v)}
                      aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {erro && <div className="ln-erro" role="alert">{erro}</div>}

                <button type="submit" className="ln-btn ln-btn--roxo" disabled={loading}>
                  {loading ? <><FaSpinner className="ln-spin" /> Entrando...</> : "Entrar"}
                </button>

                <button type="button" className="ln-link"
                  onClick={() => { setModoReset(true); setErro(""); }}>
                  Esqueci minha senha
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="ln-heading">
                <span className="ln-eyebrow">Recuperação</span>
                <h1 className="ln-h1">Redefinir senha</h1>
                <p className="ln-subtitle">Enviaremos um link para redefinir sua senha.</p>
              </div>

              {resetEnviado ? (
                <div className="ln-reset-ok">
                  <span className="ln-reset-icon">✉️</span>
                  <h3>E-mail enviado!</h3>
                  <p>Verifique sua caixa de entrada e siga as instruções.</p>
                  <button className="ln-btn ln-btn--ghost"
                    onClick={() => { setModoReset(false); setResetEnviado(false); }}>
                    Voltar ao login
                  </button>
                </div>
              ) : (
                <form className="ln-form" onSubmit={handleReset} noValidate>
                  <div className="ln-campo">
                    <label className="ln-label" htmlFor="email-reset">
                      <FaEnvelope className="ln-label-icon" /> E-mail
                    </label>
                    <input
                      id="email-reset"
                      className="ln-input"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErro(""); }}
                      autoFocus
                    />
                  </div>

                  {erro && <div className="ln-erro" role="alert">{erro}</div>}

                  <button type="submit" className="ln-btn ln-btn--roxo" disabled={loading}>
                    {loading
                      ? <><FaSpinner className="ln-spin" /> Enviando...</>
                      : "Enviar link de redefinição"}
                  </button>

                  <button type="button" className="ln-link"
                    onClick={() => { setModoReset(false); setErro(""); }}>
                    ← Voltar ao login
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}