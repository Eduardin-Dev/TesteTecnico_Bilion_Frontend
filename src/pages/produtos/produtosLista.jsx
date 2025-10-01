// src/components/ProductList.jsx
import Produto from './produto';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductModal from './../../components/ProdutctModal';
import './produtosLista.css';
import axios from 'axios';

// URL base da sua API Node.js/Express
const API_URL = 'https://testetecnicobilionbackend-production.up.railway.app';

function ProductList() {
  // Estado para armazenar os dados recebidos da API
  const [data, setData] = useState([]); // <--- ESTADO COM OS DADOS DA API
  // Estado para gerenciar o carregamento
  const [loading, setLoading] = useState(true);
  // Estado para gerenciar erros
  const [error, setError] = useState(null);

  // Estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- LÓGICA DE BUSCA DE DADOS (API) ---
  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        setLoading(true);

        // Requisição GET usando Axios para a rota /listarProdutos
        const response = await axios.get(`${API_URL}/listarProdutos`);

        // Atualiza o estado 'data' com os produtos
        setData(response.data);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError(
          'Não foi possível carregar os produtos. Verifique se a API está rodando.',
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- HANDLERS DO MODAL ---
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleBuyProduct = async (product) => {
    const precoFormatado = parseFloat(product.preco)
      .toFixed(2)
      .replace('.', ',');

    const isConfirmed = window.confirm(
      `Você tem certeza que deseja comprar o produto: ${product.titulo} por R$ ${precoFormatado}?`,
    );

    if (isConfirmed) {
      // Apenas se o usuário clicou em "OK" na caixa de diálogo de confirmação
      alert(`Processando compra do produto: ${product.titulo}`);

      try {
        await axios.post(`${API_URL}/produtoComprado`, {
          produto_id: product.id,
          dateBody: new Date().toISOString(),
        });
        alert('Compra finalizada com sucesso!');
      } catch (e) {
        alert('Erro ao processar a compra.', e);
      }
    } else {
      // Usuário clicou em "Cancelar"
      alert(`Compra de ${product.titulo} cancelada.`);
    }

    handleCloseModal(); // Fecha o modal após a ação (ou cancelamento)
  };

  if (loading) {
    return <div className="loading-message">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error-message">Erro: {error}</div>;
  }

  // Se não houver produtos depois de carregar (API retornou array vazio)
  if (data.length === 0) {
    return <div className="no-products">Nenhum produto encontrado na API.</div>;
  }

  return (
    <div className="product-list-container">
      <h1 className="main-title">🚀 Nossos Produtos e Cursos Digitais</h1>

      <Link to="/dashboard" className="dashboard-button">
        Ver Dashboard de Vendas
      </Link>

      <div className="product-grid">
        {data.map((product) => (
          <Produto
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Renderiza o modal se estiver aberto e houver um produto selecionado */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onBuy={handleBuyProduct}
        />
      )}
    </div>
  );
}

export default ProductList;
