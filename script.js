const DEMO_PASSWORD = "Luis@2024";
const DEMO_AUTH_KEY = "portal-demo-authenticated";

const portalApps = [
  {
    slug: "rispacs",
    nome: "RIS+PACS",
    empresa: "Laboratorio Santa Terezinha",
    descricao: "Ambiente principal do laboratorio publicado no Render.",
    href: "https://rispacsfull.onrender.com/",
    accent: "cyan",
    icon: "L",
    kicker: "Laboratorio",
    meta: "Render"
  },
  {
    slug: "cardioclin",
    nome: "RIS+CLN",
    empresa: "Cardio Clin",
    descricao: "Acesso ao ambiente clinico da Cardio Clin.",
    href: "https://cardioclin.onrender.com/",
    accent: "blue",
    icon: "C",
    kicker: "Clinica",
    meta: "Render"
  },
  {
    slug: "riobranco",
    nome: "CRM+VOIP+CAM",
    empresa: "Rio Branco",
    descricao: "Entrada cadastrada no menu, aguardando URL final para publicacao.",
    href: "",
    accent: "gold",
    icon: "R",
    kicker: "Hospital",
    meta: "Sem URL"
  },
  {
    slug: "apae",
    nome: "RIS+BPA",
    empresa: "APAE",
    descricao: "Entrada prevista no portal, aguardando publicacao do link.",
    href: "",
    accent: "cyan",
    icon: "A",
    kicker: "Atendimento",
    meta: "Sem URL"
  },
  {
    slug: "site-nanotech",
    nome: "Site",
    empresa: "Nanotech",
    descricao: "Site institucional publicado no GitHub Pages.",
    href: "https://renansc.github.io/",
    accent: "blue",
    icon: "S",
    kicker: "GitHub",
    meta: "GitHub Pages"
  },
  {
    slug: "full-nanotech",
    nome: "FULL",
    empresa: "Nanotech",
    descricao: "Portal completo da Nanotech publicado no Render.",
    href: "https://nanotech-lvoz.onrender.com/",
    accent: "gold",
    icon: "N",
    kicker: "Operacao",
    meta: "Render"
  }
];

const authScreen = document.getElementById("authScreen");
const portalShell = document.getElementById("portalShell");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("passwordInput");
const authFeedback = document.getElementById("authFeedback");
const logoutButton = document.getElementById("logoutButton");
const activeAppsGrid = document.getElementById("activeAppsGrid");
const pendingAppsGrid = document.getElementById("pendingAppsGrid");
const pendingCount = document.getElementById("pendingCount");
const viewTabs = Array.from(document.querySelectorAll("[data-view-target]"));
const portalViews = Array.from(document.querySelectorAll(".portal-view"));
let memoryAuthenticated = false;

function countLinks() {
  return portalApps.filter((app) => app.href).length;
}

function countPending() {
  return portalApps.filter((app) => !app.href).length;
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
    .filter((app) => app.href)
    .map((app) => `<li><a href="${app.href}" target="_blank" rel="noreferrer">${app.nome}</a></li>`)
    .join("");
}

function renderAppCards(items, target) {
  if (!target) return;

  target.innerHTML = items
    .map((app) => {
      const action = app.href
        ? `<a class="app-link" href="${app.href}" target="_blank" rel="noreferrer">Abrir sistema</a>`
        : `<span class="app-link app-link-disabled">Em configuracao</span>`;

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
            ${action}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCards() {
  renderAppCards(
    portalApps.filter((app) => app.href),
    activeAppsGrid
  );
  renderAppCards(
    portalApps.filter((app) => !app.href),
    pendingAppsGrid
  );
}

function refreshSummary() {
  const activeCount = countLinks();
  const waitingCount = countPending();
  const countElement = document.getElementById("appCount");
  const summary = document.getElementById("portalSummary");

  if (countElement) {
    countElement.textContent = String(activeCount);
  }

  if (pendingCount) {
    pendingCount.textContent = String(waitingCount);
  }

  if (summary) {
    summary.textContent = `${activeCount} ativos / ${waitingCount} pendentes`;
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
