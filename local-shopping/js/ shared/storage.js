// Configuração e helpers do localStorage
const STORAGE_KEYS = {
  cidades: 'local_shopping_cidades',
  lojas: 'local_shopping_lojas',
  comunidades: 'local_shopping_comunidades',
  usuarios: 'local_shopping_usuarios'
};

function loadInitialData() {
  if (!localStorage.getItem(STORAGE_KEYS.cidades)) {
    const cidades = [
      { id: 1, nome: "São Paulo" },
      { id: 2, nome: "Rio de Janeiro" },
      { id: 3, nome: "Belo Horizonte" },
      { id: 4, nome: "Porto Alegre" }
    ];
    localStorage.setItem(STORAGE_KEYS.cidades, JSON.stringify(cidades));
  }

  if (!localStorage.getItem(STORAGE_KEYS.lojas)) {
    const lojas = [
      { id: 1, nome: "Electro SP", cidadeId: 1, produtos: [{ id: 1, nome: "Smartphone X", preco: 1999.99 }, { id: 2, nome: "Fone Bluetooth", preco: 299.9 }] },
      { id: 2, nome: "Moda & Tal", cidadeId: 1, produtos: [{ id: 3, nome: "Camiseta Estampada", preco: 79.9 }, { id: 4, nome: "Calça Jeans", preco: 149.9 }] },
      { id: 3, nome: "Praia Beach Store", cidadeId: 2, produtos: [{ id: 5, nome: "Óculos de sol", preco: 129.9 }, { id: 6, nome: "Canga", preco: 45.0 }] },
      { id: 4, nome: "Tecido & Cia", cidadeId: 2, produtos: [{ id: 7, nome: "Tecido de algodão", preco: 32.9 }] },
      { id: 5, nome: "Minas Gourmet", cidadeId: 3, produtos: [{ id: 8, nome: "Café especial", preco: 24.9 }, { id: 9, nome: "Doce de leite", preco: 18.9 }] },
      { id: 6, nome: "Tchê Modas", cidadeId: 4, produtos: [{ id: 10, nome: "Botina", preco: 259.9 }, { id: 11, nome: "Chapéu", preco: 89.9 }] }
    ];
    localStorage.setItem(STORAGE_KEYS.lojas, JSON.stringify(lojas));
  }

  if (!localStorage.getItem(STORAGE_KEYS.comunidades)) {
    const comunidades = [
      { id: 1, nome: "Comunidade Tech SP", cidadeId: 1, contexto: "Inovação e tecnologia para lojistas" },
      { id: 2, nome: "Moda Consciente RJ", cidadeId: 2, contexto: "Moda sustentável e brechós" },
      { id: 3, nome: "Artesanato BH", cidadeId: 3, contexto: "Feiras e produtos manuais" },
      { id: 4, nome: "Gaúchos Empreendedores", cidadeId: 4, contexto: "Apoio a pequenos negócios" },
      { id: 5, nome: "Gastronomia SP", cidadeId: 1, contexto: "Restaurantes e delivery local" }
    ];
    localStorage.setItem(STORAGE_KEYS.comunidades, JSON.stringify(comunidades));
  }

  if (!localStorage.getItem(STORAGE_KEYS.usuarios)) {
    const usuarios = [
      { id: 1, nome: "João Silva", email: "joao@teste.com", senha: "123456", tipo: "cliente" }
    ];
    localStorage.setItem(STORAGE_KEYS.usuarios, JSON.stringify(usuarios));
  }
}

function getCidades() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.cidades)); }
function getLojas() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.lojas)); }
function getComunidades() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.comunidades)); }
function getUsuarios() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.usuarios)); }

function saveLojas(lojas) { localStorage.setItem(STORAGE_KEYS.lojas, JSON.stringify(lojas)); }
function saveUsuarios(usuarios) { localStorage.setItem(STORAGE_KEYS.usuarios, JSON.stringify(usuarios)); }

window.Storage = {
  loadInitialData,
  getCidades,
  getLojas,
  getComunidades,
  getUsuarios,
  saveLojas,
  saveUsuarios
};