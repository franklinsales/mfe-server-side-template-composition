import { useState, useEffect } from 'react'
import './App.css'

interface User {
  name: string;
  email: string;
}

interface GlobalState {
  cart: Array<{ id: number; quantity: number }>;
  user: User;
}

declare global {
  interface Window {
    globalStore?: {
      getState(): GlobalState;
      subscribe(callback: (state: GlobalState) => void): () => void;
      setState(newState: Partial<GlobalState>): void;
    };
  }
}

function App() {
  const [user, setUser] = useState<User>({ name: '', email: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<User>({ name: '', email: '' })

  useEffect(() => {
    // Conecta com o store global
    if (window.globalStore) {
      const updateState = (state: GlobalState) => {
        setUser(state.user);
        setFormData(state.user);
      };

      // Estado inicial
      updateState(window.globalStore.getState());

      // Subscreve às mudanças
      const unsubscribe = window.globalStore.subscribe(updateState);
      return unsubscribe;
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };

  const handleSave = () => {
    if (window.globalStore) {
      window.globalStore.setState({ user: formData });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          <div className="avatar-icon">👤</div>
        </div>
        <h1>Meu Perfil</h1>
        <p className="profile-subtitle">Gerencie suas informações pessoais</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="card-header">
            <h2>Informações Pessoais</h2>
            {!isEditing && (
              <button className="edit-btn" onClick={handleEdit}>
                ✏️ Editar
              </button>
            )}
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                />
              ) : (
                <div className="form-display">{user.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                />
              ) : (
                <div className="form-display">{user.email}</div>
              )}
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancelar
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Salvar Alterações
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <h3>Pedidos Realizados</h3>
              <p className="stat-number">23</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>Avaliações</h3>
              <p className="stat-number">18</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>Pontos de Fidelidade</h3>
              <p className="stat-number">1,247</p>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <h2>Configurações da Conta</h2>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Notificações por Email</h4>
                <p>Receber atualizações sobre pedidos e promoções</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Notificações Push</h4>
                <p>Alertas sobre ofertas especiais e novos produtos</p>
              </div>
              <label className="toggle">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Newsletter</h4>
                <p>Receber dicas e novidades semanalmente</p>
              </div>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-btn secondary">
            🔒 Alterar Senha
          </button>
          <button className="action-btn secondary">
            📍 Gerenciar Endereços
          </button>
          <button className="action-btn danger">
            🚪 Sair da Conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default App