import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Produtos from './routes/produtos';
import ComprarProduto from './routes/comprar';
import Home from './routes/home/index';
import SobreNos from './routes/sobre';
import Contato from './routes/contato';
import Pagamento from './routes/pagamento';
import Login from './routes/login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import Loading from './components/Loading';
import { ToastProvider } from './context/ToastContext';

/* ─── detecta se está no subdomínio admin ─── */
const IS_ADMIN = window.location.hostname === 'admin.slamfundao.com.br'
              || window.location.hostname === 'localhost'; // remova localhost em produção

/* ─── scroll ao topo a cada navegação ─── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── guarda de rota: redireciona para /login se não autenticado ─── */
function RotaProtegida({ children }) {
  const { usuario, checando } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (checando) return <Loading />;

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/* ─── rota de login: se já logado, vai para home ─── */
function RotaLogin() {
  const [usuario,  setUsuario]  = useState(undefined);
  const [checando, setChecando] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setChecando(false);
    });
    return unsub;
  }, []);

  if (checando) return null;

  /* já autenticado → volta para onde tentou ir, ou home */
  if (usuario) {
    const destino = location.state?.from?.pathname || '/';
    return <Navigate to={destino} replace />;
  }

  return <Login />;
}

/* ─── monta as rotas de acordo com o domínio ─── */
function Rotas() {
  if (IS_ADMIN) {
    /* ══ ADMIN: todas as rotas protegidas, exceto /login ══ */
    return (
      <Routes>
        
        <Route path="/login" element={<RotaLogin />} />
        <Route element={<RotaProtegida><App /></RotaProtegida>}>
          {/* tudo abaixo exige autenticação */}
          <Route path="/" element={<RotaProtegida><Home /></RotaProtegida>} />
          <Route path="/produtos" element={<RotaProtegida><Produtos /></RotaProtegida>} />
          <Route path="/compra" element={<RotaProtegida><ComprarProduto /></RotaProtegida>} />
          <Route path="/pagamento" element={<RotaProtegida><Pagamento /></RotaProtegida>} />
          <Route path="/sobre" element={<RotaProtegida><SobreNos /></RotaProtegida>} />
          <Route path="/contato" element={<RotaProtegida><Contato /></RotaProtegida>} />

          {/* qualquer rota desconhecida → home (protegida) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
  }

  /* ══ PÚBLICO: sem proteção ══ */
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/compra" element={<ComprarProduto />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ScrollToTop />
          <Rotas />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);