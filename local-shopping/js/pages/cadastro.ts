document.addEventListener('DOMContentLoaded', () => {
  Storage.loadInitialData();

  const tipoSelect = document.getElementById("reg-tipo");
  const lojaDiv = document.getElementById("loja-select-group");
  const lojaSelect = document.getElementById("reg-loja-id");

  if (tipoSelect) {
    tipoSelect.addEventListener("change", () => {
      if (tipoSelect.value === "lojista") {
        lojaDiv.style.display = "block";
        const lojas = Storage.getLojas();
        lojaSelect.innerHTML = "<option value=''>Selecione uma loja</option>";
        const cidades = Storage.getCidades();

        lojas.forEach(loja => {
          const option = document.createElement("option");
          option.value = loja.id;
          const cidadeNome = cidades.find(c => c.id === loja.cidadeId)?.nome || "desconhecida";
          option.textContent = `${loja.nome} (cidade ${cidadeNome})`;
          lojaSelect.appendChild(option);
        });
      } else {
        lojaDiv.style.display = "none";
      }
    });
  }

  const btnRegister = document.getElementById("do-register");
  const errorSpan = document.getElementById("reg-error");

  if (btnRegister) {
    btnRegister.addEventListener("click", () => {
      const nome = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const senha = document.getElementById("reg-password").value;
      const tipo = tipoSelect.value;
      let lojaId = undefined;

      if (tipo === "lojista") {
        const selected = lojaSelect.value;
        if (!selected) {
          errorSpan.innerText = "Selecione uma loja para seu cadastro como lojista";
          return;
        }
        lojaId = parseInt(selected);
      }

      if (!nome || !email || !senha) {
        errorSpan.innerText = "Preencha todos os campos";
        return;
      }

      if (Auth.cadastrarUsuario(nome, email, senha, tipo, lojaId)) {
        alert("Cadastro realizado! Faça login.");
        window.location.href = "login.html";
      } else {
        errorSpan.innerText = "E-mail já cadastrado";
      }
    });
  }
});