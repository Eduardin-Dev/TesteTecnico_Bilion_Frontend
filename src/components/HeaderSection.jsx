import { Link } from 'react-router-dom';
import './HeaderSection.css';

// Componente Header/Navbar
export function Header() {
  return (
    <header className="bilion-header">
      <div className="bilion-header-left">
        {/* Logo (Texto "bilion" com cor dourada) */}
        <div className="bilion-logo">
          <span className="bilion-icon"></span>
          bilion
        </div>

        {/* Links de navegação */}
        <nav className="bilion-nav">
          <Link to="#">Taxas</Link>
          <Link to="#">FAQ</Link>
          <Link to="#">Ajuda</Link>
          <Link to="#">Sobre nós</Link>
        </nav>
      </div>

      <div className="bilion-header-right">
        <Link to="#" className="bilion-btn-login">
          Login
        </Link>
        <Link to="#" className="bilion-btn-cadastro">
          Cadastrar agora
        </Link>
      </div>
    </header>
  );
}

// Componente Hero (Venda seu curso online)
export function HeroSection() {
  return (
    <section className="bilion-hero-section">
      <div className="bilion-hero-content">
        <h1 className="bilion-hero-title">
          Venda seu curso <br />
          online
        </h1>

        <p className="bilion-hero-subtitle">
          Transforme o seu conhecimento em um curso online e crie seu negócio na
          internet
        </p>

        {/* Botão principal (laranja dourado) */}
        <Link to="#" className="bilion-btn-cta">
          Cadastrar agora
        </Link>
      </div>

      <div className="bilion-hero-mockups">
        {/* Renderiza as imagens/mockups do dashboard (placeholders) */}
        <div className="mockup-placeholder mockup-dark">
          <img className="mockup-img" src="cursoJavascript.png" alt="" />
        </div>
        <div className="mockup-placeholder mockup-main mockup-dark">
          <img className="mockup-img" src="cursoReact.jpg" alt="" />
        </div>
        <div className="mockup-placeholder mockup-dark">
          <img className="mockup-img" src="cursoNextJs.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}

// O componente principal da página
export function BilionHomePage() {
  return (
    <div className="bilion-container">
      <Header />
      <main>
        <HeroSection />

        <section className="bilion-beneficios">
          Confira os benefícios exclusivos da Bilion para ajudar a aumentar suas
          vendas e escalar seu negócio.
        </section>
      </main>
    </div>
  );
}

export default BilionHomePage;
