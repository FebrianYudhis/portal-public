const $ = (sel) => document.querySelector(sel);

/* ── Build a single link button ────────────── */

function createLink(link, index) {
  const a = document.createElement("a");
  a.className = `link-button${link.primary ? " primary" : ""}`;
  a.href = link.url;
  a.target = link.url.startsWith("http") ? "_blank" : "_self";
  a.rel = link.url.startsWith("http") ? "noopener noreferrer" : "";
  a.style.setProperty("--delay", `${(index + 1) * 90 + 250}ms`);
  a.innerHTML = `
    <span class="link-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
    <span class="link-label">${link.label}</span>
    <span class="link-arrow" aria-hidden="true">→</span>
  `;
  return a;
}

/* ── Generate barcode decoration ───────────── */

function buildBarcode(container) {
  const pattern = [2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2];
  const heights = [100, 70, 100, 60, 80, 100, 55, 90, 100, 65, 80, 100, 70, 100, 85, 60, 100, 75, 90, 100];
  pattern.forEach((w, i) => {
    const bar = document.createElement("span");
    bar.style.setProperty("--w", `${w}px`);
    bar.style.setProperty("--h", `${heights[i]}%`);
    container.appendChild(bar);
  });
}

/* ── Generate serial number ────────────────── */

function genSerial() {
  const d = new Date();
  const code = `FY-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return code;
}

/* ── Init ──────────────────────────────────── */

document.title = micrositeData.title;
$("#siteTitle").textContent = micrositeData.title;
$("#siteBio").textContent = micrositeData.bio;
$("#avatar").textContent = micrositeData.avatarText;
$("#links").replaceChildren(...micrositeData.links.map(createLink));

// Stamp with year
$("#stamp").textContent = new Date().getFullYear();

// Serial
$("#serial").textContent = genSerial();

// Barcode
buildBarcode($("#barcode"));
