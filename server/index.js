
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
app.use('/header', express.static(path.resolve(__dirname, '../dist/header')));
app.use('/products', express.static(path.resolve(__dirname, '../dist/products')));
app.use('/cart', express.static(path.resolve(__dirname, '../dist/cart')));
app.use('/shared', express.static(path.resolve(__dirname, '../shared')));

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
app.get('/', async (req, res) => {
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f6fa; }
        .container { min-height: 100vh; display: flex; flex-direction: column; }
        main { flex: 1; }
        .section { margin: 2rem 0; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Microfrontend -->
        <div id="header-root"></div>
        
        <main>
            <!-- Products Microfrontend -->
            <section class="section">
                <div id="products-root"></div>
            </section>
            
            <!-- Cart Microfrontend -->
            <section class="section">
                <div id="cart-root"></div>
            </section>
        </main>
    </div>

    <!-- Store Global -->
    <script type="module" src="/shared/store.js"></script>
    
    <!-- Scripts dos Microfrontends -->
    ${allScripts.map(script => `<script type="module" crossorigin src="${script}"></script>`).join('\n    ')}
</body>
</html>`;

    res.send(composedTemplate);
  } catch (error) {
    console.error('Erro ao compor template:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Shell App rodando em http://${HOST}:${PORT}`);
  console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
  console.log(`🏠 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
