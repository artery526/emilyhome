(function () {
  const defaultApiBase = "https://api.ark-os26.cc";
  const cardSheetUrl = "https://docs.google.com/spreadsheets/d/1GQBYT2jcNa9D6G39tntT5UfetXpgwfKYZ2h5fSy3bV8/edit";
  const tags = ["工作", "家人", "感情", "健康", "睡眠", "夢境", "感謝", "低潮"];
  const fallbackCards = ["0.愚者", "1.魔術師", "2.女祭司", "3.皇后", "4.國王 (皇帝)", "5.教皇 (大祭司)", "6.戀人", "7.戰車", "8.力量", "9.隱士", "10.命運之輪", "11.正義", "12.吊人", "13.死神", "14.節制", "15.惡魔", "16.塔", "17.星星", "18.月亮", "19.太陽", "20.審判", "21.世界"];
  const cardPositions = ["正位", "逆位"];
  const threePositions = ["過去 / 起點", "現在 / 核心", "未來 / 提醒"];
  const selectedLibraryImages = new Map();
  let entries = [];
  let cards = [];
  let activeDate = "";
  let drawMode = "single";
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
  const calendarTitle = document.getElementById("calendarTitle");
  const photoViewer = document.getElementById("photoViewer");
  const photoViewerImg = document.getElementById("photoViewerImg");
  const journalView = document.getElementById("journalView");
  const cardView = document.getElementById("cardView");
  const cardForm = document.getElementById("cardForm");
  const cardStatus = document.getElementById("cardStatus");
  const cardDrawFields = document.getElementById("cardDrawFields");
  const cardRecordList = document.getElementById("cardRecordList");
  const cardSheetLink = document.getElementById("cardSheetLink");

  apiBaseInput.value = apiBase;
  tokenInput.value = apiToken;
  cardSheetLink.href = cardSheetUrl;

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
      return "後端還沒更新或尚未重啟，請先重啟 ArkOS API 後再連線 🛠️";
    }
    if (message.includes("Admin access required") || message.includes("401")) {
      return "Token 沒有通過後端驗證，請確認輸入的是 ArkOS 後端目前使用的 ARKOS_UPLOAD_TOKEN 🔐";
    }
    if (message.includes("Wall read token is required")) {
      return "NAS Photos 讀取權限還沒通過，請重啟 ArkOS API 後再試一次 🖼️";
    }
    return "無法載入私密資料：" + (message || "連線失敗") + " 🌧️";
  }

  function mediaUrl(url, version) {
    if (!url) return "";
    const absolute = /^https?:\/\//i.test(url) ? url : apiUrl(url);
    const params = ["v=" + encodeURIComponent(version || Date.now())];
    if (apiToken) params.push("readToken=" + encodeURIComponent(apiToken));
    return absolute + (absolute.indexOf("?") >= 0 ? "&" : "?") + params.join("&");
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

  function entriesForTimeline() {
    const moodEntries = entries.filter((entry) => entry.type !== "card" && !entry.cardOnly);
    return activeDate ? moodEntries.filter((entry) => entry.date === activeDate) : moodEntries;
  }

  function cardEntries() {
    return entries.filter((entry) => entry.type === "card" || entry.cardOnly || entry.cardDraw);
  }

  function renderEntries() {
    const visibleEntries = entriesForTimeline();
    if (!visibleEntries.length) {
      entryListEl.innerHTML = '<p class="muted">' + (activeDate ? esc(activeDate) + ' 沒有心情日記 🐰' : '目前還沒有心情日記 🐰') + '</p>';
      return;
    }
    entryListEl.innerHTML = visibleEntries.map((entry) => {
      const cover = mediaUrl(entry.coverImageUrl, entry.updatedAt || entry.id);
      const visibility = entry.visibility === "password" ? "私密密碼" : (entry.visibility === "locked" ? "上鎖" : "一般");
      return '<article class="entry">'
        + (cover ? '<button class="cover-button" type="button" data-view-url="' + esc(cover) + '"><img class="cover" src="' + esc(cover) + '" alt=""></button>' : '<div class="cover"></div>')
        + '<div>'
          + '<div class="entry-title">' + esc(entry.title || "今天的心情") + '</div>'
          + '<div class="entry-meta">' + esc(entry.date || "") + ' · ' + esc(entry.mood || "") + ' · ' + visibility + '</div>'
          + '<div class="entry-meta">' + esc(entry.excerpt || "") + '</div>'
          + '<div class="toolbar"><button type="button" data-edit-id="' + esc(entry.id) + '">✏️ 編輯</button></div>'
        + '</div>'
      + '</article>';
    }).join("");
  }

  function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const byDate = entries.filter((entry) => entry.type !== "card" && !entry.cardOnly).reduce((map, entry) => {
      map.set(entry.date, (map.get(entry.date) || 0) + 1);
      return map;
    }, new Map());
    const firstDay = new Date(year, month, 1).getDay();
    const leadingBlanks = (firstDay + 6) % 7;
    const weekdayNames = ["一", "二", "三", "四", "五", "六", "日"];
    calendarTitle.textContent = "🌙 " + String(month + 1) + "月時光長廊";
    const head = weekdayNames.map((name, index) => '<div class="weekday' + (index >= 5 ? ' weekend' : '') + '">週' + name + '</div>');
    const blanks = Array.from({ length: leadingBlanks }, () => '<div class="day"></div>');
    const dayCells = Array.from({ length: days }, (_unused, index) => {
      const day = index + 1;
      const date = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
      const weekday = new Date(year, month, day).getDay();
      const isWeekend = weekday === 0 || weekday === 6;
      const count = byDate.get(date) || 0;
      const dots = count ? '<div class="dot-row">' + Array.from({ length: Math.min(count, 6) }, () => '<span class="dot"></span>').join("") + (count > 6 ? '<span class="entry-meta">+' + (count - 6) + '</span>' : '') + '</div>' : '';
      return '<button type="button" class="day' + (isWeekend ? ' weekend' : '') + (count ? ' has-entry' : '') + (activeDate === date ? ' active' : '') + '" data-date="' + date + '">' + day + dots + '</button>';
    });
    calendarEl.innerHTML = head.concat(blanks, dayCells).join("");
  }

  async function loadEntries() {
    entryListEl.innerHTML = '<p class="muted">載入中... ✨</p>';
    const body = await fetch(apiUrl("/api/wife-journal/entries"), { cache: "no-store", headers: headers() }).then(readJson);
    entries = Array.isArray(body.entries) ? body.entries : [];
    renderEntries();
    renderCalendar();
    renderCardRecords();
  }

  function markdownBody(markdown) {
    return String(markdown || "").replace(/^---[\s\S]*?---\s*/, "").trim();
  }

  function openPhoto(url) {
    if (!url) return;
    photoViewerImg.src = url;
    photoViewer.showModal();
  }

  function mediaPreview(item, index) {
    const key = item.libraryId || item.legacyLibraryId || item.fileName || item.url || item.originalUrl || item.thumbnailUrl || "";
    if (item.type === "audio") {
      return '<div class="edit-media-card">'
        + '<label><input type="checkbox" name="removeMedia" value="' + esc(key) + '"> 移除語音 ' + (index + 1) + '</label>'
        + '<audio controls src="' + esc(mediaUrl(item.url || "", item.updatedAt || key)) + '"></audio>'
      + '</div>';
    }
    const thumb = mediaUrl(item.thumbnailUrl || item.originalUrl || "", item.updatedAt || key);
    const original = mediaUrl(item.originalUrl || item.thumbnailUrl || "", item.updatedAt || key);
    return '<div class="edit-media-card">'
      + '<button class="media-card" type="button" data-view-url="' + esc(original) + '"><img src="' + esc(thumb) + '" alt=""></button>'
      + '<label><input type="checkbox" name="removeMedia" value="' + esc(key) + '"> 移除照片</label>'
    + '</div>';
  }

  async function openEditEntry(id) {
    detailEl.textContent = "讀取中... 📖";
    try {
      let url = apiUrl("/api/wife-journal/entries/" + encodeURIComponent(id));
      const entry = entries.find((item) => item.id === id);
      if (entry && entry.visibility === "password") {
        const password = window.prompt("請輸入這篇文章的私密密碼");
        if (!password) {
            detailEl.textContent = "已取消開啟私密文章 🔐";
          return;
        }
        url += "?password=" + encodeURIComponent(password);
      }
      const body = await fetch(url, { cache: "no-store", headers: headers() }).then(readJson);
      const loaded = body.entry || {};
      detailEl.innerHTML = '<form id="editEntryForm" class="form-grid" data-entry-id="' + esc(loaded.id) + '">'
        + '<label>標題<input name="title" value="' + esc(loaded.title || "") + '"></label>'
        + '<label>文章權限<select name="visibility">'
          + '<option value="normal"' + (loaded.visibility === "normal" ? " selected" : "") + '>一般</option>'
          + '<option value="locked"' + (loaded.visibility === "locked" ? " selected" : "") + '>上鎖</option>'
          + '<option value="password"' + (loaded.visibility === "password" ? " selected" : "") + '>私密密碼</option>'
        + '</select></label>'
        + '<label>心情<input name="mood" value="' + esc(loaded.mood || "") + '"></label>'
        + '<label>私密密碼<input name="entryPassword" type="password" placeholder="要更換密碼時填寫"></label>'
        + '<label class="full">快速標籤<input name="tags" value="' + esc((loaded.tags || []).join(",")) + '"></label>'
        + '<label class="full">日記內容<textarea name="content">' + esc(markdownBody(body.markdown || "")) + '</textarea></label>'
        + '<div class="full"><h3>照片與語音</h3><div class="edit-media-grid">' + ((loaded.media || []).map(mediaPreview).join("") || '<p class="muted">沒有附件</p>') + '</div></div>'
        + '<label>新增照片<input name="media" type="file" accept="image/*,.heic,.heif" multiple></label>'
        + '<label>新增語音<input name="media" type="file" accept="audio/*,.m4a,.mp3,.wav,.webm" multiple></label>'
        + '<button class="primary full" type="submit">🧸 儲存編輯</button>'
      + '</form>';
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
      libraryStatus.textContent = options.length ? "選擇年月後載入 NAS Photos 🖼️" : "尚未建立 Photos 索引 🌙";
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
    libraryStatus.textContent = "載入 Photos 中... 🖼️";
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
      libraryStatus.textContent = "可插入照片 " + items.length + " 張 ✨";
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
      const optionCards = cards.length ? cards : fallbackCards.map((name) => ({ name }));
      cardOptions.innerHTML = optionCards.map((card) => {
        const name = card.name || card.cardName || card.title || card.label || card.id || "";
        return '<option value="' + esc(name) + '"></option>';
      }).join("");
    } catch (_error) {
      cards = fallbackCards.map((name) => ({ name }));
      cardOptions.innerHTML = fallbackCards.map((name) => '<option value="' + esc(name) + '"></option>').join("");
    }
    renderCardDrawFields();
  }

  function setView(view) {
    const next = view === "cards" ? "cards" : "journal";
    journalView.hidden = next !== "journal";
    cardView.hidden = next !== "cards";
    document.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === next);
    });
  }

  function cardNameOptions() {
    const names = cards.map((card) => card.name || card.cardName || card.title || card.label || card.id || "").filter(Boolean);
    return (names.length ? names : fallbackCards).map((name) => '<option value="' + esc(name) + '">' + esc(name) + '</option>').join("");
  }

  function cardPositionOptions(selected) {
    return '<option value="">未指定</option>' + cardPositions.map((position) => (
      '<option value="' + esc(position) + '"' + (selected === position ? " selected" : "") + '>' + esc(position) + '</option>'
    )).join("");
  }

  function renderCardDrawFields() {
    if (!cardDrawFields) return;
    const count = drawMode === "three" ? 3 : 1;
    cardDrawFields.innerHTML = Array.from({ length: count }, (_unused, index) => {
      const label = drawMode === "three" ? threePositions[index] : "單張";
      return '<div class="card-draw-set">'
        + '<strong>' + esc(label) + '</strong>'
        + '<label>牌卡<input name="cardName' + index + '" list="cardOptions" placeholder="選擇或輸入牌名"></label>'
        + '<label>正逆位<select name="cardPosition' + index + '">' + cardPositionOptions("") + '</select></label>'
      + '</div>';
    }).join("");
  }

  function setDrawMode(mode) {
    drawMode = mode === "three" ? "three" : "single";
    document.querySelectorAll("[data-draw-mode]").forEach((button) => {
      button.classList.toggle("active", button.dataset.drawMode === drawMode);
    });
    renderCardDrawFields();
  }

  function splitCardLabel(label) {
    const raw = String(label || "").trim();
    const match = raw.match(/^(\d+)\.(.+)$/);
    return {
      id: match ? match[1] : "",
      name: match ? match[2].trim() : raw,
      label: raw,
    };
  }

  function collectCardDraws(sourceForm) {
    const count = drawMode === "three" ? 3 : 1;
    return Array.from({ length: count }, (_unused, index) => {
      const rawName = sourceForm.elements["cardName" + index]?.value || "";
      const position = sourceForm.elements["cardPosition" + index]?.value || "";
      const parsed = splitCardLabel(rawName);
      return {
        positionIndex: index + 1,
        positionName: drawMode === "three" ? threePositions[index] : "單張",
        cardId: parsed.id,
        cardName: parsed.name || rawName || "未抽取",
        cardLabel: parsed.label || rawName || "未抽取",
        orientation: position,
        displayName: (parsed.name || rawName || "未抽取") + (position ? position : ""),
      };
    });
  }

  function renderCardRecords() {
    const records = cardEntries();
    if (!cardRecordList) return;
    if (!records.length) {
      cardRecordList.innerHTML = '<p class="muted">目前還沒有卡牌記錄 🔮</p>';
      return;
    }
    cardRecordList.innerHTML = records.map((entry) => {
      const draw = entry.cardDraw || {};
      const drawCards = Array.isArray(draw.cards) && draw.cards.length
        ? draw.cards
        : [{ displayName: [draw.cardName, draw.position].filter(Boolean).join("") || "未抽取" }];
      const chips = drawCards.map((card) => '<span class="chip">' + esc(card.positionName ? card.positionName + "：" + card.displayName : card.displayName) + '</span>').join("");
      return '<article class="card-record">'
        + '<div class="entry-title">' + esc(entry.title || "卡牌記錄") + '</div>'
        + '<div class="entry-meta">' + esc(entry.date || "") + ' · ' + esc(draw.spreadType || (drawCards.length >= 3 ? "三張" : "單張")) + '</div>'
        + '<div class="chip-row">' + chips + '</div>'
        + '<div class="entry-meta">' + esc(draw.question || entry.excerpt || "") + '</div>'
      + '</article>';
    }).join("");
  }

  async function connect() {
    apiBase = apiBaseInput.value.trim().replace(/\/+$/, "") || defaultApiBase;
    apiToken = tokenInput.value.trim();
    localStorage.setItem("emilyhome.apiBase", apiBase);
    if (apiToken) localStorage.setItem("emilyhome.token", apiToken);
    else localStorage.removeItem("emilyhome.token");
    gateStatus.textContent = "連線中... 🌙";
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

  calendarEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-date]");
    if (!button) return;
    activeDate = activeDate === button.dataset.date ? "" : button.dataset.date;
    renderCalendar();
    renderEntries();
  });

  entryListEl.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-url]");
    if (viewButton) {
      openPhoto(viewButton.dataset.viewUrl);
      return;
    }
    const button = event.target.closest("[data-edit-id]");
    if (button) openEditEntry(button.dataset.editId);
  });

  detailEl.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-url]");
    if (viewButton) openPhoto(viewButton.dataset.viewUrl);
  });

  detailEl.addEventListener("submit", async (event) => {
    const editForm = event.target.closest("#editEntryForm");
    if (!editForm) return;
    event.preventDefault();
    const button = editForm.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "儲存中... ✨";
    try {
      const data = new FormData(editForm);
      editForm.querySelectorAll("input[name='removeMedia']:checked").forEach((input) => {
        data.append("removeMedia", input.value);
      });
      const body = await fetch(apiUrl("/api/wife-journal/entries/" + encodeURIComponent(editForm.dataset.entryId)), {
        method: "PUT",
        headers: headers(),
        body: data,
      }).then(readJson);
      detailEl.innerHTML = '<p class="status ok">已更新：' + esc(body.entry.title || "心情日記") + ' ✨</p>';
      await loadEntries();
    } catch (error) {
      button.disabled = false;
      button.textContent = "🧸 儲存編輯";
      detailEl.insertAdjacentHTML("beforeend", '<p class="status error">' + esc(error.message) + '</p>');
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
      statusEl.textContent = "記錄中... 🧸";
    statusEl.className = "status";
    try {
      const data = new FormData(form);
      selectedLibraryImages.forEach((_value, id) => data.append("libraryImageIds", id));
      const body = await fetch(apiUrl("/api/wife-journal/entries"), { method: "POST", headers: headers(), body: data }).then(readJson);
      statusEl.className = "status ok";
      statusEl.textContent = "已記錄：" + body.entry.title + " ✨";
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
  document.getElementById("closePhotoViewer").addEventListener("click", () => photoViewer.close());
  document.getElementById("clearTokenBtn").addEventListener("click", () => {
    localStorage.removeItem("emilyhome.token");
    apiToken = "";
    tokenInput.value = "";
    showGate("已清除記住的 Token，請重新輸入 🧹", false);
  });
  document.getElementById("refreshBtn").addEventListener("click", loadEntries);
  document.getElementById("jumpCreateBtn").addEventListener("click", () => document.getElementById("createCard").scrollIntoView({ behavior: "smooth" }));
  document.getElementById("jumpCardsBtn").addEventListener("click", () => {
    setView("cards");
    document.getElementById("cardView").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  document.querySelectorAll("[data-draw-mode]").forEach((button) => {
    button.addEventListener("click", () => setDrawMode(button.dataset.drawMode));
  });
  cardForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = cardForm.querySelector("button[type='submit']");
    const data = new FormData();
    const cardsDrawn = collectCardDraws(cardForm);
    const date = cardForm.elements.date.value;
    const time = cardForm.elements.time.value;
    const question = cardForm.elements.cardQuestion.value.trim();
    const reading = cardForm.elements.cardReading.value.trim();
    const spreadType = drawMode === "three" ? "三張" : "單張";
    data.set("type", "card");
    data.set("date", date);
    data.set("time", time);
    data.set("title", "🔮 " + spreadType + "卡牌記錄");
    data.set("content", [question, reading].filter(Boolean).join("\n\n") || spreadType + "卡牌記錄");
    data.set("cardQuestion", question);
    data.set("cardReading", reading);
    data.set("drawType", drawMode);
    data.set("spreadType", spreadType);
    data.set("cards", JSON.stringify(cardsDrawn));
    data.set("cardName", cardsDrawn.map((card) => card.displayName).join("、"));
    data.set("cardPosition", drawMode === "three" ? "三張" : (cardsDrawn[0]?.orientation || ""));
    data.set("cardId", cardsDrawn[0]?.cardId || "");
    button.disabled = true;
    cardStatus.className = "status";
    cardStatus.textContent = "卡牌記錄中... 🔮";
    try {
      const body = await fetch(apiUrl("/api/wife-journal/card-records"), { method: "POST", headers: headers(), body: data }).then(readJson);
      cardStatus.className = "status ok";
      cardStatus.textContent = "已記錄：" + (body.entry.title || "卡牌記錄") + " ✨";
      cardForm.reset();
      cardForm.elements.date.valueAsDate = new Date();
      cardForm.elements.time.value = currentTime();
      setDrawMode("single");
      await loadEntries();
    } catch (error) {
      cardStatus.className = "status error";
      cardStatus.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });
  function currentTime() {
    const now = new Date();
    return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
  }
  form.elements.date.valueAsDate = new Date();
  cardForm.elements.date.valueAsDate = new Date();
  cardForm.elements.time.value = currentTime();
  renderCardDrawFields();
  renderTagPicker();
})();
