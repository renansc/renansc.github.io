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
  }
];

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
    const remoteApps = normalizeApps(payload.apps);
    if (remoteApps.length) {
      apps = remoteApps;
      renderMenu();
      renderCards();
    }
  } catch (error) {
    console.warn("Portal site sync error:", error);
  }
}

renderMenu();
renderCards();
loadApps();
