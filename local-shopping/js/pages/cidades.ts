let currentCityId = null;

document.addEventListener('DOMContentLoaded', () => {
  Storage.loadInitialData();

  const user = Auth.protegerPagina();
  if (!user) return;

  const userNameSpan = document.getElementById("user-name-display");
  if (userNameSpan) {
    userNameSpan.innerHTML = `Olá, ${user.nome} (${user.tipo})`;
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", Auth.logout);

  if (user.tipo === "lojista") {
    const formArea = document.getElementById("loja-form-area");
    if (formArea) formArea.style.display = "block";
    setupProdutoForm(user);
  }

  renderCityList();

  const backBtn = document.getElementById("back-to-cities");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      document.getElementById("cities-view").style.display = "block";
      document.getElementById("city-detail-view").style.display = "none";
      currentCityId = null;
    });
  }

  const filterLojas = document.getElementById("filter-lojas");
  const filterComunidades = document.getElementById("filter-comunidades");
  const filterProdutos = document.getElementById("filter-produtos");

  if (filterLojas) {
    filterLojas.addEventListener("input", () => {
      if (currentCityId !== null) showCityDetail(currentCityId);
    });
  }
  if (filterComunidades) {
    filterComunidades.addEventListener("input", () => {
      if (currentCityId !== null) showCityDetail(currentCityId);
    });
  }
  if (filterProdutos) {
    filterProdutos.addEventListener("input", () => {
      if (currentCityId !== null) showCityDetail(currentCityId);
    });
  }
});

function setupProdutoForm(user) {
  const addBtn = document.getElementById("add-prod-btn");
  const msgDiv = document.getElementById("add-prod-msg");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const nomeProd = document.getElementById("new-prod-nome").value;
      const precoProd = parseFloat(document.getElementById("new-prod-preco").value);

      if (!nomeProd || isNaN(precoProd) || precoProd <= 0) {
        if (msgDiv) {
          msgDiv.textContent = "Preencha nome e preço válido";
          msgDiv.style.color = "#dc2626";
        }
        return;
      }

      const lojas = Storage.getLojas();
      const lojaIndex = lojas.findIndex(l => l.id === user.lojaId);

      if (lojaIndex !== -1) {
        const allProdIds = lojas.flatMap(l => l.produtos.map(p => p.id));
        const newId = Math.max(...allProdIds, 0) + 1;
        const novoProduto = { id: newId, nome: nomeProd, preco: precoProd };

        lojas[lojaIndex].produtos.push(novoProduto);
        Storage.saveLojas(lojas);

        if (msgDiv) {
          msgDiv.textContent = "Produto cadastrado com sucesso!";
          msgDiv.style.color = "#10b981";
        }

        document.getElementById("new-prod-nome").value = "";
        document.getElementById("new-prod-preco").value = "";

        if (currentCityId !== null) showCityDetail(currentCityId);
      } else {
        if (msgDiv) {
          msgDiv.textContent = "Erro: loja não encontrada";
          msgDiv.style.color = "#dc2626";
        }
      }
    });
  }
}

function renderCityList() {
  const container = document.getElementById("city-list");
  if (!container) return;

  const cidades = Storage.getCidades();
  container.innerHTML = "";

  cidades.forEach(cidade => {
    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `<div class="city-name">${cidade.nome}</div>`;
    card.onclick = () => showCityDetail(cidade.id);
    container.appendChild(card);
  });
}

function showCityDetail(cityId) {
  currentCityId = cityId;
  const cidades = Storage.getCidades();
  const cidade = cidades.find(c => c.id === cityId);
  document.getElementById("selected-city-name").innerHTML = cidade.nome;

  const filterLojas = document.getElementById("filter-lojas").value.toLowerCase();
  const filterComunidades = document.getElementById("filter-comunidades").value.toLowerCase();
  const filterProdutos = document.getElementById("filter-produtos").value.toLowerCase();

  let lojas = Storage.getLojas().filter(l => l.cidadeId === cityId);
  if (filterLojas) lojas = lojas.filter(l => l.nome.toLowerCase().includes(filterLojas));
  if (filterProdutos) {
    lojas = lojas.filter(l => l.produtos.some(p => p.nome.toLowerCase().includes(filterProdutos)));
  }

  const storesContainer = document.getElementById("stores-container");
  storesContainer.innerHTML = "";

  lojas.forEach(loja => {
    let produtosFiltrados = loja.produtos;
    if (filterProdutos) {
      produtosFiltrados = loja.produtos.filter(p => p.nome.toLowerCase().includes(filterProdutos));
    }

    const storeDiv = document.createElement("div");
    storeDiv.className = "store-card";
    let produtosHtml = '<div class="product-list">';
    produtosFiltrados.forEach(prod => {
      produtosHtml += `<div class="product-item"><strong>${prod.nome}</strong> R$ ${prod.preco.toFixed(2)}</div>`;
    });
    produtosHtml += '</div>';
    storeDiv.innerHTML = `<div class="store-name">${loja.nome}</div>${produtosHtml}`;
    storesContainer.appendChild(storeDiv);
  });

  let comunidades = Storage.getComunidades().filter(c => c.cidadeId === cityId);
  if (filterComunidades) {
    comunidades = comunidades.filter(c =>
      c.nome.toLowerCase().includes(filterComunidades) ||
      c.contexto.toLowerCase().includes(filterComunidades)
    );
  }

  const communitiesContainer = document.getElementById("communities-container");
  communitiesContainer.innerHTML = "";

  comunidades.forEach(comm => {
    const commDiv = document.createElement("div");
    commDiv.className = "community-card";
    commDiv.innerHTML = `<div><strong>${comm.nome}</strong></div><div class="community-context">📌 ${comm.contexto}</div>`;
    communitiesContainer.appendChild(commDiv);
  });

  document.getElementById("cities-view").style.display = "none";
  document.getElementById("city-detail-view").style.display = "block";
}