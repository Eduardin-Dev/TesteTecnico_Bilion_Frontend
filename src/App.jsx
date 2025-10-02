import './App.css';
import ProductList from './pages/produtos/produtosLista.jsx';
import BilionHomePage, {
  Header,
  HeroSection,
} from './components/HeaderSection.jsx';

function App() {
  return (
    <div>
      <BilionHomePage></BilionHomePage>
      <ProductList />
    </div>
  );
}

export default App;
