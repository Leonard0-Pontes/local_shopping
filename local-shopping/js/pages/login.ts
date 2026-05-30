document.addEventListener('DOMContentLoaded', () => {
  Storage.loadInitialData();

  const btnLogin = document.getElementById("do-login");
  const errorSpan = document.getElementById("login-error");

  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      const email = document.getElementById("login-email").value;
      const senha = document.getElementById("login-password").value;
      const user = Auth.fazerLogin(email, senha);

      if (user) {
        window.location.href = "cidades.html";
      } else {
        errorSpan.innerText = "E-mail ou senha inválidos";
      }
    });
  }
});