
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config({ path: path.resolve('../.env') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Middleware para logging básico
let requestCount = 0;
const startTime = new Date();

app.use((req, res, next) => {
  requestCount++;
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url} (Request #${requestCount})`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = new Date() - startTime;
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: `${Math.floor(uptime / 1000)}s`,
    requestCount,
    microfrontends: {
      header: process.env.MICROFRONTEND_HEADER_VERSION || '1.0.0',
      products: process.env.MICROFRONTEND_PRODUCTS_VERSION || '1.0.0',
      cart: process.env.MICROFRONTEND_CART_VERSION || '1.0.0'
    }
  });
});

// Endpoint para métricas básicas
app.get('/metrics', (req, res) => {
  res.json({
    requests_total: requestCount,
    uptime_seconds: Math.floor((new Date() - startTime) / 1000),
    memory_usage: process.memoryUsage(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Servir assets de todos os microfrontends
// Serve arquivos estáticos dos microfrontends
app.use('/header', express.static(path.resolve(__dirname, '../dist/header')));
app.use('/products', express.static(path.resolve(__dirname, '../dist/products')));
app.use('/cart', express.static(path.resolve(__dirname, '../dist/cart')));
app.use('/shared', express.static(path.resolve(__dirname, '../shared')));

// Serve o router dedicado
app.get('/router.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'router.js'));
});

// Função para extrair assets (CSS e JS) de um arquivo HTML
const extractAssets = (html) => {
  const cssRegex = /<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"[^>]*>/g;
  const jsRegex = /<script[^>]*src="([^"]*)"[^>]*><\/script>/g;
  
  const styles = [];
  const scripts = [];
  
  let match;
  while ((match = cssRegex.exec(html)) !== null) {
    styles.push(match[1]);
  }
  
  while ((match = jsRegex.exec(html)) !== null) {
    scripts.push(match[1]);
  }
  
  return { styles, scripts };
};

// Exemplo de template composition server-side
const handleRoutes = async (req, res) => {
  try {
    // Carrega os templates dos microfrontends
    const headerPath = path.resolve(__dirname, '../dist/header/index.html');
    const productsPath = path.resolve(__dirname, '../dist/products/index.html');
    const cartPath = path.resolve(__dirname, '../dist/cart/index.html');

    const [headerHtml, productsHtml, cartHtml] = await Promise.all([
      fs.readFile(headerPath, 'utf-8'),
      fs.readFile(productsPath, 'utf-8'),
      fs.readFile(cartPath, 'utf-8')
    ]);

    // Extrai os assets de cada microfrontend
    const headerAssets = extractAssets(headerHtml);
    const productsAssets = extractAssets(productsHtml);
    const cartAssets = extractAssets(cartHtml);

    // Combina todos os CSS e JS
    const allStyles = [...headerAssets.styles, ...productsAssets.styles, ...cartAssets.styles];
    const allScripts = [...headerAssets.scripts, ...productsAssets.scripts, ...cartAssets.scripts];

    // Template principal que compõe todos os microfrontends
    const composedTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroShop - Microfrontends Demo</title>
    
    <!-- CSS dos Microfrontends -->
    ${allStyles.map(style => `<link rel="stylesheet" crossorigin href="${style}">`).join('\n    ')}
    
    <style>
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: #f8fafc;
            line-height: 1.6;
            color: #2d3748;
            width: 100%;
            overflow-x: hidden;
        }
        
        .app-container { 
            min-height: 100vh; 
            display: flex; 
            flex-direction: column; 
            width: 100%;
        }
        
        main { 
            flex: 1; 
            padding: 0;
            width: 100%;
            min-height: calc(100vh - 120px);
        }
        
        .page-section { 
            display: none; 
            animation: fadeIn 0.3s ease-in-out;
            width: 100%;
            min-height: 100%;
        }
        }
        
        .page-section.active {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            main {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Header Microfrontend -->
        <header>
            <div id="header-root"></div>
        </header>
        
        <main>
            <!-- Página Produtos (Home) -->
            <div id="page-products" class="page-section active">
                <div id="products-root"></div>
            </div>
            
            <!-- Página Carrinho -->
            <div id="page-cart" class="page-section">
                <div id="cart-root"></div>
            </div>
        </main>
    </div>

    <!-- Store Global -->
    <script type="module" src="/shared/store.js"></script>
    
    <!-- Microfrontend Router -->
    <script type="module" src="/router.js"></script>
    
    <!-- SPA Router Script -->
    <script type="module">
        // Inicialização do sistema de roteamento
        document.addEventListener('DOMContentLoaded', () => {
            if (window.microfrontendRouter) {
                window.microfrontendRouter.init();
                
                // Integra com o store global
                if (window.globalStore) {
                    window.microfrontendRouter.onRouteChange((currentRoute) => {
                        window.globalStore.setState({ currentRoute });
                    });
                }
            }
        });
    </script>
    
    <!-- Scripts dos Microfrontends -->
    ${allScripts.map(script => `<script type="module" crossorigin src="${script}"></script>`).join('\n    ')}
</body>
</html>`;

    res.send(composedTemplate);
  } catch (error) {
    console.error('Erro ao compor template:', error);
    res.status(500).send('Erro interno do servidor');
  }
};

// Rotas principais
app.get('/', handleRoutes);
app.get('/products', handleRoutes);
app.get('/cart', handleRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Shell App rodando em http://${HOST}:${PORT}`);
  console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
  console.log(`🏠 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
