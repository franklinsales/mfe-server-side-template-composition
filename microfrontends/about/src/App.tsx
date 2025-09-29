import './App.css'

function App() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>Sobre o MicroShop</h1>
        <p className="hero-subtitle">
          Demonstração de arquitetura de microfrontends com composição server-side
        </p>
      </div>
      
      <div className="about-content">
        <section className="section">
          <h2>🏗️ Arquitetura</h2>
          <p>
            Este projeto demonstra como implementar uma arquitetura de microfrontends 
            utilizando composição server-side. Cada seção da aplicação é um microfrontend 
            independente que pode ser desenvolvido e implantado separadamente.
          </p>
        </section>

        <section className="section">
          <h2>🧩 Microfrontends</h2>
          <div className="microfrontends-grid">
            <div className="mfe-card">
              <h3>🏠 Header</h3>
              <p>Navegação principal e informações do usuário</p>
              <span className="tech-stack">React + TypeScript</span>
            </div>
            <div className="mfe-card">
              <h3>🛍️ Products</h3>
              <p>Catálogo de produtos e funcionalidades de compra</p>
              <span className="tech-stack">React + TypeScript</span>
            </div>
            <div className="mfe-card">
              <h3>🛒 Cart</h3>
              <p>Carrinho de compras e gerenciamento de itens</p>
              <span className="tech-stack">React + TypeScript</span>
            </div>
            <div className="mfe-card">
              <h3>ℹ️ About</h3>
              <p>Informações sobre o projeto e arquitetura</p>
              <span className="tech-stack">React + TypeScript</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>🔧 Tecnologias</h2>
          <div className="tech-list">
            <div className="tech-item">
              <strong>Frontend:</strong> React, TypeScript, Vite
            </div>
            <div className="tech-item">
              <strong>Backend:</strong> Node.js, Express
            </div>
            <div className="tech-item">
              <strong>Estado Global:</strong> Custom Store Pattern
            </div>
            <div className="tech-item">
              <strong>Composição:</strong> Server-Side Template Composition
            </div>
          </div>
        </section>

        <section className="section">
          <h2>🎯 Benefícios</h2>
          <ul className="benefits-list">
            <li>✅ Desenvolvimento independente de cada microfrontend</li>
            <li>✅ Deploy independente e versionamento separado</li>
            <li>✅ Times podem trabalhar com diferentes tecnologias</li>
            <li>✅ Escalabilidade horizontal da aplicação</li>
            <li>✅ Isolamento de falhas entre módulos</li>
            <li>✅ Reutilização de componentes entre projetos</li>
          </ul>
        </section>

        <section className="section">
          <h2>📞 Contato</h2>
          <div className="contact-info">
            <p>
              Este é um projeto de demonstração. Para mais informações sobre 
              arquitetura de microfrontends, consulte a documentação oficial 
              ou entre em contato conosco.
            </p>
            <div className="contact-links">
              <a href="mailto:contato@microshop.com" className="contact-link">
                📧 contato@microshop.com
              </a>
              <a href="https://github.com/microshop" className="contact-link">
                🐙 GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App