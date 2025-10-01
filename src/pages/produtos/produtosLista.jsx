// src/components/ProductList.jsx
import Produto from './produto';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductModal from './../../components/ProdutctModal';
import './produtosLista.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// URL base da sua API Node.js/Express
const API_URL = 'https://testetecnicobilionbackend-production.up.railway.app';

function ProductList() {
  const [data, setData] = useState([]); // <--- ESTADO COM OS DADOS DA API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Buscando dados na API node
  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        setLoading(true);

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

    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: 'Confirmação de Compra',
      html: `Você tem certeza que deseja comprar o produto: <b>${product.titulo}</b> por <b>R$ ${precoFormatado}</b>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, comprar!',
      confirmButtonColor: 'green',
      cancelButtonText: 'Cancelar',
      buttonsStyling: true,
    });

    if (result.isConfirmed) {
      MySwal.fire({
        title: 'Processando...',
        text: `Processando compra do produto: ${product.titulo}`,
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading(); // Mostra o spinner de loading
        },
      });

      try {
        await axios.post(`${API_URL}/produtoComprado`, {
          produto_id: product.id,
          dateBody: new Date().toISOString(),
        });

        MySwal.fire({
          title: 'Sucesso!',
          text: 'Compra finalizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ótimo!',
        });
      } catch (e) {
        MySwal.fire({
          title: 'Erro!',
          text: 'Erro ao processar a compra. Tente novamente mais tarde.',
          icon: 'error',
          footer: e.message, // mensagem de erro
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      //CLICOU EM CANCELAR
      MySwal.fire(
        'Cancelado',
        `Compra de ${product.titulo} cancelada.`,
        'error',
      );
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
