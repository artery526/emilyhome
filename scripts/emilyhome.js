(function () {
  const defaultApiBase = "https://api.ark-os26.cc";
  const cardSheetUrl = "https://docs.google.com/spreadsheets/d/1GQBYT2jcNa9D6G39tntT5UfetXpgwfKYZ2h5fSy3bV8/edit";
  const tags = ["工作", "家人", "感情", "健康", "睡眠", "夢境", "感謝", "低潮"];
  const fallbackCards = [
    { name: "0.愚者", imageUrl: "https://drive.google.com/file/d/1O_yGudgr5djUHNnN8o5K2x44yBj2lTgi/view?usp=sharing" },
    { name: "1.魔術師", imageUrl: "https://drive.google.com/file/d/1FC_pBu_ebjJDg73AV0dhUT3xL5ekiIjA/view?usp=drive_link" },
    { name: "2.女祭司", imageUrl: "https://drive.google.com/file/d/1SC2rvYoz-GvLgG30EEEXwjvYLQOeNEVB/view?usp=drive_link" },
    { name: "3.皇后", imageUrl: "https://drive.google.com/file/d/1cl3A9S_eNZW7zEc6XcCtzsjz9TUpTBn4/view?usp=drive_link" },
    { name: "4.國王 (皇帝)", imageUrl: "https://drive.google.com/file/d/1xkQq3nj_83ZIrm5JcE8mv-4HjQ7duif3/view?usp=drive_link" },
    { name: "5.教皇 (大祭司)", imageUrl: "https://drive.google.com/file/d/1jmejV1tA-cW6mroX5IBBAf1nu5JN8ueH/view?usp=drive_link" },
    { name: "6.戀人", imageUrl: "https://drive.google.com/file/d/189AGSNrCyXzIZ1I1N9i10iwnzYooRA3O/view?usp=drive_link" },
    { name: "7.戰車", imageUrl: "https://drive.google.com/file/d/1ub4yHtkYs42C6Wm0ezcgUF3BaxzYAKuD/view?usp=drive_link" },
    { name: "8.力量", imageUrl: "https://drive.google.com/file/d/1z4IUT0iLwEfAhQGyOHWbTJmUxMsyovdU/view?usp=drive_link" },
    { name: "9.隱士", imageUrl: "https://drive.google.com/file/d/1n3a6DkU3YWiKEUHQdUA3N5c_lsR2BD1L/view?usp=drive_link" },
    { name: "10.命運之輪", imageUrl: "https://drive.google.com/file/d/1Y9Doxcp-9E1VkCTa30BOZxqKsBn9CUnp/view?usp=drive_link" },
    { name: "11.正義", imageUrl: "https://drive.google.com/file/d/158tyh-meBs6_qShphsSgzVjUxiq-rzW_/view?usp=drive_link" },
    { name: "12.吊人", imageUrl: "https://drive.google.com/file/d/1gJoy6BSCUSKMuW8kqJB5Ss8fnN1BPZAq/view?usp=drive_link" },
    { name: "13.死神", imageUrl: "https://drive.google.com/file/d/1coH_YuKumjnkMkMiIpINGwDEMWzkf3RN/view?usp=drive_link" },
    { name: "14.節制", imageUrl: "https://drive.google.com/file/d/1ebmTdCqP7vJFW78omoeYGkjcVKlyO54q/view?usp=drive_link" },
    { name: "15.惡魔", imageUrl: "https://drive.google.com/file/d/12CHiGXVMqPyAfx90YhQaEAqC-XcWDIhV/view?usp=drive_link" },
    { name: "16.高塔", imageUrl: "https://drive.google.com/file/d/1ZNzXTpIiukBGtFg_Hcg0P01LfTFdI1la/view?usp=drive_link" },
    { name: "17.星星", imageUrl: "https://drive.google.com/file/d/1p_RGgkijJc_h-SFHGSBhnGGRNt2GB33V/view?usp=drive_link" },
    { name: "18.月亮", imageUrl: "https://drive.google.com/file/d/1Xz2yY2qp3PzIyMDO8FYnkC0gnsGgD46r/view?usp=drive_link" },
    { name: "19.太陽", imageUrl: "https://drive.google.com/file/d/1B5a6O_uGQCKqj1dKDMVGicsmbGm3LC7k/view?usp=drive_link" },
    { name: "20.審判", imageUrl: "https://drive.google.com/file/d/1N5UIs7l3jE2leQVjx-mz8pPqCnqxAycF/view?usp=drive_link" },
    { name: "21.世界", imageUrl: "https://drive.google.com/file/d/1OL_zdMsd-wlOQ72VyuhT2bhF4SyOeiVN/view?usp=drive_link" },
    { name: "22.權杖1", imageUrl: "https://drive.google.com/file/d/1eiV9YHgi5ruNn8pMYKF5knhPKYYii_c3/view?usp=drive_link" },
    { name: "23.權杖2", imageUrl: "https://drive.google.com/file/d/1VTcLMTzhUX0L30OwiYLu592v17fL4e2A/view?usp=drive_link" },
    { name: "24.權杖3", imageUrl: "https://drive.google.com/file/d/1nBDCEIuXrNDUZW3pYr15EeiaVekR7fO9/view?usp=drive_link" },
    { name: "25.權杖4", imageUrl: "https://drive.google.com/file/d/1n1F_HQvAXvsMUW5RynqmTu55PcMKDwVc/view?usp=drive_link" },
    { name: "26.權杖5", imageUrl: "https://drive.google.com/file/d/1mXgJuOnuWig7A7zCGSCLMtIDKV149G4Q/view?usp=drive_link" },
    { name: "27.權杖6", imageUrl: "https://drive.google.com/file/d/1zMMYSLxl7jLFdw01PBnxnwS2fS2K_DKs/view?usp=drive_link" },
    { name: "28.權杖7", imageUrl: "https://drive.google.com/file/d/1tWZklWXt76vza2rgKdgE7rQPGLr5Dgsx/view?usp=drive_link" },
    { name: "29.權杖8", imageUrl: "https://drive.google.com/file/d/1otkooIEpsxEw9IblX7FGbz-irS2jlfMU/view?usp=drive_link" },
    { name: "30.權杖9", imageUrl: "https://drive.google.com/file/d/1Qfc5useWxmQ9W_jsV50aReEnZ6nlLmNp/view?usp=drive_link" },
    { name: "31.權杖10", imageUrl: "https://drive.google.com/file/d/1cgctCzSIfP4b6qZWAzu0DCRw0O_HHHxq/view?usp=drive_link" },
    { name: "32.權杖侍從", imageUrl: "https://drive.google.com/file/d/1fJKsHL5PwMwCL5tiIwFTEfAXvLsvPdym/view?usp=drive_link" },
    { name: "33.權杖騎士", imageUrl: "https://drive.google.com/file/d/1Au8Xvp-sbWzJ_WC0DEPM9DZ67eo8X3uZ/view?usp=drive_link" },
    { name: "34.權杖皇后", imageUrl: "https://drive.google.com/file/d/1iZ7iy2lvxxvIPndek_Hv4Sdp2HnRlwVt/view?usp=drive_link" },
    { name: "35.權杖國王", imageUrl: "https://drive.google.com/file/d/1cVc2UccSGxgdNMi_UOHilLzOTbtWMxfW/view?usp=drive_link" },
    { name: "36.聖杯1", imageUrl: "https://drive.google.com/file/d/1NqRQQCFfXzRJh7cJ6gcj80f5QhmqkF_M/view?usp=drive_link" },
    { name: "37.聖杯2", imageUrl: "https://drive.google.com/file/d/1mw2Hx5zwBRRSkiD0Ag07IW-4WDThcIFz/view?usp=drive_link" },
    { name: "38.聖杯3", imageUrl: "https://drive.google.com/file/d/1RkpG5kfmH9qZ9NDU5KVa0D74Eo32fS9O/view?usp=drive_link" },
    { name: "39.聖杯4", imageUrl: "https://drive.google.com/file/d/1dSmm1xB9Ivolt3FXAjJTtETxOpmefobI/view?usp=drive_link" },
    { name: "40.聖杯5", imageUrl: "https://drive.google.com/file/d/171cwyNg94hHFongwO26Ih9UDedP72ILx/view?usp=drive_link" },
    { name: "41.聖杯6", imageUrl: "https://drive.google.com/file/d/1ibtJ1WjegXczTrBm3TAKKPYhTtvsE4_V/view?usp=drive_link" },
    { name: "42.聖杯7", imageUrl: "https://drive.google.com/file/d/1R7evsnB_gAa9ePtWUqeoYGnZixwKrNjL/view?usp=drive_link" },
    { name: "43.聖杯8", imageUrl: "https://drive.google.com/file/d/17u5Lk8jqx-T6M1cwIfITy_WzrYqnZf13/view?usp=drive_link" },
    { name: "44.聖杯9", imageUrl: "https://drive.google.com/file/d/1PUXbW8rp5x5l2oNu3975lgy3CLaIKCeO/view?usp=drive_link" },
    { name: "45.聖杯10", imageUrl: "https://drive.google.com/file/d/1YtaQ6n--lGD_ldkpBNsNcpmdBlDa3-YP/view?usp=drive_link" },
    { name: "46.聖杯侍從", imageUrl: "https://drive.google.com/file/d/1Yc0DITXo38qTs4izmt-PI-Xq6ftJCS_9/view?usp=drive_link" },
    { name: "47.聖杯騎士", imageUrl: "https://drive.google.com/file/d/13FIH9UcEmxShbT1HzKJ2ntB7R0a3uAJ6/view?usp=drive_link" },
    { name: "48.聖杯皇后", imageUrl: "https://drive.google.com/file/d/1Ivz69dpzyrK0IP3Njs51O-tAZXLExU2A/view?usp=drive_link" },
    { name: "49.聖杯國王", imageUrl: "https://drive.google.com/file/d/1iFoVUx5fKlqghi1YDUax3puqJnv_wrlU/view?usp=drive_link" },
    { name: "50.寶劍1", imageUrl: "https://drive.google.com/file/d/1lGGzdOM8W1nGq1ePWDdBQuC-TydWQ_IN/view?usp=drive_link" },
    { name: "51.寶劍2", imageUrl: "https://drive.google.com/file/d/11Axf3XfSlLOGX9YnUr4v3nKLYuAGNBmK/view?usp=drive_link" },
    { name: "52.寶劍3", imageUrl: "https://drive.google.com/file/d/12_1v-YVmJOpI7qRcewAa6yEOo_R4e0se/view?usp=drive_link" },
    { name: "53.寶劍4", imageUrl: "https://drive.google.com/file/d/15hrgHfNbMKIacsFEGRa_GDhd3MfvOQC1/view?usp=drive_link" },
    { name: "54.寶劍5", imageUrl: "https://drive.google.com/file/d/1w4xg50Uc6Pg1CD6s_5pOoxoH8JBL8r4D/view?usp=drive_link" },
    { name: "55.寶劍6", imageUrl: "https://drive.google.com/file/d/1OphjloBMDJ5td50cjrEFlYR0oHkYe1k8/view?usp=drive_link" },
    { name: "56.寶劍7", imageUrl: "https://drive.google.com/file/d/19POa-nnYETWZoKaprg_zjR0Cxw3qkDy0/view?usp=drive_link" },
    { name: "57.寶劍8", imageUrl: "https://drive.google.com/file/d/1DMd9gq2R2fBv6JhtaX1kSZUrqiCmSqXq/view?usp=drive_link" },
    { name: "58.寶劍9", imageUrl: "https://drive.google.com/file/d/1tQZpd9xvTSKS_aUxB4w2lavbTzSWp_db/view?usp=drive_link" },
    { name: "59.寶劍10", imageUrl: "https://drive.google.com/file/d/1Xy4wu81N0gwmtLZGz1TRIkv9_ncEEeLa/view?usp=drive_link" },
    { name: "60.寶劍侍從", imageUrl: "https://drive.google.com/file/d/1h9KsEoBwVJxa68gkGU9F98-xfnHE0yO8/view?usp=drive_link" },
    { name: "61.寶劍騎士", imageUrl: "https://drive.google.com/file/d/1w9hNUzAs8HHERkTNOyufHXSW458Wi3Fk/view?usp=drive_link" },
    { name: "62.寶劍皇后", imageUrl: "https://drive.google.com/file/d/1SKTg4Jvdkh2g8P90V722KYfmSS45kZju/view?usp=drive_link" },
    { name: "63.寶劍國王", imageUrl: "https://drive.google.com/file/d/14TO6ajNbn17n_8vfcwAcLDI4WtHYGSU9/view?usp=drive_link" },
    { name: "64.錢幣1", imageUrl: "https://drive.google.com/file/d/17coOsj32gKdTmG1FZPyVTjnbF-k0m14S/view?usp=drive_link" },
    { name: "65.錢幣2", imageUrl: "https://drive.google.com/file/d/1lLM7RgJnlQ4REso6iK-Q3-Agrohv-oiX/view?usp=drive_link" },
    { name: "66.錢幣3", imageUrl: "https://drive.google.com/file/d/1sBabjBAlsLnVLIpuQeoUB5b9lfZK4_TA/view?usp=drive_link" },
    { name: "67.錢幣4", imageUrl: "https://drive.google.com/file/d/1o24HB3m2DIPZ7WUTvbQg_cgiQTiSBTUr/view?usp=drive_link" },
    { name: "68.錢幣5", imageUrl: "https://drive.google.com/file/d/1JImkhttn7vZmV1y3rXw9457c9M_s6P4T/view?usp=drive_link" },
    { name: "69.錢幣6", imageUrl: "https://drive.google.com/file/d/1R34QlsYR0dPju1J6038e8pXBCFXHwOyv/view?usp=drive_link" },
    { name: "70.錢幣7", imageUrl: "https://drive.google.com/file/d/1er6ztuk0RBuVYD7GELqxFABd-D9GScYa/view?usp=drive_link" },
    { name: "71.錢幣8", imageUrl: "https://drive.google.com/file/d/1PMQacb47vsNaYrLZy80W4HVmcoRVZRdV/view?usp=drive_link" },
    { name: "72.錢幣9", imageUrl: "https://drive.google.com/file/d/1CLiSLE60hWZ0PB7WixdaDwMMsJjHqnHr/view?usp=drive_link" },
    { name: "73.錢幣10", imageUrl: "https://drive.google.com/file/d/1YSn7UMcVBYyVeV0e_LqzGbk7aOVAcCem/view?usp=drive_link" },
    { name: "74.錢幣侍從", imageUrl: "https://drive.google.com/file/d/17-m6LyJjR2mh77Vo36utjy--eqnLYch7/view?usp=drive_link" },
    { name: "75.錢幣騎士", imageUrl: "https://drive.google.com/file/d/18XwNaGPNtOpjco4nvriB4VLN1cNz_mA2/view?usp=drive_link" },
    { name: "76.錢幣皇后", imageUrl: "https://drive.google.com/file/d/1n_iA-ITqdRh0u5u0A84jJoIXW5x0u67x/view?usp=drive_link" },
    { name: "77.錢幣國王", imageUrl: "https://drive.google.com/file/d/1fYbX4Y96Ai9hNLIaeIOnMzxArtf0zo3n/view?usp=drive_link" },
  ];
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
      const meta = [entry.date || "", visibility].filter(Boolean).join(" · ");
      return '<article class="entry">'
        + (cover ? '<button class="cover-button" type="button" data-view-url="' + esc(cover) + '"><img class="cover" src="' + esc(cover) + '" alt=""></button>' : '<div class="cover"></div>')
        + '<div>'
          + '<div class="entry-title">' + esc(entry.title || "今天的心情") + '</div>'
          + '<div class="entry-meta">' + esc(meta) + '</div>'
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
      const apiCards = Array.isArray(body.cards) ? body.cards : [];
      cards = mergeCards(apiCards);
    } catch (_error) {
      cards = fallbackCards.slice();
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
    const optionNames = names.length ? names : fallbackCards.map((card) => card.name);
    return '<option value="">選擇牌卡</option>' + optionNames.map((name) => '<option value="' + esc(name) + '">' + esc(name) + '</option>').join("");
  }

  function mergeCards(apiCards) {
    const byName = new Map();
    fallbackCards.forEach((card) => {
      byName.set(cleanCardName(card.name), { ...card });
    });
    apiCards.forEach((card) => {
      const name = card.name || card.cardName || card.title || card.label || card.id || "";
      if (!name) return;
      const key = cleanCardName(name);
      byName.set(key, { ...(byName.get(key) || {}), ...card, name });
    });
    return Array.from(byName.values());
  }

  function cleanCardName(value) {
    return String(value || "").replace(/\u200B/g, "").replace(/^\d+\./, "").trim();
  }

  function driveImageUrl(url) {
    const raw = String(url || "").trim();
    if (!raw) return "";
    const match = raw.match(/drive\.google\.com\/file\/d\/([^/]+)/) || raw.match(/[?&]id=([^&]+)/);
    if (match) return "https://drive.google.com/thumbnail?id=" + encodeURIComponent(match[1]) + "&sz=w320";
    return raw;
  }

  function cardImageUrl(card) {
    if (!card) return "";
    return driveImageUrl(card.imageUrl || card.thumbnailUrl || card.image || card.cardImage || card.cardImageUrl || card.url || card.photoUrl || "");
  }

  function findCardByName(value) {
    const raw = String(value || "").trim();
    const clean = cleanCardName(raw);
    return cards.find((card) => {
      const names = [card.name, card.cardName, card.title, card.label, card.id, card.cardId].map((item) => String(item || "").trim()).filter(Boolean);
      return names.some((name) => name === raw || cleanCardName(name) === clean);
    }) || null;
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
        + '<div class="card-preview">'
          + '<div class="card-thumb" data-card-thumb="' + index + '">🃏</div>'
          + '<strong data-card-preview-name="' + index + '">' + esc(label) + '</strong>'
        + '</div>'
        + '<label>牌卡<select name="cardName' + index + '">' + cardNameOptions() + '</select></label>'
        + '<label>正逆位<select name="cardPosition' + index + '">' + cardPositionOptions("") + '</select></label>'
      + '</div>';
    }).join("");
    updateCardPreviews();
  }

  function updateCardPreview(index) {
    if (!cardDrawFields) return;
    const input = cardDrawFields.querySelector('[name="cardName' + index + '"]');
    const thumb = cardDrawFields.querySelector('[data-card-thumb="' + index + '"]');
    const nameEl = cardDrawFields.querySelector('[data-card-preview-name="' + index + '"]');
    if (!input || !thumb || !nameEl) return;
    const card = findCardByName(input.value);
    const label = cleanCardName(input.value) || (drawMode === "three" ? threePositions[index] : "單張");
    const url = cardImageUrl(card);
    nameEl.textContent = label;
    thumb.innerHTML = url ? '<img src="' + esc(url) + '" alt="' + esc(label) + '">' : "🃏";
  }

  function updateCardPreviews() {
    const count = drawMode === "three" ? 3 : 1;
    for (let index = 0; index < count; index += 1) updateCardPreview(index);
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
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  document.querySelectorAll("[data-draw-mode]").forEach((button) => {
    button.addEventListener("click", () => setDrawMode(button.dataset.drawMode));
  });
  cardDrawFields.addEventListener("input", (event) => {
    const match = String(event.target && event.target.name || "").match(/^cardName(\d+)$/);
    if (match) updateCardPreview(Number(match[1]));
  });
  cardDrawFields.addEventListener("change", (event) => {
    const match = String(event.target && event.target.name || "").match(/^cardName(\d+)$/);
    if (match) updateCardPreview(Number(match[1]));
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
