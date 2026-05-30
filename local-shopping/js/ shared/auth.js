function usuarioLogado() {
  const data = sessionStorage.getItem("userLogged");
  return data ? JSON.parse(data) : null;
}

function salvarSessao(usuario) {
  if (usuario) sessionStorage.setItem("userLogged", JSON.stringify(usuario));
  else sessionStorage.removeItem("userLogged");
}

function fazerLogin(email, senha) {
  const usuarios = Storage.getUsuarios();
  const user = usuarios.find(u => u.email === email && u.senha === senha);
  if (user) {
    salvarSessao(user);
    return user;
  }
  return null;
}

function cadastrarUsuario(nome, email, senha, tipo, lojaId) {
  const usuarios = Storage.getUsuarios();
  if (usuarios.find(u => u.email === email)) return false;
  const newId = usuarios.length + 1;
  const novo = { id: newId, nome, email, senha, tipo, lojaId };
  usuarios.push(novo);
  Storage.saveUsuarios(usuarios);
  return true;
}

function logout() {
  salvarSessao(null);
  window.location.href = "index.html";
}

function protegerPagina() {
  const user = usuarioLogado();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

window.Auth = {
  usuarioLogado,
  fazerLogin,
  cadastrarUsuario,
  logout,
  protegerPagina
};