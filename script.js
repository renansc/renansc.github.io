const fallbackApps = [
  {
    slug: "gps-musical",
    nome: "GPS Musical",
    descricao: "Gerencie repertorio, letras e blocos musicais.",
    href: "GPSMusical/gpsmusical.html"
  },
  {
    slug: "financeiro-nanotech",
    nome: "Financeiro Nanotech",
    descricao: "Controle de lancamentos, contas, categorias e conciliacao.",
    href: "FinanceiroNanotech/financeiro.html"
  },
  {
    slug: "prontuario-bpa",
    nome: "Prontuario BPA",
    descricao: "Gerenciador de atendimentos, cadastros e insercoes no BPA via backend local.",
    href: "prontuario-bpa.html"
  }
];

const appCatalog = {
  "gps-musical": {
    accent: "cyan",
    icon: "♪",
    kicker: "Musica e repertorio",
    meta: "Biblioteca, blocos e letras"
  },
  "financeiro-nanotech": {
    accent: "gold",
    icon: "$",
    kicker: "Financeiro",
    meta: "Lancamentos, titulos e conciliacao"
  },
  "prontuario-bpa": {
    accent: "blue",
    icon: "+",
    kicker: "Saude e BPA",
    meta: "Prontuario, cadastros e envio ao Firebird"
  }
};

let apps = [...fallbackApps];

function normalizeApps(items) {
  if (!Array.isArray(items)) return [...fallbackApps];

  return items
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      slug: String(item.slug || item.href || item.nome || ""),
      nome: String(item.nome || item.name || ""),
      descricao: String(item.descricao || item.description || ""),
      href: String(item.href || "")
    }))
    .filter((item) => item.nome && item.href);
}

function mergeApps(items) {
  const merged = new Map();
  [...fallbackApps, ...normalizeApps(items)].forEach((item) => {
    const key = String(item.slug || item.href || item.nome || "").trim().toLowerCase();
    if (!key) return;
    merged.set(key, { ...(merged.get(key) || {}), ...item });
  });
  return [...merged.values()];
}

function appTheme(app) {
  const key = String(app.slug || "").trim().toLowerCase();
  return appCatalog[key] || {
    accent: "cyan",
    icon: "•",
    kicker: "Modulo",
    meta: "Atalho disponivel no portal"
  };
}

function refreshSummary() {
  const count = document.getElementById("appCount");
  if (count) {
    count.textContent = String(apps.length);
  }
}

function renderMenu() {
  const menu = document.getElementById("menuLinks");
  menu.innerHTML = apps
    .map((app) => `<li><a href="${app.href}">${app.nome}</a></li>`)
    .join("");
}

function renderCards() {
  const grid = document.getElementById("appsGrid");
  grid.innerHTML = apps
    .map((app) => {
      const theme = appTheme(app);
      return `
        <article class="app-card card reveal" data-accent="${theme.accent}">
          <div>
            <div class="app-head">
              <span class="app-kicker">${theme.kicker}</span>
              <div class="app-icon" aria-hidden="true">${theme.icon}</div>
            </div>
            <h3>${app.nome}</h3>
            <p>${app.descricao}</p>
          </div>
          <div class="app-foot">
            <span class="app-meta">${theme.meta}</span>
            <a class="app-link" href="${app.href}">Abrir modulo</a>
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadApps() {
  try {
    const response = await fetch("/api/site/apps", {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Falha ao carregar apps do portal (${response.status})`);
    }

    const payload = await response.json();
    apps = mergeApps(payload.apps);
  } catch (error) {
    console.warn("Portal site sync error:", error);
  } finally {
    renderMenu();
    renderCards();
    refreshSummary();
  }
}

renderMenu();
renderCards();
refreshSummary();
loadApps();
