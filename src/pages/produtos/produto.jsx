// src/components/Produto.jsx
import React from 'react';
import './produto.css'; // Importa o CSS

function Produto({ product, onViewDetails }) {
  const { id, titulo, preco, descricao, tag, image } = product;
  const precoFormatado = `R$ ${parseFloat(preco).toFixed(2).replace('.', ',')}`;

  const acaoTags = {
    avancado: 'Avançado',
    lancamento: 'Lançamento',
  };
  const tagFormatada = acaoTags[tag.toLowerCase()] || tag;

  return (
    <div className="product-card">
      <img src={image} alt={titulo} className="product-card-image" />

      <div className="product-card-body">
        <span className={`product-card-tag ${tag.toLowerCase()}`}>
          {tagFormatada}
        </span>

        <h3 className="product-card-title">{titulo}</h3>
        <p className="product-card-description">{descricao}</p>

        <div className="product-card-footer">
          <span className="product-card-price">{precoFormatado}</span>
          <button
            className="product-card-button"
            onClick={() => onViewDetails(product)}
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Produto;
