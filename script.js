const DEMO_PASSWORD = "Luis@2024";
const DEMO_AUTH_KEY = "portal-demo-authenticated";
const FULL_BASE_URL = "https://nanotech-lvoz.onrender.com";

const portalApps = [
  {
    slug: "rispacs",
    tipo: "direto",
    nome: "RIS+PACS",
    empresa: "Laboratorio Santa Terezinha",
    descricao: "Link direto configurado acima de [menuapps].",
    href: "https://rispacsfull.onrender.com/",
    accent: "cyan",
    icon: "L",
    kicker: "Direto",
    meta: "URL externa"
  },
  {
    slug: "cardioclin",
    tipo: "direto",
    nome: "RIS+CLN",
    empresa: "Cardio Clin",
    descricao: "Link direto configurado acima de [menuapps].",
    href: "https://cardioclin.onrender.com/",
    accent: "blue",
    icon: "C",
    kicker: "Direto",
    meta: "URL externa"
  },
  {
    slug: "riobranco",
    tipo: "direto",
    nome: "CRM+VOIP+CAM",
    empresa: "Rio Branco",
    descricao: "Link direto configurado acima de [menuapps].",
    href: "https://206.62.65.68:80",
    accent: "gold",
    icon: "R",
    kicker: "Direto",
    meta: "URL externa"
  },
  {
    slug: "bpa",
    tipo: "full",
    nome: "RIS+BPA",
    empresa: "api-firebird",
    descricao: "Aplicacao interna da FULL aberta por rota dedicada.",
    route: "bpa",
    accent: "cyan",
    icon: "B",
    kicker: "FULL",
    meta: "/bpa"
  },
  {
    slug: "financeiro",
    tipo: "full",
    nome: "Financeiro",
    empresa: "Nanotech",
    descricao: "Aplicacao interna da FULL aberta por rota dedicada.",
    route: "financeiro",
    accent: "gold",
    icon: "F",
    kicker: "FULL",
    meta: "/financeiro"
  },
  {
    slug: "gpsmusical",
    tipo: "full",
    nome: "GPS Musical",
    empresa: "Nanotech",
    descricao: "Aplicacao interna da FULL aberta por rota dedicada.",
    route: "gpsmusical",
    accent: "blue",
    icon: "G",
    kicker: "FULL",
    meta: "/gpsmusical"
  },
  {
    slug: "site-nanotech",
    tipo: "direto",
    nome: "Site",
    empresa: "Nanotech",
    descricao: "Site institucional no GitHub Pages, acima de [menuapps].",
    href: "https://renansc.github.io/",
    accent: "blue",
    icon: "S",
    kicker: "Direto",
    meta: "GitHub Pages"
  },
  {
    slug: "full-nanotech",
    tipo: "direto",
    nome: "FULL",
    empresa: "Nanotech",
    descricao: "Entrada principal da FULL, acima de [menuapps].",
    href: FULL_BASE_URL,
    accent: "gold",
    icon: "N",
    kicker: "Direto",
    meta: "URL base"
  }
];

const authScreen = document.getElementById("authScreen");
const portalShell = document.getElementById("portalShell");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const authFeedback = document.getElementById("authFeedback");
const logoutButton = document.getElementById("logoutButton");
const directAppsGrid = document.getElementById("directAppsGrid");
const fullAppsGrid = document.getElementById("fullAppsGrid");
const fullCount = document.getElementById("fullCount");
const viewTabs = Array.from(document.querySelectorAll("[data-view-target]"));
const portalViews = Array.from(document.querySelectorAll(".portal-view"));
let memoryAuthenticated = false;

function resolveHref(app) {
  if (app.tipo === "full") {
    return `${FULL_BASE_URL}/${String(app.route || "").replace(/^\/+/, "")}`;
  }
  return app.href || "";
}

function directApps() {
  return portalApps.filter((app) => app.tipo === "direto");
}

function fullApps() {
  return portalApps.filter((app) => app.tipo === "full");
}

function countLinks() {
  return portalApps.filter((app) => Boolean(resolveHref(app))).length;
}

function isAuthenticated() {
  try {
    return localStorage.getItem(DEMO_AUTH_KEY) === "true";
  } catch (error) {
    return memoryAuthenticated;
  }
}

function setAuthenticated(value) {
  memoryAuthenticated = Boolean(value);
  try {
    localStorage.setItem(DEMO_AUTH_KEY, value ? "true" : "false");
  } catch (error) {
    // Fallback para navegadores que bloqueiam storage local.
  }
}

function setAuthenticatedState(authenticated) {
  authScreen.classList.toggle("is-hidden", authenticated);
  portalShell.classList.toggle("is-hidden", !authenticated);
  authScreen.hidden = authenticated;
  portalShell.hidden = !authenticated;

  if (authenticated) {
    passwordInput.value = "";
    authFeedback.textContent = "";
  }
}

function renderMenu() {
  const menu = document.getElementById("menuLinks");
  menu.innerHTML = portalApps
    .map((app) => `<li><a href="${resolveHref(app)}" target="_blank" rel="noreferrer">${app.nome}</a></li>`)
    .join("");
}

function renderAppCards(items, target) {
  if (!target) return;

  target.innerHTML = items
    .map((app) => {
      const href = resolveHref(app);
      return `
        <article class="app-card card reveal" data-accent="${app.accent}">
          <div>
            <div class="app-head">
              <span class="app-kicker">${app.kicker}</span>
              <div class="app-icon" aria-hidden="true">${app.icon}</div>
            </div>
            <h3>${app.nome}</h3>
            <strong class="app-company">${app.empresa}</strong>
            <p>${app.descricao}</p>
          </div>
          <div class="app-foot">
            <span class="app-meta">${app.meta}</span>
            <a class="app-link" href="${href}" target="_blank" rel="noreferrer">Abrir sistema</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCards() {
  renderAppCards(directApps(), directAppsGrid);
  renderAppCards(fullApps(), fullAppsGrid);
}

function refreshSummary() {
  const activeCount = countLinks();
  const fullAppsCount = fullApps().length;
  const countElement = document.getElementById("appCount");
  const summary = document.getElementById("portalSummary");

  if (countElement) {
    countElement.textContent = String(activeCount);
  }

  if (fullCount) {
    fullCount.textContent = String(fullAppsCount);
  }

  if (summary) {
    summary.textContent = `${activeCount} links / ${fullAppsCount} rotas full`;
  }
}

function activateView(targetId) {
  portalViews.forEach((view) => {
    const active = view.id === targetId;
    view.classList.toggle("is-hidden", !active);
    view.hidden = !active;
  });

  viewTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.viewTarget === targetId);
  });
}

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = passwordInput.value.trim();

  if (!password) {
    authFeedback.textContent = "Informe a senha para continuar.";
    return;
  }

  if (password !== DEMO_PASSWORD) {
    authFeedback.textContent = "Senha incorreta.";
    return;
  }

  authFeedback.textContent = "Acesso liberado.";
  setAuthenticated(true);
  setAuthenticatedState(true);
});

logoutButton?.addEventListener("click", () => {
  setAuthenticated(false);
  setAuthenticatedState(false);
});

viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateView(tab.dataset.viewTarget);
  });
});

renderMenu();
renderCards();
refreshSummary();
activateView("overviewView");
setAuthenticatedState(isAuthenticated());
