// src/components/KpiCard.jsx
import React from 'react';
import './KpiCard.css';

function KpiCard({ titulo, valor, mudanca, icon }) {
  const isPositive = mudanca >= 0;
  const changeStyle = { color: isPositive ? '#28a745' : '#dc3545' };

  return (
    <div className="kpi-card">
      <div className="kpi-icon-container">{icon}</div>
      <div className="kpi-content">
        <p className="kpi-title">{titulo}</p>
        <h2 className="kpi-value">{valor}</h2>
        <span className="kpi-change" style={changeStyle}>
          {isPositive ? '▲ ' : '▼ '}
          {mudanca}% vs Mês Passado
        </span>
      </div>
    </div>
  );
}

export default KpiCard;
