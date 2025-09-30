import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import KpiCard from '../../components/KpiCard.jsx';
import './VendasDashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

// URL base da sua API Node.js/Express
const API_URL = 'http://localhost:3000';

// Dados de Exemplo
const dadosMesesFicticios = {
  monthlySales: [
    { month: 'Jan', revenue: 15000, sales: 80 },
    { month: 'Fev', revenue: 18500, sales: 95 },
    { month: 'Mar', revenue: 22000, sales: 110 },
    { month: 'Abr', revenue: 19500, sales: 105 },
    { month: 'Mai', revenue: 25000, sales: 130 },
    { month: 'Jun', revenue: 28000, sales: 140 },
  ],
};

function VendasDashboard() {
  const [metricas, setMetricas] = useState({});
  const [topCursos, setTopCursos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        setLoading(true);

        // Requisição 1: Métricas Gerais
        const [metricasResponse, topCursosResponse] = await Promise.all([
          axios.get(`${API_URL}/dashboard/metricas`),
          axios.get(`${API_URL}/dashboard/cursosPorReceita`),
        ]);

        setMetricas(metricasResponse.data);
        setTopCursos(topCursosResponse.data);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError(
          'Não foi possível carregar o Dashboard. Verifique se a API está rodando.',
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 1. Lógica de Carregamento e Erro
  if (loading) {
    return <div className="dashboard-container">Carregando métricas...</div>;
  }

  if (error) {
    return <div className="dashboard-container error-message">{error}</div>;
  }

  const kpisReais = [
    {
      titulo: 'Faturamento Total',
      valor: metricas.formatados?.faturamentoTotal || 'R$ 0,00',
      mudanca: 0,
      icon: '💰',
    },
    {
      titulo: 'Total de Vendas',
      valor: metricas.totalProdutosVendidos?.toString() || '0',
      mudanca: 0,
      icon: '🛒',
    },
    {
      titulo: 'Ticket Médio',
      valor: metricas.formatados?.ticketMedio || 'R$ 0,00',
      mudanca: 0,
      icon: '💸',
    },
    {
      titulo: 'Taxa de Conversão',
      valor: metricas.formatados?.taxaDeConversao || '0.00%',
      mudanca: 0,
      icon: '🎯',
    },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard de Vendas de Cursos</h1>

      <div style={{ marginBottom: '20px' }}>
        <Link to="/" className="link-to-products">
          ← Voltar para o Catálogo de Produtos
        </Link>
      </div>

      <div className="kpi-grid">
        {kpisReais.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* DADOS SIMULADOS */}
      <div className="dashboard-chart-box">
        <h2>Vendas e Receita Mensal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={dadosMesesFicticios.monthlySales}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#007bff"
              label={{
                value: 'Receita (R$)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#28a745"
              label={{ value: 'Vendas', angle: 90, position: 'insideRight' }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#007bff"
              name="Receita"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sales"
              stroke="#28a745"
              name="Vendas"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Tabela de Top Cursos - AGORA USANDO DADOS REAIS */}
      <div className="dashboard-table-box">
        <h2>Top 3 Cursos por Receita</h2>
        <table className="course-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Receita Gerada</th>
              <th>Total de Vendas</th>
              <th>Taxa de Conversão</th>
            </tr>
          </thead>
          <tbody>
            {topCursos.map((course, index) => (
              <tr key={index}>
                <td>{course.titulo}</td>
                <td>{course.valor}</td>
                <td>{course.quantidade}</td>
                <td>N/A</td>
              </tr>
            ))}
            {/* Mensagem de fallback se a lista de top cursos estiver vazia */}
            {topCursos.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  Nenhuma venda registrada para o período.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendasDashboard;
