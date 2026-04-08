const DEMO_PASSWORD = "Luis@2024";
const DEMO_AUTH_KEY = "portal-demo-authenticated";
const MENU_APPS_FILE = "menuapps.txt";
const FULL_BASE_URL = "https://nanotech-lvoz.onrender.com";

const fallbackApps = [
  {
    slug: "ris-pacs",
    tipo: "direto",
    nome: "RIS+PACS",
    empresa: "LAB.STA TEREZINHA",
    href: "https://rispacsfull.onrender.com/"
  },
  {
    slug: "ris-cln",
    tipo: "direto",
    nome: "RIS+CLN",
    empresa: "CARDIO CLIN",
    href: "https://cardioclin.onrender.com/"
  },
  {
    slug: "crm-voip-cam",
    tipo: "direto",
    nome: "CRM+VOIP+CAM",
    empresa: "RIO BRANCO",
    href: "https://206.62.65.68:80"
  },
  {
    slug: "zap-workflow",
    tipo: "direto",
    nome: "Zap Workflow",
    empresa: "ZAP Workflow",
    href: "https://zap-workflow.onrender.com/"
  },
  {
    slug: "ris-bpa",
    tipo: "full",
    nome: "RIS+BPA",
    empresa: "srv/api-firebird",
    href: "https://nanotech-lvoz.onrender.com/bpa"
  },
  {
    slug: "financeiro",
    tipo: "full",
    nome: "financeiro",
    empresa: "srv/financeiro",
    href: "https://nanotech-lvoz.onrender.com/financeiro"
  },
  {
    slug: "gpsmusical",
    tipo: "full",
    nome: "gpsmusical",
    empresa: "srv/gpsmusical",
    href: "https://nanotech-lvoz.onrender.com/gpsmusical"
  }
];

const accentByType = {
  direto: ["cyan", "blue", "gold"],
  full: ["gold", "cyan", "blue"]
};

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
let portalApps = [...fallbackApps];

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function detectType(section) {
  return section === "menuapps" ? "full" : "direto";
}

function deriveMeta(app) {
  if (app.tipo === "full") {
    try {
      const path = new URL(app.href).pathname || "/";
      return path === "/" ? "FULL" : path;
    } catch (error) {
      return "FULL";
    }
  }
  return "URL externa";
}

function deriveDescription(app) {
  return app.tipo === "full"
    ? "Aplicacao interna da FULL aberta por rota dedicada."
    : "Link direto configurado acima de [menuapps].";
}

function enrichApps(items) {
  return items.map((app, index) => {
    const colors = accentByType[app.tipo] || accentByType.direto;
    return {
      ...app,
      slug: app.slug || slugify(app.nome),
      accent: colors[index % colors.length],
      icon: String(app.nome || "?").trim().charAt(0).toUpperCase() || "?",
      kicker: app.tipo === "full" ? "FULL" : "Direto",
      meta: deriveMeta(app),
      descricao: deriveDescription(app)
    };
  });
}

function parseMenuApps(text) {
  const lines = String(text || "").split(/\r?\n/);
  let section = "direto";
  const items = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("APP")) continue;
    if (line === "[menuapps]") {
      section = "menuapps";
      continue;
    }

    const columns = rawLine.split(/\t+/).map((item) => item.trim()).filter(Boolean);
    if (columns.length < 2) continue;

    const nome = columns[0];
    const empresa = columns[1] || "";
    const href = columns[columns.length - 1] || "";
    if (!href.startsWith("http")) continue;

    items.push({
      slug: slugify(nome),
      tipo: detectType(section),
      nome,
      empresa,
      href
    });
  }

  return enrichApps(items);
}

async function loadPortalApps() {
  try {
    const response = await fetch(MENU_APPS_FILE, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Falha ao carregar ${MENU_APPS_FILE}`);
    }

    const text = await response.text();
    const parsed = parseMenuApps(text);
    if (parsed.length) {
      portalApps = parsed;
    }
  } catch (error) {
    portalApps = enrichApps(fallbackApps);
  }
}

function directApps() {
  return portalApps.filter((app) => app.tipo === "direto");
}

function fullApps() {
  return portalApps.filter((app) => app.tipo === "full");
}

function countLinks() {
  return portalApps.length;
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
    .map((app) => `<li><a href="${app.href}" target="_blank" rel="noreferrer">${app.nome}</a></li>`)
    .join("");
}

function renderAppCards(items, target) {
  if (!target) return;

  target.innerHTML = items
    .map((app) => {
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
            <a class="app-link" href="${app.href}" target="_blank" rel="noreferrer">Abrir sistema</a>
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

async function bootstrap() {
  await loadPortalApps();
  renderMenu();
  renderCards();
  refreshSummary();
  activateView("overviewView");
  setAuthenticatedState(isAuthenticated());
}

bootstrap();
