// src/components/ProductModal.jsx
import React from 'react';
import './ProductModal.css'; // Estilos para o modal

function ProductModal({ product, onClose, onBuy }) {
  if (!product) return null; // Não renderiza se não houver produto

  const { id, titulo, preco, descricao, tag, image } = product;
  const precoFormatado = `R$ ${parseFloat(preco).toFixed(2).replace('.', ',')}`;
  const acaoTags = {
    avancado: 'Avançado',
    lancamento: 'Lançamento',
  };
  const tagFormatada = acaoTags[tag.toLowerCase()] || tag;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {' '}
      {/* Fecha o modal ao clicar fora */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {' '}
        {/* Impede que o clique aqui feche o modal */}
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <img src={image} alt={titulo} className="modal-image" />
        <div className="modal-body">
          <span className={`product-card-tag ${tag.toLowerCase()}`}>
            {tagFormatada}
          </span>
          <h2 className="modal-title">{titulo}</h2>
          <p className="modal-description">{descricao}</p>
          <p className="modal-price">Preço: {precoFormatado}</p>

          <button className="modal-buy-button" onClick={() => onBuy(product)}>
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
