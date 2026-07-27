(function () {
  const defaultApiBase = "https://api.ark-os26.cc";
  const tags = ["工作", "家人", "感情", "健康", "睡眠", "夢境", "感謝", "低潮"];
  const selectedLibraryImages = new Map();
  let entries = [];
  let cards = [];
  let apiBase = localStorage.getItem("emilyhome.apiBase") || defaultApiBase;
  let apiToken = localStorage.getItem("emilyhome.token") || "";

  const gate = document.getElementById("gate");
  const app = document.getElementById("app");
  const gateStatus = document.getElementById("gateStatus");
  const apiBaseInput = document.getElementById("apiBaseInput");
  const tokenInput = document.getElementById("tokenInput");
  const entryListEl = document.getElementById("entryList");
  const calendarEl = document.getElementById("calendar");
  const form = document.getElementById("entryForm");
  const statusEl = document.getElementById("formStatus");
  const detailEl = document.getElementById("entryDetail");
  const tagsInput = document.getElementById("tagsInput");
  const tagPicker = document.getElementById("tagPicker");
  const libraryGrid = document.getElementById("libraryGrid");
  const libraryStatus = document.getElementById("libraryStatus");
  const libraryYear = document.getElementById("libraryYear");
  const libraryMonth = document.getElementById("libraryMonth");
  const cardOptions = document.getElementById("cardOptions");

  apiBaseInput.value = apiBase;
  tokenInput.value = apiToken;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function apiUrl(path) {
    return apiBase.replace(/\/+$/, "") + path;
  }

  function headers(extra) {
    return Object.assign({}, apiToken ? { "x-arkos-token": apiToken } : {}, extra || {});
  }

  async function readJson(response) {
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await response.json().catch(() => ({}))
      : { error: await response.text().catch(() => "") };
    if (!response.ok) throw new Error(body.error || "Request failed");
    return body;
  }

  function friendlyConnectionError(error) {
    const message = String(error && error.message || "");
    if (message.includes("Cannot GET /api/wife-journal/entries") || message.includes("404")) {
      return "後端還沒更新或尚未重啟，請先重啟 ArkOS API 後再連線。";
    }
    if (message.includes("Admin access required") || message.includes("401")) {
      return "Token 沒有通過後端驗證，請確認輸入的是 ArkOS 後端目前使用的 ARKOS_UPLOAD_TOKEN。";
    }
    return "無法載入私密資料：" + (message || "連線失敗");
  }

  function mediaUrl(url, version) {
    if (!url) return "";
    const absolute = /^https?:\/\//i.test(url) ? url : apiUrl(url);
    return absolute + (absolute.indexOf("?") >= 0 ? "&" : "?") + "v=" + encodeURIComponent(version || Date.now());
  }

  function parseTags() {
    return String(tagsInput.value || "").split(",").map((tag) => tag.trim()).filter(Boolean);
  }

  function setTags(nextTags) {
    tagsInput.value = Array.from(new Set(nextTags)).join(",");
    renderTagPicker();
  }

  function renderTagPicker() {
    const selected = new Set(parseTags());
    tagPicker.innerHTML = tags.map((tag) => (
      '<button class="tag' + (selected.has(tag) ? ' active' : '') + '" type="button" data-tag="' + esc(tag) + '">' + esc(tag) + '</button>'
    )).join("");
  }

  function showApp() {
    gate.hidden = true;
    app.hidden = false;
  }

  function showGate(message, isError) {
    app.hidden = true;
    gate.hidden = false;
    gateStatus.textContent = message || "";
    gateStatus.className = "status" + (isError ? " error" : "");
  }

  function renderEntries() {
    if (!entries.length) {
      entryListEl.innerHTML = '<p class="muted">目前還沒有心情日記。</p>';
      return;
    }
    entryListEl.innerHTML = entries.map((entry) => {
      const cover = mediaUrl(entry.coverImageUrl, entry.updatedAt || entry.id);
      const visibility = entry.visibility === "password" ? "私密密碼" : (entry.visibility === "locked" ? "上鎖" : "一般");
      return '<article class="entry">'
        + (cover ? '<img class="cover" src="' + esc(cover) + '" alt="">' : '<div class="cover"></div>')
        + '<div>'
          + '<div class="entry-title">' + esc(entry.title || "今天的心情") + '</div>'
          + '<div class="entry-meta">' + esc(entry.date || "") + ' · ' + esc(entry.mood || "") + ' · ' + visibility + '</div>'
          + '<div class="entry-meta">' + esc(entry.excerpt || "") + '</div>'
          + '<div class="toolbar"><button type="button" data-open-id="' + esc(entry.id) + '">閱讀</button></div>'
        + '</div>'
      + '</article>';
    }).join("");
  }

  function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const byDate = new Set(entries.map((entry) => entry.date));
    calendarEl.innerHTML = Array.from({ length: days }, (_unused, index) => {
      const day = index + 1;
      const date = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
      return '<div class="day' + (byDate.has(date) ? ' has-entry' : '') + '">' + day + '</div>';
    }).join("");
  }

  async function loadEntries() {
    entryListEl.innerHTML = '<p class="muted">載入中...</p>';
    const body = await fetch(apiUrl("/api/wife-journal/entries"), { cache: "no-store", headers: headers() }).then(readJson);
    entries = Array.isArray(body.entries) ? body.entries : [];
    renderEntries();
    renderCalendar();
  }

  function markdownBody(markdown) {
    return String(markdown || "").replace(/^---[\s\S]*?---\s*/, "").trim();
  }

  async function openEntry(id) {
    detailEl.textContent = "讀取中...";
    try {
      let url = apiUrl("/api/wife-journal/entries/" + encodeURIComponent(id));
      const entry = entries.find((item) => item.id === id);
      if (entry && entry.visibility === "password") {
        const password = window.prompt("請輸入這篇文章的私密密碼");
        if (!password) {
          detailEl.textContent = "已取消開啟私密文章。";
          return;
        }
        url += "?password=" + encodeURIComponent(password);
      }
      const body = await fetch(url, { cache: "no-store", headers: headers() }).then(readJson);
      const media = (body.entry.media || []).map((item) => {
        if (item.type === "audio") return "\n[語音] " + (item.fileName || item.url);
        return "\n[照片] " + (item.fileName || item.relativePath || item.libraryId || "");
      }).join("");
      const card = body.entry.cardDraw ? "\n\n抽牌：" + (body.entry.cardDraw.cardName || body.entry.cardDraw.cardId || "") + "\n問題：" + (body.entry.cardDraw.question || "") + "\n解讀：" + (body.entry.cardDraw.reading || "") : "";
      detailEl.textContent = markdownBody(body.markdown || "") + media + card;
    } catch (error) {
      detailEl.textContent = error.message;
    }
  }

  function monthOptions(firstDate, lastDate) {
    const first = String(firstDate || "").match(/^(\d{4})-(\d{2})-/);
    const last = String(lastDate || "").match(/^(\d{4})-(\d{2})-/);
    if (!first || !last) return [];
    const start = new Date(Number(first[1]), Number(first[2]) - 1, 1);
    const end = new Date(Number(last[1]), Number(last[2]) - 1, 1);
    const out = [];
    for (let cursor = end; cursor >= start; cursor = new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)) {
      out.push({ year: String(cursor.getFullYear()), month: String(cursor.getMonth() + 1).padStart(2, "0") });
    }
    return out;
  }

  async function loadLibrarySummary() {
    try {
      const body = await fetch(apiUrl("/api/photo-library/summary"), { cache: "no-store", headers: headers() }).then(readJson);
      const options = monthOptions(body.summary && body.summary.firstDate, body.summary && body.summary.lastDate);
      const years = Array.from(new Set(options.map((item) => item.year)));
      libraryYear.innerHTML = years.map((year) => '<option value="' + year + '">' + year + '年</option>').join("");
      libraryYear.dataset.options = JSON.stringify(options);
      syncLibraryMonths();
      libraryStatus.textContent = options.length ? "選擇年月後載入 NAS Photos。" : "尚未建立 Photos 索引。";
    } catch (error) {
      libraryStatus.textContent = error.message;
      libraryStatus.className = "status error";
    }
  }

  function syncLibraryMonths() {
    const options = JSON.parse(libraryYear.dataset.options || "[]");
    const months = options.filter((item) => item.year === libraryYear.value).map((item) => item.month);
    libraryMonth.innerHTML = months.map((month) => '<option value="' + month + '">' + Number(month) + '月</option>').join("");
  }

  async function loadLibraryMonth() {
    const year = libraryYear.value;
    const month = libraryMonth.value;
    if (!year || !month) return;
    libraryStatus.textContent = "載入 Photos 中...";
    try {
      const body = await fetch(apiUrl("/api/photo-library/months/" + encodeURIComponent(year) + "/" + encodeURIComponent(month)), { cache: "no-store", headers: headers() }).then(readJson);
      const items = (body.items || []).filter((item) => item.type === "photo");
      libraryGrid.innerHTML = items.map((item) => {
        const id = item.assetId || item.id || "";
        const url = mediaUrl(item.thumbnailUrl || item.displayUrl || item.originalUrl, item.updatedAt || id);
        return '<button class="media-card' + (selectedLibraryImages.has(id) ? ' active' : '') + '" type="button" data-library-id="' + esc(id) + '">'
          + '<img src="' + esc(url) + '" alt="' + esc(item.fileName || id) + '" loading="lazy">'
        + '</button>';
      }).join("");
      libraryStatus.textContent = "可插入照片 " + items.length + " 張。";
      libraryStatus.className = "status";
    } catch (error) {
      libraryStatus.textContent = error.message;
      libraryStatus.className = "status error";
    }
  }

  async function loadCards() {
    try {
      const body = await fetch(apiUrl("/api/wife-journal/cards"), { cache: "no-store", headers: headers() }).then(readJson);
      cards = Array.isArray(body.cards) ? body.cards : [];
      cardOptions.innerHTML = cards.map((card) => {
        const name = card.name || card.cardName || card.title || card.label || card.id || "";
        return '<option value="' + esc(name) + '"></option>';
      }).join("");
    } catch (_error) {
      cards = [];
    }
  }

  async function connect() {
    apiBase = apiBaseInput.value.trim().replace(/\/+$/, "") || defaultApiBase;
    apiToken = tokenInput.value.trim();
    localStorage.setItem("emilyhome.apiBase", apiBase);
    if (apiToken) localStorage.setItem("emilyhome.token", apiToken);
    else localStorage.removeItem("emilyhome.token");
    gateStatus.textContent = "連線中...";
    try {
      await loadEntries();
      await loadLibrarySummary();
      await loadCards();
      showApp();
    } catch (error) {
      showGate(friendlyConnectionError(error), true);
    }
  }

  tagPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tag]");
    if (!button) return;
    const selected = new Set(parseTags());
    if (selected.has(button.dataset.tag)) selected.delete(button.dataset.tag);
    else selected.add(button.dataset.tag);
    setTags(Array.from(selected));
  });

  libraryYear.addEventListener("change", syncLibraryMonths);
  document.getElementById("loadLibraryBtn").addEventListener("click", loadLibraryMonth);
  libraryGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-library-id]");
    if (!card) return;
    const id = card.dataset.libraryId;
    if (selectedLibraryImages.has(id)) selectedLibraryImages.delete(id);
    else selectedLibraryImages.set(id, true);
    card.classList.toggle("active", selectedLibraryImages.has(id));
  });

  entryListEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-id]");
    if (button) openEntry(button.dataset.openId);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    statusEl.textContent = "寫入 NAS 中...";
    statusEl.className = "status";
    try {
      const data = new FormData(form);
      selectedLibraryImages.forEach((_value, id) => data.append("libraryImageIds", id));
      const matchedCard = cards.find((card) => {
        const name = card.name || card.cardName || card.title || card.label || card.id || "";
        return name === form.elements.cardName.value;
      });
      if (matchedCard) {
        data.set("cardId", matchedCard.id || matchedCard.cardId || matchedCard.key || form.elements.cardName.value);
        data.set("cardDeck", matchedCard.deck || matchedCard.type || "");
      }
      const body = await fetch(apiUrl("/api/wife-journal/entries"), { method: "POST", headers: headers(), body: data }).then(readJson);
      statusEl.className = "status ok";
      statusEl.textContent = "已寫入 NAS：" + body.entry.title;
      form.reset();
      form.elements.date.valueAsDate = new Date();
      selectedLibraryImages.clear();
      renderTagPicker();
      await loadEntries();
    } catch (error) {
      statusEl.className = "status error";
      statusEl.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById("connectBtn").addEventListener("click", connect);
  document.getElementById("clearTokenBtn").addEventListener("click", () => {
    localStorage.removeItem("emilyhome.token");
    apiToken = "";
    tokenInput.value = "";
    showGate("已清除記住的 Token，請重新輸入。", false);
  });
  document.getElementById("refreshBtn").addEventListener("click", loadEntries);
  document.getElementById("jumpCreateBtn").addEventListener("click", () => document.getElementById("createCard").scrollIntoView({ behavior: "smooth" }));
  form.elements.date.valueAsDate = new Date();
  renderTagPicker();
})();
