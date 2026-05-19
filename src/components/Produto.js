import { Button } from "react-bootstrap";
import "./styles/produto.css";
import { FaEye } from "react-icons/fa";

export const Produto = ({ src, alt, descricao, valor, onClick }) => {
  const formatNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return (
    <div className="produto-card" onClick={onClick} role="button" tabIndex={0}>
      {/* IMAGEM */}
      <div className="produto-img-wrapper">
        <img src={src} alt={alt || descricao} />

        {/* CTA OVERLAY (desktop) */}
        <div className="produto-overlay">
          <FaEye />
          <span>Visualizar</span>
        </div>
      </div>

      {/* INFO */}
      <div className="produto-info">
        <h5 className="produto-nome">{descricao}</h5>
        <span className="produto-preco">
          {formatNumber.format(valor)}
        </span>

        {/* CTA MOBILE */}
        <Button
          className="produto-btn-mobile"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <FaEye /> Ver produto
        </Button>
      </div>
    </div>
  );
};

export default Produto;
