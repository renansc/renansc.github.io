const apps = [
  {
    nome: "GPS Musical",
    descricao: "Gerencie repertorio, letras e blocos musicais.",
    href: "GPSMusical/gpsmusical.html"
  },
  {
    nome: "Financeiro Nanotech",
    descricao: "Controle de lancamentos, contas, categorias e conciliacao.",
    href: "FinanceiroNanotech/financeiro.html"
  },
  {
    nome: "CardioClin",
    descricao: "Acesso ao sistema CardioClin.",
    href: "CardioClin/index.html"
  }
];

function renderMenu() {
  const menu = document.getElementById("menuLinks");
  menu.innerHTML = apps
    .map((app) => `<li><a href="${app.href}">${app.nome}</a></li>`)
    .join("");
}

function renderCards() {
  const grid = document.getElementById("appsGrid");
  grid.innerHTML = apps
    .map(
      (app) => `
        <article class="app-card card">
          <h3>${app.nome}</h3>
          <p>${app.descricao}</p>
          <a class="app-link" href="${app.href}">Abrir aplicativo</a>
        </article>
      `
    )
    .join("");
}

renderMenu();
renderCards();
