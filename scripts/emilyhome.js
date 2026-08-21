(function () {
  const defaultApiBase = "https://api.ark-os26.cc";
  const sheetAppUrl = "https://script.google.com/macros/s/AKfycbzRv_7W-jw-3PphYvyCRqRgbXhuMCaWQZPs1bgYgrTGQ0-ND2lCaQ9o39oZH6dHoPXr/exec";
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
  const entryUploadBatchSize = 12;
  const selectedLibraryImages = new Map();
  let entries = [];
  let cards = [];
  let oshoCards = [];
  let bodyRecords = [];
  let clientPeople = [];
  let clientRecords = [];
  let learningRecords = [];
  let learningSearchOpen = false;
  let learningSearchQuery = "";
  let photoZoom = 1;
  let activeClientId = "";
  let activeDate = "";
  let activeJournalMonth = "";
  let todos = [];
  let activeTodoDate = "";
  let timelineSearchOpen = false;
  let timelineSearchQuery = "";
  let activeCardMonth = "";
  let activeBodyDate = "";
  let entryReaderGallery = [];
  let photoGalleryItems = [];
  let photoGalleryIndex = 0;
  let photoTouchStartX = 0;
  let photoTouchStartY = 0;
  let bodyUnlocked = false;
  let bodyLockConfigured = false;
  let bodyPassword = "";
  let drawMode = "single";
  let librarySummaryLoaded = false;
  let cardsLoaded = false;
  let bodyLoaded = false;
  let apiBase = localStorage.getItem("emilyhome.apiBase") || defaultApiBase;
  let apiToken = localStorage.getItem("emilyhome.token") || "";
  let sheetToken = localStorage.getItem("emilyhome.sheetToken") || "";

  const gate = document.getElementById("gate");
  const app = document.getElementById("app");
  const siteHeader = document.getElementById("siteHeader");
  const brandMenuBtn = document.getElementById("brandMenuBtn");
  const logoNav = document.getElementById("logoNav");
  const gateSettingsBtn = document.getElementById("gateSettingsBtn");
  const gateSettings = document.getElementById("gateSettings");
  const toggleTokenInputBtn = document.getElementById("toggleTokenInputBtn");
  const tokenField = document.getElementById("tokenField");
  const gateHeroLoginBtn = document.getElementById("gateHeroLoginBtn");
  const gateSheetTokenInput = document.getElementById("gateSheetTokenInput");
  const gateStatus = document.getElementById("gateStatus");
  const apiBaseInput = document.getElementById("apiBaseInput");
  const tokenInput = document.getElementById("tokenInput");
  const entryListEl = document.getElementById("entryList");
  const timelineSearchBtn = document.getElementById("timelineSearchBtn");
  const timelineSearchPanel = document.getElementById("timelineSearchPanel");
  const timelineSearchInput = document.getElementById("timelineSearchInput");
  const timelineSearchClearBtn = document.getElementById("timelineSearchClearBtn");
  const calendarEl = document.getElementById("calendar");
  const journalYear = document.getElementById("journalYear");
  const journalMonth = document.getElementById("journalMonth");
  const todoForm = document.getElementById("todoForm");
  const todoList = document.getElementById("todoList");
  const todoStatus = document.getElementById("todoStatus");
  const todoSummaryCount = document.getElementById("todoSummaryCount");
  const todoSubmitBtn = document.getElementById("todoSubmitBtn");
  const todoCancelBtn = document.getElementById("todoCancelBtn");
  const todoRefreshBtn = document.getElementById("todoRefreshBtn");
  const createCard = document.getElementById("createCard");
  const form = document.getElementById("entryForm");
  const entryFormTitle = document.getElementById("entryFormTitle");
  const entrySubmitBtn = document.getElementById("entrySubmitBtn");
  const cancelEntryEditBtn = document.getElementById("cancelEntryEditBtn");
  const statusEl = document.getElementById("formStatus");
  const entryUploadStatus = document.getElementById("entryUploadStatus");
  const entryEditMedia = document.getElementById("entryEditMedia");
  const entryReaderDialog = document.getElementById("entryReaderDialog");
  const entryReaderContent = document.getElementById("entryReaderContent");
  const tagsInput = document.getElementById("tagsInput");
  const tagPicker = document.getElementById("tagPicker");
  const libraryGrid = document.getElementById("libraryGrid");
  const libraryStatus = document.getElementById("libraryStatus");
  const libraryPanel = document.getElementById("libraryPanel");
  const libraryYear = document.getElementById("libraryYear");
  const libraryMonth = document.getElementById("libraryMonth");
  const calendarTitle = document.getElementById("calendarTitle");
  const photoViewer = document.getElementById("photoViewer");
  const photoViewerImg = document.getElementById("photoViewerImg");
  const photoStage = document.getElementById("photoStage");
  const photoPrevBtn = document.getElementById("photoPrevBtn");
  const photoNextBtn = document.getElementById("photoNextBtn");
  const photoCounter = document.getElementById("photoCounter");
  const photoZoomInBtn = document.getElementById("photoZoomInBtn");
  const photoZoomOutBtn = document.getElementById("photoZoomOutBtn");
  const photoZoomResetBtn = document.getElementById("photoZoomResetBtn");
  const journalView = document.getElementById("journalView");
  const cardView = document.getElementById("cardView");
  const bodyView = document.getElementById("bodyView");
  const clientView = document.getElementById("clientView");
  const learningView = document.getElementById("learningView");
  const learningForm = document.getElementById("learningForm");
  const learningEntryList = document.getElementById("learningEntryList");
  const learningStatus = document.getElementById("learningStatus");
  const learningUploadStatus = document.getElementById("learningUploadStatus");
  const learningEditMedia = document.getElementById("learningEditMedia");
  const learningSubmitBtn = document.getElementById("learningSubmitBtn");
  const learningCancelBtn = document.getElementById("learningCancelBtn");
  const learningSearchBtn = document.getElementById("learningSearchBtn");
  const learningSearchPanel = document.getElementById("learningSearchPanel");
  const learningSearchInput = document.getElementById("learningSearchInput");
  const learningSearchClearBtn = document.getElementById("learningSearchClearBtn");
  const clientPeopleList = document.getElementById("clientPeopleList");
  const clientSearchInput = document.getElementById("clientSearchInput");
  const clientPersonForm = document.getElementById("clientPersonForm");
  const clientPeopleStatus = document.getElementById("clientPeopleStatus");
  const clientRecordsTitle = document.getElementById("clientRecordsTitle");
  const clientRecordForm = document.getElementById("clientRecordForm");
  const clientRecordList = document.getElementById("clientRecordList");
  const clientRecordStatus = document.getElementById("clientRecordStatus");
  const clientUploadStatus = document.getElementById("clientUploadStatus");
  const clientEditMedia = document.getElementById("clientEditMedia");
  const clientCardFields = document.getElementById("clientCardFields");
  const addClientCardBtn = document.getElementById("addClientCardBtn");
  const clientRefreshBtn = document.getElementById("clientRefreshBtn");
  const clientPersonDeleteBtn = document.getElementById("clientPersonDeleteBtn");
  const cardForm = document.getElementById("cardForm");
  const cardStatus = document.getElementById("cardStatus");
  const cardDrawFields = document.getElementById("cardDrawFields");
  const cardRecordList = document.getElementById("cardRecordList");
  const cardTimelineYear = document.getElementById("cardTimelineYear");
  const cardTimelineMonth = document.getElementById("cardTimelineMonth");
  const bodyYear = document.getElementById("bodyYear");
  const bodyMonth = document.getElementById("bodyMonth");
  const bodyCalendar = document.getElementById("bodyCalendar");
  const bodyCalendarTitle = document.getElementById("bodyCalendarTitle");
  const bodyStatus = document.getElementById("bodyStatus");
  const bodyForm = document.getElementById("bodyForm");
  const bodyImageInput = document.getElementById("bodyImageInput");
  const bodyImageStatus = document.getElementById("bodyImageStatus");
  const bodyRecordList = document.getElementById("bodyRecordList");
  const bodyDayTitle = document.getElementById("bodyDayTitle");
  const sheetTokenInput = document.getElementById("sheetTokenInput");
  const bodyPasswordInput = document.getElementById("bodyPasswordInput");
  const bodyNewPasswordInput = document.getElementById("bodyNewPasswordInput");

  apiBaseInput.value = apiBase;
  tokenInput.value = apiToken;
  sheetTokenInput.value = sheetToken;
  gateSheetTokenInput.value = sheetToken;
  updateEntryPasswordField(form);

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

  function currentSheetToken() {
    sheetToken = (gateSheetTokenInput.value.trim() || sheetTokenInput.value.trim());
    gateSheetTokenInput.value = sheetToken;
    sheetTokenInput.value = sheetToken;
    if (sheetToken) localStorage.setItem("emilyhome.sheetToken", sheetToken);
    else localStorage.removeItem("emilyhome.sheetToken");
    return sheetToken || apiToken;
  }

  function saveSheetToken(showMessage) {
    sheetToken = (gateSheetTokenInput.value.trim() || sheetTokenInput.value.trim());
    gateSheetTokenInput.value = sheetToken;
    sheetTokenInput.value = sheetToken;
    if (sheetToken) {
      localStorage.setItem("emilyhome.sheetToken", sheetToken);
      if (showMessage) {
        bodyStatus.className = "status ok";
        bodyStatus.textContent = "已記住試算表 Token，下次開啟會自動帶入 🔐";
      }
      return;
    }
    localStorage.removeItem("emilyhome.sheetToken");
    if (showMessage) {
      bodyStatus.className = "status";
      bodyStatus.textContent = "試算表 Token 欄位是空的，已清除本機記憶 🧹";
    }
  }

  function toggleSettingsPanel(buttonId, panelId) {
    const button = document.getElementById(buttonId);
    const panel = document.getElementById(panelId);
    if (!button || !panel) return;
    const nextHidden = !panel.hidden;
    panel.hidden = nextHidden;
    button.setAttribute("aria-expanded", String(!nextHidden));
  }

  function updateEntryPasswordField(targetForm) {
    const visibility = targetForm.elements.visibility && targetForm.elements.visibility.value;
    const passwordInput = targetForm.elements.entryPassword;
    if (!passwordInput) return;
    const locked = visibility === "password";
    const originalVisibility = targetForm.dataset.originalVisibility || "";
    const needsNewPassword = !targetForm.dataset.entryId || !["password", "locked"].includes(originalVisibility);
    passwordInput.closest("label").hidden = !locked;
    passwordInput.required = locked && needsNewPassword;
    passwordInput.placeholder = locked
      ? (needsNewPassword ? "輸入解鎖密碼，會同步到試算表" : "要更換密碼時再填寫")
      : "選擇上鎖後填寫";
    if (!locked) passwordInput.value = "";
  }

  function resetEntryFormMode(message, className) {
    form.reset();
    delete form.dataset.entryId;
    delete form.dataset.originalVisibility;
    entryFormTitle.textContent = "💌 新增心情日記";
    entrySubmitBtn.textContent = "🧸 記錄";
    cancelEntryEditBtn.hidden = true;
    entryEditMedia.hidden = true;
    entryEditMedia.innerHTML = "";
    entryUploadStatus.innerHTML = "";
    form.elements.date.valueAsDate = new Date();
    form.elements.time.value = currentTime();
    updateEntryPasswordField(form);
    selectedLibraryImages.clear();
    renderTagPicker();
    if (message) {
      statusEl.className = className || "status";
      statusEl.textContent = message;
    }
  }

  function journalPasswordSyncText(result) {
    if (!result || result.enabled === false || result.skipped) return "";
    if (result.ok) return " 解鎖密碼已同步到試算表 🔐";
    return " 但解鎖密碼沒有同步到試算表：" + (result.error || "未知錯誤");
  }

  async function syncJournalPasswordFromBrowser(entry, data, serverResult) {
    const visibility = String(data.get("visibility") || entry.visibility || "normal");
    const password = String(data.get("entryPassword") || "").trim();
    if (visibility !== "password" || !password) return { skipped: true };
    if (serverResult && serverResult.ok) return serverResult;
    try {
      const result = await sheetRequest("emilyJournalPasswordSave", {
        entryId: entry.id || entry.slug || "",
        date: data.get("date") || entry.date || "",
        time: data.get("time") || entry.time || "",
        title: data.get("title") || entry.title || "",
        visibility,
        password,
      });
      return { enabled: true, ok: true, data: result };
    } catch (error) {
      return {
        enabled: true,
        ok: false,
        error: error.message,
      };
    }
  }

  function sheetRequest(action, params) {
    const token = currentSheetToken();
    if (!token) return Promise.reject(new Error("請先輸入試算表寫入 Token 後再使用身體記錄 🔐"));
    const callback = "__emilySheetCallback" + Date.now() + Math.random().toString(36).slice(2);
    const query = new URLSearchParams({ action, token, callback });
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value != null && value !== "") query.set(key, value);
    });
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timer = window.setTimeout(() => {
        cleanup();
        reject(new Error("Google Sheet 回應逾時，請稍後再試 🌧️"));
      }, 20000);
      function cleanup() {
        window.clearTimeout(timer);
        delete window[callback];
        script.remove();
      }
      window[callback] = (payload) => {
        cleanup();
        if (!payload || payload.ok === false) {
          const message = String((payload && payload.error) || "Google Sheet 寫入失敗");
          reject(new Error(message.includes("密鑰") || message.includes("Token") ? "試算表寫入 Token 沒通過驗證，請確認輸入的是 Apps Script 使用的寫入密鑰 🔐" : message));
        }
        else resolve(payload.data || {});
      };
      script.onerror = () => {
        cleanup();
        reject(new Error("無法連線 Google Sheet Web App 🌧️"));
      };
      script.src = sheetAppUrl + "?" + query.toString();
      document.body.appendChild(script);
    });
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

  function selectedUploadFiles(sourceForm) {
    return Array.from(sourceForm.querySelectorAll('input[type="file"][name="media"]'))
      .flatMap((input) => Array.from(input.files || []));
  }

  function chunkFiles(files, size) {
    const chunks = [];
    for (let index = 0; index < files.length; index += size) {
      chunks.push(files.slice(index, index + size));
    }
    return chunks;
  }

  function entryFormData(files, options) {
    const settings = Object.assign({ includeLibraryImages: true, includeRemoveMedia: true }, options || {});
    const data = new FormData(form);
    data.delete("media");
    data.delete("libraryImageIds");
    data.delete("removeMedia");
    files.forEach((file) => data.append("media", file));
    if (settings.includeLibraryImages) {
      selectedLibraryImages.forEach((_value, id) => data.append("libraryImageIds", id));
    }
    if (settings.includeRemoveMedia) {
      form.querySelectorAll("input[name='removeMedia']:checked").forEach((input) => {
        data.append("removeMedia", input.value);
      });
    }
    return data;
  }

  async function saveJournalEntryBatch(entryId, data) {
    const path = entryId ? "/api/wife-journal/entries/" + encodeURIComponent(entryId) : "/api/wife-journal/entries";
    return fetch(apiUrl(path), {
      method: entryId ? "PUT" : "POST",
      headers: headers(),
      body: data,
    }).then(readJson);
  }

  async function saveJournalEntryWithBatchedMedia(editId, uploadFiles) {
    const batches = chunkFiles(uploadFiles, entryUploadBatchSize);
    let entryId = editId;
    let body = null;
    let firstData = null;
    if (!batches.length) {
      const data = entryFormData([], { includeLibraryImages: true, includeRemoveMedia: true });
      body = await saveJournalEntryBatch(entryId, data);
      return { body, data };
    }

    for (const [index, files] of batches.entries()) {
      if (batches.length > 1) {
        statusEl.textContent = "附件分批上傳中：" + (index + 1) + " / " + batches.length;
      }
      const data = entryFormData(files, {
        includeLibraryImages: index === 0,
        includeRemoveMedia: index === 0,
      });
      body = await saveJournalEntryBatch(entryId, data);
      if (!firstData) firstData = data;
      if (!entryId) {
        entryId = body.entry && (body.entry.id || body.entry.slug);
        if (!entryId && index < batches.length - 1) throw new Error("Entry id missing after first upload batch.");
      }
    }

    return { body, data: firstData };
  }

  function uploadKind(file) {
    const type = String(file && file.type || "");
    if (type.startsWith("audio/")) return "語音";
    return "照片";
  }

  function renderUploadStatuses(target, files, state, message) {
    if (!target) return;
    if (!files.length) {
      target.innerHTML = "";
      return;
    }
    const statusText = {
      waiting: "等待上傳",
      loading: "上傳中...",
      ok: "已上傳",
      error: "上傳失敗",
    }[state] || state;
    target.innerHTML = files.map((file) => (
      '<div class="upload-status-item ' + esc(state) + '">'
        + '<strong>' + esc(uploadKind(file) + "：" + file.name) + '</strong>'
        + '<span>' + esc(message || statusText) + '</span>'
      + '</div>'
    )).join("");
  }

  function renderClientUploadStatuses(files, states) {
    if (!clientUploadStatus) return;
    clientUploadStatus.innerHTML = files.map((file) => {
      const state = states.get(file) || "waiting";
      const statusText = { waiting: "等待上傳", loading: "上傳中...", ok: "上傳成功", error: "上傳失敗" }[state] || state;
      return '<div class="upload-status-item ' + esc(state) + '"><strong>' + esc("照片：" + file.name) + '</strong><span>' + esc(statusText) + '</span></div>';
    }).join("");
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
    logoNav.hidden = false;
    gateSettings.hidden = true;
    gateSettingsBtn.hidden = true;
    gateSettingsBtn.setAttribute("aria-expanded", "false");
  }

  function showGate(message, isError) {
    app.hidden = true;
    gate.hidden = false;
    logoNav.hidden = true;
    gateSettingsBtn.hidden = false;
    gateSettings.hidden = true;
    gateSettingsBtn.setAttribute("aria-expanded", "false");
    tokenField.hidden = true;
    toggleTokenInputBtn.setAttribute("aria-expanded", "false");
    siteHeader.classList.remove("nav-open");
    brandMenuBtn.setAttribute("aria-expanded", "false");
    gateStatus.textContent = message || "";
    gateStatus.className = "status" + (isError ? " error" : "");
  }

  function journalCalendarMonth() {
    return activeJournalMonth || currentJournalMonth();
  }

  function currentJournalMonth() {
    const now = new Date();
    return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  }

  function journalEntryMonths() {
    const months = Array.from(new Set(entries
      .filter((entry) => entry.type !== "card" && !entry.cardOnly)
      .map((entry) => String(entry.date || "").slice(0, 7))
      .filter((month) => /^\d{4}-\d{2}$/.test(month))));
    const currentMonth = currentJournalMonth();
    if (!months.includes(currentMonth)) months.push(currentMonth);
    return months.sort().reverse();
  }

  function syncJournalMonthControls() {
    const months = journalEntryMonths();
    if (!activeJournalMonth || !months.includes(activeJournalMonth)) activeJournalMonth = months[0] || journalCalendarMonth();
    const years = Array.from(new Set(months.map((month) => month.slice(0, 4))));
    const activeYear = activeJournalMonth.slice(0, 4);
    journalYear.innerHTML = years.map((year) => '<option value="' + year + '"' + (year === activeYear ? " selected" : "") + '>' + year + '年</option>').join("");
    const yearMonths = months.filter((month) => month.startsWith(activeYear + "-"));
    journalMonth.innerHTML = yearMonths.map((month) => {
      const monthNumber = Number(month.slice(5, 7));
      return '<option value="' + month + '"' + (month === activeJournalMonth ? " selected" : "") + '>' + monthNumber + '月</option>';
    }).join("");
  }

  function entriesForTimeline() {
    const moodEntries = entries.filter((entry) => entry.type !== "card" && !entry.cardOnly);
    let scopedEntries = moodEntries;
    if (activeDate) scopedEntries = moodEntries.filter((entry) => entry.date === activeDate);
    else {
      const activeMonth = journalCalendarMonth();
      scopedEntries = moodEntries.filter((entry) => String(entry.date || "").slice(0, 7) === activeMonth);
    }
    const query = timelineSearchQuery.trim().toLowerCase();
    if (!query) return scopedEntries;
    return scopedEntries.filter((entry) => {
      const haystack = [
        entry.title,
        entry.excerpt,
        entry.date,
        entry.time,
        Array.isArray(entry.tags) ? entry.tags.join(" ") : "",
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }

  function cardEntries() {
    return entries.filter((entry) => entry.type === "card" || entry.cardOnly || entry.cardDraw);
  }

  function shortTimelineExcerpt(value) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (text.length <= 46) return text;
    return text.slice(0, 46).trimEnd() + "...";
  }

  function cardEntryMonth(entry) {
    return String(entry.date || "").slice(0, 7);
  }

  function cardTimelineOptions() {
    return Array.from(new Set(cardEntries().map(cardEntryMonth).filter(Boolean))).sort().reverse();
  }

  function syncCardTimelineFilters() {
    const months = cardTimelineOptions();
    if (!months.length) {
      cardTimelineYear.innerHTML = '<option value="">尚無年份</option>';
      cardTimelineMonth.innerHTML = '<option value="">尚無月份</option>';
      activeCardMonth = "";
      return;
    }
    if (!activeCardMonth || !months.includes(activeCardMonth)) activeCardMonth = months[0];
    const years = Array.from(new Set(months.map((month) => month.slice(0, 4))));
    const activeYear = activeCardMonth.slice(0, 4);
    cardTimelineYear.innerHTML = years.map((year) => (
      '<option value="' + year + '"' + (year === activeYear ? " selected" : "") + '>' + year + '年</option>'
    )).join("");
    syncCardTimelineMonths();
  }

  function syncCardTimelineMonths() {
    const months = cardTimelineOptions();
    const year = cardTimelineYear.value || (activeCardMonth ? activeCardMonth.slice(0, 4) : "");
    const yearMonths = months.filter((month) => month.startsWith(year + "-"));
    if (!yearMonths.length) {
      cardTimelineMonth.innerHTML = '<option value="">尚無月份</option>';
      activeCardMonth = "";
      return;
    }
    if (!activeCardMonth || !yearMonths.includes(activeCardMonth)) activeCardMonth = yearMonths[0];
    cardTimelineMonth.innerHTML = yearMonths.map((month) => {
      const monthNumber = Number(month.slice(5, 7));
      return '<option value="' + month + '"' + (month === activeCardMonth ? " selected" : "") + '>' + monthNumber + '月</option>';
    }).join("");
  }

  function setupBodyFilters() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const years = [];
    for (let year = currentYear + 1; year >= currentYear - 8; year -= 1) years.push(String(year));
    bodyYear.innerHTML = years.map((year) => '<option value="' + year + '">' + year + '年</option>').join("");
    bodyMonth.innerHTML = Array.from({ length: 12 }, (_unused, index) => {
      const value = String(index + 1).padStart(2, "0");
      return '<option value="' + value + '">' + (index + 1) + '月</option>';
    }).join("");
    bodyYear.value = String(currentYear);
    bodyMonth.value = String(now.getMonth() + 1).padStart(2, "0");
    bodyForm.elements.date.valueAsDate = now;
  }

  function bodyRecordsByDate() {
    return bodyRecords.reduce((map, record) => {
      if (!record.date) return map;
      if (!map.has(record.date)) map.set(record.date, []);
      map.get(record.date).push(record);
      return map;
    }, new Map());
  }

  function renderBodyCalendar() {
    const year = Number(bodyYear.value);
    const month = Number(bodyMonth.value) - 1;
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const leadingBlanks = (firstDay + 6) % 7;
    const weekdayNames = ["一", "二", "三", "四", "五", "六", "日"];
    const byDate = bodyRecordsByDate();
    bodyCalendarTitle.textContent = "🌙 " + String(month + 1) + "月身體月曆";
    const head = weekdayNames.map((name, index) => '<div class="weekday' + (index >= 5 ? ' weekend' : '') + '">週' + name + '</div>');
    const blanks = Array.from({ length: leadingBlanks }, () => '<div class="day"></div>');
    const dayCells = Array.from({ length: days }, (_unused, index) => {
      const day = index + 1;
      const date = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
      const weekday = new Date(year, month, day).getDay();
      const records = byDate.get(date) || [];
      const hasPeriod = records.some((record) => record.type === "月經");
      const hasAsthma = records.some((record) => record.type === "氣喘");
      const markers = (hasPeriod ? '<span class="body-marker period"></span>' : '')
        + (hasAsthma ? '<span class="body-marker asthma"></span>' : '');
      return '<button type="button" class="day body-day'
        + (weekday === 0 || weekday === 6 ? ' weekend' : '')
        + (hasPeriod ? ' has-period' : '')
        + (hasAsthma ? ' has-asthma' : '')
        + (activeBodyDate === date ? ' active' : '')
        + '" data-body-date="' + date + '">' + day + (markers ? '<div class="dot-row">' + markers + '</div>' : '') + '</button>';
    });
    bodyCalendar.innerHTML = head.concat(blanks, dayCells).join("");
  }

  function asthmaTriggerLabel(value) {
    return value === "壓力" ? "自律神經" : value;
  }

  function renderBodyRecords() {
    const records = activeBodyDate
      ? bodyRecords.filter((record) => record.date === activeBodyDate)
      : bodyRecords;
    const selectedMonthLabel = String(Number(bodyMonth.value || "0")) + "月";
    bodyDayTitle.textContent = activeBodyDate ? "📍 " + activeBodyDate + " 當日記錄" : "📍 " + selectedMonthLabel + "整月記錄";
    if (!records.length) {
      bodyRecordList.innerHTML = '<p class="muted">' + (activeBodyDate ? '這一天還沒有身體記錄 🌙' : '這個月還沒有身體記錄 🌙') + '</p>';
      return;
    }
    bodyRecordList.innerHTML = records.map((record) => {
      const title = record.type === "氣喘" ? "🫧 氣喘發作日" : "🌸 月經來時";
      const details = [
        record.flow ? "流量：" + record.flow : "",
        record.painLevel ? "疼痛：" + record.painLevel : "",
        record.asthmaTrigger ? "誘因：" + asthmaTriggerLabel(record.asthmaTrigger) : "",
      ].filter(Boolean).join(" · ");
      return '<article class="body-record">'
        + '<div class="entry-title">' + esc(title) + '</div>'
        + '<div class="entry-meta">' + esc([record.recordedAt || record.date, details].filter(Boolean).join(" · ")) + '</div>'
        + bodyNotesMarkup(record.notes)
        + '<div class="toolbar"><button class="danger" type="button" data-body-delete-id="' + esc(record.id) + '">🗑️ 刪除</button></div>'
      + '</article>';
    }).join("");
  }

  function bodyNotesMarkup(value) {
    const notes = String(value || "").trim();
    if (!notes) return "";
    const urls = notes.split(/\s*[,\n]\s*/).map((item) => item.replace(/^圖片附件：\s*/, "").trim()).filter((url) => /^https?:\/\//i.test(url));
    if (!urls.length) return '<div class="entry-meta">' + esc(notes) + '</div>';
    return '<div class="client-card-thumbs">' + urls.map((url) => '<a href="' + esc(url) + '" target="_blank" rel="noreferrer"><img class="client-card-thumb" src="' + esc(url) + '" alt="健康記錄附件"></a>').join("") + '</div>';
  }

  async function uploadBodyImages(files, date) {
    if (!files.length) return [];
    renderUploadStatuses(bodyImageStatus, files, "loading");
    const media = [];
    try {
      for (const file of files) {
        const data = new FormData();
        data.set("date", date);
        data.set("media", file);
        const body = await fetch(apiUrl("/api/wife-journal/body-media"), { method: "POST", headers: headers(), body: data }).then(readJson);
        if (body.media) media.push(body.media);
      }
      renderUploadStatuses(bodyImageStatus, files, "ok");
      return media;
    } catch (error) {
      renderUploadStatuses(bodyImageStatus, files, "error", "上傳失敗");
      throw error;
    }
  }

  function updateBodyTemplateFields() {
    const type = bodyForm.elements.type.value;
    const isAsthma = type === "氣喘";
    bodyForm.querySelectorAll(".body-period-field").forEach((field) => {
      field.hidden = isAsthma;
      field.querySelectorAll("input, select, textarea").forEach((input) => {
        input.disabled = isAsthma;
        if (isAsthma) input.value = "";
      });
    });
    bodyForm.querySelectorAll(".body-asthma-field").forEach((field) => {
      field.hidden = !isAsthma;
      field.querySelectorAll("input, select, textarea").forEach((input) => {
        input.disabled = !isAsthma;
        if (!isAsthma) input.value = "";
      });
    });
  }

  async function loadBodyRecords() {
    const year = bodyYear.value;
    const month = bodyMonth.value;
    bodyStatus.className = "status";
    bodyStatus.textContent = "讀取身體記錄中... 🌙";
    try {
      await refreshBodyLockStatus();
      if (bodyLockConfigured && !bodyUnlocked) {
        bodyRecords = [];
        renderBodyCalendar();
        renderBodyRecords();
        bodyStatus.className = "status";
        bodyStatus.textContent = "當月記錄已上鎖，請先輸入身體記錄密碼 🔐";
        bodyLoaded = true;
        return;
      }
      const params = { year, month };
      if (bodyLockConfigured) params.bodyPassword = bodyPassword;
      const body = await sheetRequest("emilyBodyRecords", params);
      bodyRecords = Array.isArray(body.records) ? body.records : [];
      const prefix = year + "-" + month;
      if (!activeBodyDate || !activeBodyDate.startsWith(prefix)) activeBodyDate = "";
      renderBodyCalendar();
      renderBodyRecords();
      bodyStatus.className = "status ok";
      bodyStatus.textContent = "已載入 " + prefix + "，共 " + bodyRecords.length + " 筆記錄 ✨";
      bodyLoaded = true;
    } catch (error) {
      bodyRecords = [];
      renderBodyCalendar();
      renderBodyRecords();
      bodyLoaded = false;
      bodyStatus.className = "status error";
      bodyStatus.textContent = error.message;
    }
  }

  async function changeBodyMonth() {
    activeBodyDate = "";
    await loadBodyRecords();
  }

  async function refreshBodyLockStatus() {
    const status = await sheetRequest("emilyBodyLockStatus");
    bodyLockConfigured = !!status.locked;
    if (!bodyLockConfigured) bodyUnlocked = true;
    return status;
  }

  async function unlockBodyRecords() {
    bodyPassword = bodyPasswordInput.value.trim();
    if (!bodyPassword) {
      bodyStatus.className = "status error";
      bodyStatus.textContent = "請輸入身體記錄密碼 🔐";
      return;
    }
    bodyStatus.className = "status";
    bodyStatus.textContent = "解鎖中... 🔐";
    try {
      await sheetRequest("emilyBodyLockUnlock", { bodyPassword });
      bodyUnlocked = true;
      bodyStatus.className = "status ok";
      bodyStatus.textContent = "已解鎖當月記錄 ✨";
      await loadBodyRecords();
    } catch (error) {
      bodyPassword = "";
      bodyUnlocked = false;
      bodyStatus.className = "status error";
      bodyStatus.textContent = error.message;
    }
  }

  async function setBodyLockPassword() {
    const nextPassword = bodyNewPasswordInput.value.trim();
    if (!nextPassword) {
      bodyStatus.className = "status error";
      bodyStatus.textContent = "請先輸入要設定的身體記錄密碼 🔐";
      return;
    }
    bodyStatus.className = "status";
    bodyStatus.textContent = "設定身體記錄密碼中... 🔐";
    try {
      await sheetRequest("emilyBodyLockSet", { bodyPassword: nextPassword });
      bodyPassword = nextPassword;
      bodyPasswordInput.value = nextPassword;
      bodyNewPasswordInput.value = "";
      bodyLockConfigured = true;
      bodyUnlocked = true;
      bodyStatus.className = "status ok";
      bodyStatus.textContent = "身體記錄密碼已設定，也已解鎖目前頁面 ✨";
      await loadBodyRecords();
    } catch (error) {
      bodyStatus.className = "status error";
      bodyStatus.textContent = error.message;
    }
  }

  function lockBodyRecords() {
    bodyPassword = "";
    bodyUnlocked = false;
    bodyPasswordInput.value = "";
    bodyRecords = [];
    renderBodyCalendar();
    renderBodyRecords();
    bodyStatus.className = "status";
    bodyStatus.textContent = "身體記錄已重新上鎖 🔒";
  }

  function renderEntries() {
    const visibleEntries = entriesForTimeline();
    if (!visibleEntries.length) {
      const emptyText = timelineSearchQuery.trim()
        ? '找不到「' + esc(timelineSearchQuery.trim()) + '」相關心情日記 🔍'
        : (activeDate ? esc(activeDate) + ' 沒有心情日記 🐰' : '選定月份還沒有心情日記 🐰');
      entryListEl.innerHTML = '<p class="muted">' + emptyText + '</p>';
      return;
    }
    entryListEl.innerHTML = visibleEntries.map((entry) => {
      const cover = mediaUrl(entry.coverImageUrl, entry.updatedAt || entry.id);
      const locked = entry.visibility === "password" || entry.visibility === "locked";
      const visibility = locked ? "上鎖" : "不上鎖";
      const meta = [entry.date || "", entry.time || "", visibility].filter(Boolean).join(" · ");
      const excerpt = locked ? "這篇文章需要解鎖密碼。" : shortTimelineExcerpt(entry.excerpt || "");
      return '<article class="entry" data-read-id="' + esc(entry.id) + '">'
        + (cover ? '<button class="cover-button" type="button" data-view-url="' + esc(cover) + '"><img class="cover" src="' + esc(cover) + '" alt=""></button>' : '<div class="cover"></div>')
        + '<div>'
          + '<div class="entry-title">' + esc(entry.title || "今天的心情") + '</div>'
          + '<div class="entry-meta">' + esc(meta) + '</div>'
          + '<div class="entry-excerpt">' + esc(excerpt) + '</div>'
          + '<div class="toolbar"><button type="button" data-read-button-id="' + esc(entry.id) + '">📖 閱讀全文</button><button type="button" data-edit-id="' + esc(entry.id) + '">✏️ 編輯</button><button class="danger" type="button" data-delete-id="' + esc(entry.id) + '">🗑️ 刪除</button></div>'
        + '</div>'
      + '</article>';
    }).join("");
  }

  function renderCalendar() {
    const activeMonth = journalCalendarMonth();
    const year = Number(activeMonth.slice(0, 4));
    const month = Number(activeMonth.slice(5, 7)) - 1;
    const days = new Date(year, month + 1, 0).getDate();
    const byDate = entries.filter((entry) => entry.type !== "card" && !entry.cardOnly).reduce((map, entry) => {
      map.set(entry.date, (map.get(entry.date) || 0) + 1);
      return map;
    }, new Map());
    const todoByDate = todos.reduce((map, todo) => {
      map.set(todo.date, (map.get(todo.date) || 0) + 1);
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
      const isToday = date === localDateString();
      const count = byDate.get(date) || 0;
      const countBadge = count ? '<div><span class="entry-count-badge">' + esc(count > 9 ? "9+" : String(count)) + '</span></div>' : '';
      const todoCount = todoByDate.get(date) || 0;
      const todoBadge = todoCount ? '<div><span class="todo-count-badge">待' + esc(todoCount > 9 ? "9+" : String(todoCount)) + '</span></div>' : '';
      const todayLabel = isToday ? '<span class="today-label">今天</span>' : '';
      return '<button type="button" class="day' + (isWeekend ? ' weekend' : '') + (count ? ' has-entry' : '') + (todoCount ? ' has-todo' : '') + (isToday ? ' today' : '') + (activeDate === date ? ' active' : '') + '" data-date="' + date + '">' + day + todayLabel + countBadge + todoBadge + '</button>';
    });
    calendarEl.innerHTML = head.concat(blanks, dayCells).join("");
  }

  async function loadEntries() {
    entryListEl.innerHTML = '<p class="muted">載入中... ✨</p>';
    const body = await fetch(apiUrl("/api/wife-journal/entries"), { cache: "no-store", headers: headers() }).then(readJson);
    entries = Array.isArray(body.entries) ? body.entries : [];
    syncJournalMonthControls();
    await loadTodosForMonth(journalCalendarMonth());
    renderEntries();
    renderCalendar();
    syncCardTimelineFilters();
    renderCardRecords();
  }

  function clearTimelineSearch() {
    timelineSearchQuery = "";
    if (timelineSearchInput) timelineSearchInput.value = "";
  }

  function changeJournalMonth(nextMonth) {
    activeJournalMonth = nextMonth || journalCalendarMonth();
    activeDate = "";
    clearTimelineSearch();
    syncJournalMonthControls();
    renderCalendar();
    renderEntries();
    loadTodosForMonth(activeJournalMonth).catch((error) => {
      todoStatus.className = "status error";
      todoStatus.textContent = error.message;
    });
  }

  async function loadTodosForMonth(ym) {
    const body = await fetch(apiUrl("/api/wife-journal/todos?ym=" + encodeURIComponent(ym)), { cache: "no-store", headers: headers() }).then(readJson);
    todos = Array.isArray(body.todos) ? body.todos : [];
    activeTodoDate = "";
    renderTodos();
    renderCalendar();
  }

  function localDateString(date = new Date()) {
    return String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function resetTodoForm() {
    todoForm.reset();
    todoForm.elements.id.value = "";
    todoForm.elements.date.value = activeTodoDate || localDateString();
    todoSubmitBtn.textContent = "＋ 新增待辦";
    todoCancelBtn.hidden = true;
  }

  function renderTodos() {
    const remainingCount = todos.filter((todo) => !todo.completed).length;
    todoSummaryCount.textContent = todos.length ? "（" + remainingCount + " 項未完成／共 " + todos.length + " 項）" : "（本月尚無）";
    const visibleTodos = activeTodoDate ? todos.filter((todo) => todo.date === activeTodoDate) : todos;
    if (!visibleTodos.length) {
      todoList.innerHTML = '<p class="muted">' + (activeTodoDate ? esc(activeTodoDate) + ' 沒有待辦事項。' : '這個月還沒有待辦事項。') + '</p>';
      return;
    }
    todoList.innerHTML = visibleTodos.map((todo) => '<div class="todo-item' + (todo.completed ? ' completed' : '') + '">' +
      '<input class="todo-check" type="checkbox" data-todo-toggle="' + esc(todo.id) + '"' + (todo.completed ? ' checked' : '') + ' aria-label="完成待辦">' +
      '<div><div class="todo-title">' + esc(todo.title) + '</div><span class="todo-date">' + esc(todo.date) + '</span></div>' +
      '<div class="todo-actions"><button class="icon-button" type="button" data-todo-edit="' + esc(todo.id) + '" title="編輯待辦">✏️</button><button class="icon-button" type="button" data-todo-delete="' + esc(todo.id) + '" title="刪除待辦">🗑️</button></div>' +
      '</div>').join("");
  }

  function editTodo(todoId) {
    const todo = todos.find((item) => item.id === todoId);
    if (!todo) return;
    todoForm.elements.id.value = todo.id;
    todoForm.elements.date.value = todo.date;
    todoForm.elements.title.value = todo.title;
    todoSubmitBtn.textContent = "💾 儲存修改";
    todoCancelBtn.hidden = false;
    todoForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function saveTodo(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(todoForm).entries());
    const todoId = String(data.id || "");
    todoSubmitBtn.disabled = true;
    todoStatus.className = "status";
    todoStatus.textContent = todoId ? "更新待辦中..." : "新增待辦中...";
    try {
      const path = todoId ? "/api/wife-journal/todos/" + encodeURIComponent(journalCalendarMonth()) + "/" + encodeURIComponent(todoId) : "/api/wife-journal/todos";
      await fetch(apiUrl(path), { method: todoId ? "PUT" : "POST", headers: headers({ "content-type": "application/json" }), body: JSON.stringify({ date: data.date, title: data.title, completed: false }) }).then(readJson);
      todoStatus.className = "status ok";
      todoStatus.textContent = todoId ? "待辦已更新 ✨" : "待辦已新增 ✨";
      resetTodoForm();
      await loadTodosForMonth(journalCalendarMonth());
    } catch (error) {
      todoStatus.className = "status error";
      todoStatus.textContent = error.message;
    } finally { todoSubmitBtn.disabled = false; }
  }

  async function toggleTodo(todoId, completed) {
    try {
      await fetch(apiUrl("/api/wife-journal/todos/" + encodeURIComponent(journalCalendarMonth()) + "/" + encodeURIComponent(todoId)), { method: "PUT", headers: headers({ "content-type": "application/json" }), body: JSON.stringify({ completed }) }).then(readJson);
      await loadTodosForMonth(journalCalendarMonth());
    } catch (error) { todoStatus.className = "status error"; todoStatus.textContent = error.message; }
  }

  function markdownBody(markdown) {
    return String(markdown || "").replace(/^---[\s\S]*?---\s*/, "").trim();
  }

  function entryPasswordQuery(entry) {
    if (entry && entry.visibility === "password") {
      const password = window.prompt("請輸入這篇文章的解鎖密碼");
      if (!password) return null;
      return "?password=" + encodeURIComponent(password);
    }
    return "";
  }

  function readMediaPreview(item, index) {
    const key = item.libraryId || item.legacyLibraryId || item.fileName || item.url || item.originalUrl || item.thumbnailUrl || "";
    if (item.type === "audio") {
      return '<div class="edit-media-card">'
        + '<label>語音 ' + (index + 1) + '</label>'
        + '<audio controls src="' + esc(mediaUrl(item.url || "", item.updatedAt || key)) + '"></audio>'
      + '</div>';
    }
    const thumb = mediaUrl(item.thumbnailUrl || item.originalUrl, item.updatedAt || key);
    const original = mediaUrl(item.originalUrl || item.thumbnailUrl, item.updatedAt || key);
    const galleryIndex = entryReaderGallery.findIndex((photo) => photo.url === original);
    return '<button class="media-card" type="button" data-gallery-index="' + esc(String(galleryIndex)) + '" data-view-url="' + esc(original) + '"><img src="' + esc(thumb) + '" alt="" loading="lazy"></button>';
  }

  function photoGalleryItem(item) {
    const key = item.libraryId || item.legacyLibraryId || item.fileName || item.url || item.originalUrl || item.thumbnailUrl || "";
    if (!item || item.type === "audio") return null;
    const url = mediaUrl(item.originalUrl || item.thumbnailUrl || "", item.updatedAt || key);
    const thumb = mediaUrl(item.thumbnailUrl || item.originalUrl || "", item.updatedAt || key);
    return url ? { url, thumb } : null;
  }

  async function openReadEntry(id) {
    entryReaderGallery = [];
    entryReaderContent.innerHTML = '<p class="status">讀取完整文章中... 📖</p>';
    if (entryReaderDialog && !entryReaderDialog.open) {
      entryReaderDialog.showModal();
    }
    try {
      let url = apiUrl("/api/wife-journal/entries/" + encodeURIComponent(id));
      const entry = entries.find((item) => item.id === id);
      const query = entryPasswordQuery(entry);
      if (query === null) {
        entryReaderContent.innerHTML = '<p class="status">已取消開啟私密文章 🔐</p>';
        return;
      }
      url += query;
      const body = await fetch(url, { cache: "no-store", headers: headers() }).then(readJson);
      const loaded = body.entry || {};
      const visibility = loaded.visibility === "password" || loaded.visibility === "locked" ? "上鎖" : "不上鎖";
      const media = Array.isArray(loaded.media) ? loaded.media : [];
      entryReaderGallery = media.map(photoGalleryItem).filter(Boolean);
      entryReaderContent.innerHTML = '<article class="reader-entry">'
        + '<div class="entry-title">' + esc(loaded.title || "今天的心情") + '</div>'
        + '<div class="entry-meta">' + esc([loaded.date || "", loaded.time || "", visibility].filter(Boolean).join(" · ")) + '</div>'
        + (loaded.tags && loaded.tags.length ? '<div class="chip-row">' + loaded.tags.map((tag) => '<span class="chip">' + esc(tag) + '</span>').join("") + '</div>' : '')
        + '<div class="detail">' + esc(markdownBody(body.markdown || "")) + '</div>'
        + (media.length ? '<div class="edit-media-grid full" style="margin-top:14px">' + media.map(readMediaPreview).join("") + '</div>' : '')
        + '<div class="toolbar"><button type="button" data-edit-id="' + esc(loaded.id) + '">✏️ 編輯</button></div>'
      + '</article>';
    } catch (error) {
      entryReaderContent.innerHTML = '<p class="status error">' + esc(error.message) + '</p>';
    }
  }

  function openPhoto(url) {
    openPhotoGallery([{ url }], 0);
  }

  function renderPhotoGallery() {
    const item = photoGalleryItems[photoGalleryIndex] || {};
    photoViewerImg.src = item.url || "";
    photoViewerImg.style.transform = "scale(" + photoZoom + ")";
    const total = photoGalleryItems.length;
    photoCounter.textContent = total > 1 ? (photoGalleryIndex + 1) + " / " + total : "";
    photoPrevBtn.hidden = total <= 1;
    photoNextBtn.hidden = total <= 1;
  }

  function openPhotoGallery(items, index) {
    const validItems = (Array.isArray(items) ? items : [])
      .map((item) => typeof item === "string" ? { url: item } : item)
      .filter((item) => item && item.url);
    if (!validItems.length) return;
    photoGalleryItems = validItems;
    photoZoom = 1;
    photoGalleryIndex = Math.min(Math.max(Number(index) || 0, 0), validItems.length - 1);
    renderPhotoGallery();
    photoViewer.showModal();
  }

  function movePhotoGallery(delta) {
    if (photoGalleryItems.length <= 1) return;
    photoGalleryIndex = (photoGalleryIndex + delta + photoGalleryItems.length) % photoGalleryItems.length;
    renderPhotoGallery();
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
    statusEl.className = "status";
    statusEl.textContent = "讀取編輯內容中... 📖";
    createCard.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      let url = apiUrl("/api/wife-journal/entries/" + encodeURIComponent(id));
      const entry = entries.find((item) => item.id === id);
      const query = entryPasswordQuery(entry);
      if (query === null) {
        statusEl.textContent = "已取消開啟上鎖文章 🔐";
        return;
      }
      url += query;
      const body = await fetch(url, { cache: "no-store", headers: headers() }).then(readJson);
      const loaded = body.entry || {};
      form.reset();
      form.dataset.entryId = loaded.id || id;
      form.dataset.originalVisibility = loaded.visibility || "normal";
      entryFormTitle.textContent = "✏️ 編輯心情日記";
      entrySubmitBtn.textContent = "🧸 儲存編輯";
      cancelEntryEditBtn.hidden = false;
      form.elements.title.value = loaded.title || "";
      form.elements.date.value = loaded.date || "";
      form.elements.time.value = loaded.time || "";
      form.elements.visibility.value = loaded.visibility === "password" || loaded.visibility === "locked" ? "password" : "normal";
      form.elements.entryPassword.value = "";
      form.elements.tags.value = (loaded.tags || []).join(",");
      form.elements.content.value = markdownBody(body.markdown || "");
      const media = Array.isArray(loaded.media) ? loaded.media : [];
      entryEditMedia.hidden = false;
      entryEditMedia.innerHTML = '<h3>照片與語音</h3><div class="edit-media-grid">'
        + (media.map(mediaPreview).join("") || '<p class="muted">沒有附件</p>')
        + '</div>';
      entryUploadStatus.innerHTML = "";
      selectedLibraryImages.clear();
      renderTagPicker();
      updateEntryPasswordField(form);
      statusEl.className = "status ok";
      statusEl.textContent = "正在編輯：「" + (loaded.title || "心情日記") + "」✨";
      createCard.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      statusEl.className = "status error";
      statusEl.textContent = error.message;
    }
  }

  async function deleteEntry(id) {
    const entry = entries.find((item) => item.id === id || item.slug === id) || {};
    const title = entry.title || "這篇心情日記";
    const confirmed = window.confirm(
      "確定要刪除「" + title + "」嗎？\n\n"
      + "這會刪除整篇文章、這篇上傳的照片與語音。從 NAS Photos 插入的歷史照片只會移除文章引用，不會刪除原始相簿。"
    );
    if (!confirmed) return;

    statusEl.className = "status";
    statusEl.textContent = "刪除中... 🧸";
    try {
      const body = await fetch(apiUrl("/api/wife-journal/entries/" + encodeURIComponent(id)), {
        method: "DELETE",
        headers: headers(),
      }).then(readJson);
      const deletedTitle = (body.entry && body.entry.title) || title;
      statusEl.className = "status ok";
      statusEl.textContent = "已刪除「" + deletedTitle + "」✨";
      await loadEntries();
    } catch (error) {
      statusEl.className = "status error";
      statusEl.textContent = error.message;
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
      librarySummaryLoaded = true;
    } catch (error) {
      libraryStatus.textContent = error.message;
      libraryStatus.className = "status error";
    }
  }

  async function ensureLibrarySummary() {
    if (librarySummaryLoaded) return;
    await loadLibrarySummary();
  }

  function syncLibraryMonths() {
    const options = JSON.parse(libraryYear.dataset.options || "[]");
    const months = options.filter((item) => item.year === libraryYear.value).map((item) => item.month);
    libraryMonth.innerHTML = months.map((month) => '<option value="' + month + '">' + Number(month) + '月</option>').join("");
  }

  async function loadLibraryMonth() {
    await ensureLibrarySummary();
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
      const apiOshoCards = Array.isArray(body.oshoCards) ? body.oshoCards : [];
      cards = mergeCards(apiCards);
      oshoCards = apiOshoCards.length ? normalizeCards(apiOshoCards) : [];
    } catch (_error) {
      cards = fallbackCards.slice();
      oshoCards = [];
    }
    cardsLoaded = true;
    renderCardDrawFields();
  }

  async function ensureCardsLoaded() {
    if (cardsLoaded) return;
    await loadCards();
  }

  function renderLearningEntries() {
    const query = learningSearchQuery.trim().toLowerCase();
    const records = learningRecords.filter((record) => !query || [record.title, record.content, record.date].some((value) => String(value || "").toLowerCase().includes(query)));
    if (!records.length) {
      learningEntryList.innerHTML = '<p class="muted">' + (query ? '找不到相關學習日誌 🔍' : '目前還沒有學習日誌。') + '</p>';
      return;
    }
    learningEntryList.innerHTML = records.map((record) => {
      const media = (record.media || []).map(photoGalleryItem).filter(Boolean);
      return '<article class="learning-entry" data-learning-id="' + esc(record.id) + '">' +
        '<div class="learning-entry-heading"><div><strong>' + esc(record.title) + '</strong><div class="entry-meta">' + esc(record.date) + '</div></div><button class="ghost" type="button" data-learning-edit="' + esc(record.id) + '">✏️ 編輯</button></div>' +
        '<div class="learning-entry-content">' + esc(record.content) + '</div>' +
        (media.length ? '<div class="learning-gallery">' + media.map((item, index) => '<button type="button" data-learning-photo="' + esc(record.id) + '" data-learning-photo-index="' + index + '"><img src="' + esc(item.thumbnailUrl || item.url) + '" alt="學習附件" loading="lazy"></button>').join("") + '</div>' : '') +
      '</article>';
    }).join("");
  }

  async function loadLearningRecords() {
    learningEntryList.innerHTML = '<p class="muted">載入學習日誌中...</p>';
    const body = await fetch(apiUrl("/api/wife-journal/learning"), { cache: "no-store", headers: headers() }).then(readJson);
    learningRecords = Array.isArray(body.records) ? body.records : [];
    renderLearningEntries();
  }

  function resetLearningForm() {
    learningForm.reset();
    learningForm.elements.id.value = "";
    learningForm.elements.date.value = localDateString();
    learningSubmitBtn.textContent = "📚 儲存學習日誌";
    learningCancelBtn.hidden = true;
    learningUploadStatus.innerHTML = "";
    learningEditMedia.hidden = true;
    learningEditMedia.innerHTML = "";
  }

  function editLearningRecord(id) {
    const record = learningRecords.find((item) => item.id === id);
    if (!record) return;
    learningForm.elements.id.value = record.id;
    learningForm.elements.title.value = record.title || "";
    learningForm.elements.date.value = record.date || localDateString();
    learningForm.elements.content.value = record.content || "";
    learningSubmitBtn.textContent = "💾 儲存學習日誌編輯";
    learningCancelBtn.hidden = false;
    const media = (record.media || []).map(photoGalleryItem).filter(Boolean);
    learningEditMedia.hidden = !media.length;
    learningEditMedia.innerHTML = media.map((item, index) => '<button class="media-card" type="button" data-learning-edit-photo="' + index + '"><img src="' + esc(item.thumbnailUrl || item.url) + '" alt="學習附件"></button>').join("");
    learningForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function saveLearningRecord(event) {
    event.preventDefault();
    const data = new FormData(learningForm);
    const files = Array.from(learningForm.elements.media?.files || []);
    const recordId = String(data.get("id") || "");
    learningStatus.className = "status";
    learningStatus.textContent = "儲存學習日誌中...";
    learningSubmitBtn.disabled = true;
    try {
      if (!files.length) {
        const body = await fetch(apiUrl(recordId ? "/api/wife-journal/learning/" + encodeURIComponent(recordId) : "/api/wife-journal/learning"), { method: recordId ? "PUT" : "POST", headers: headers(), body: data }).then(readJson);
        const index = learningRecords.findIndex((item) => item.id === body.record.id);
        if (index >= 0) learningRecords[index] = body.record; else learningRecords.unshift(body.record);
      } else {
        renderUploadStatuses(learningUploadStatus, files, "waiting");
        const uploadData = new FormData();
        ["id", "title", "date", "content"].forEach((name) => uploadData.append(name, data.get(name) || ""));
        files.forEach((file) => uploadData.append("media", file, file.name));
        const body = await fetch(apiUrl(recordId ? "/api/wife-journal/learning/" + encodeURIComponent(recordId) : "/api/wife-journal/learning"), { method: recordId ? "PUT" : "POST", headers: headers(), body: uploadData }).then(readJson);
        renderUploadStatuses(learningUploadStatus, files, "success");
        const index = learningRecords.findIndex((item) => item.id === body.record.id);
        if (index >= 0) learningRecords[index] = body.record; else learningRecords.unshift(body.record);
      }
      learningStatus.className = "status ok";
      learningStatus.textContent = "學習日誌已儲存，照片已上傳 ✨";
      renderLearningEntries();
      resetLearningForm();
    } catch (error) {
      learningStatus.className = "status error";
      learningStatus.textContent = error.message || "學習日誌儲存失敗";
      if (files.length) renderUploadStatuses(learningUploadStatus, files, "error", error.message);
    } finally { learningSubmitBtn.disabled = false; }
  }

  function setView(view) {
    const next = ["cards", "body", "clients", "learning"].includes(view) ? view : "journal";
    journalView.hidden = next !== "journal";
    cardView.hidden = next !== "cards";
    bodyView.hidden = next !== "body";
    clientView.hidden = next !== "clients";
    learningView.hidden = next !== "learning";
    document.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === next);
    });
    if (next === "cards") ensureCardsLoaded();
    if (next === "body" && !bodyLoaded) {
      loadBodyRecords().then(() => { bodyLoaded = true; }).catch(() => {});
    }
    if (next === "clients") Promise.all([ensureCardsLoaded(), loadClientPeople()]).catch(() => {});
    if (next === "learning") loadLearningRecords().catch((error) => { learningStatus.className = "status error"; learningStatus.textContent = error.message; });
  }

  function activeCards() {
    return drawMode === "osho" ? oshoCards : cards;
  }

  function cardNameOptions() {
    const deckCards = activeCards();
    const names = deckCards.map((card) => card.name || card.cardName || card.title || card.label || card.id || "").filter(Boolean);
    const optionNames = names.length ? names : (drawMode === "osho" ? [] : fallbackCards.map((card) => card.name));
    return '<option value="">選擇牌卡</option>' + optionNames.map((name) => '<option value="' + esc(name) + '">' + esc(name) + '</option>').join("");
  }

  function normalizeCards(apiCards) {
    return apiCards.map((card) => {
      const name = card.name || card.cardName || card.title || card.label || card.id || "";
      return name ? { ...card, name } : null;
    }).filter(Boolean);
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
    return activeCards().find((card) => {
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
      const label = drawMode === "three" ? threePositions[index] : (drawMode === "osho" ? "奧修單張" : "塔羅單張");
      return '<div class="card-draw-set">'
        + '<div class="card-preview">'
          + '<div class="card-thumb" data-card-thumb="' + index + '">🃏</div>'
          + '<strong data-card-preview-name="' + index + '">' + esc(label) + '</strong>'
        + '</div>'
        + '<label>牌卡<select name="cardName' + index + '">' + cardNameOptions() + '</select></label>'
        + (drawMode === "osho" ? '<input type="hidden" name="cardPosition' + index + '" value="❌">' : '<label>正逆位<select name="cardPosition' + index + '">' + cardPositionOptions("") + '</select></label>')
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
    const label = cleanCardName(input.value) || (drawMode === "three" ? threePositions[index] : (drawMode === "osho" ? "奧修單張" : "塔羅單張"));
    const url = cardImageUrl(card);
    nameEl.textContent = label;
    thumb.innerHTML = url ? '<img src="' + esc(url) + '" alt="' + esc(label) + '">' : "🃏";
  }

  function updateCardPreviews() {
    const count = drawMode === "three" ? 3 : 1;
    for (let index = 0; index < count; index += 1) updateCardPreview(index);
  }

  function setDrawMode(mode) {
    drawMode = ["three", "osho"].includes(mode) ? mode : "single";
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
      const displaySuffix = position && position !== "❌" ? position : "";
      return {
        positionIndex: index + 1,
        positionName: drawMode === "three" ? threePositions[index] : (drawMode === "osho" ? "奧修單張" : "塔羅單張"),
        cardId: parsed.id,
        cardName: parsed.name || rawName || "未抽取",
        cardLabel: parsed.label || rawName || "未抽取",
        orientation: position,
        displayName: (parsed.name || rawName || "未抽取") + displaySuffix,
      };
    });
  }

  function renderCardRecords() {
    const records = cardEntries().filter((entry) => !activeCardMonth || cardEntryMonth(entry) === activeCardMonth);
    if (!cardRecordList) return;
    if (!records.length) {
      cardRecordList.innerHTML = '<p class="muted">' + (activeCardMonth ? esc(activeCardMonth) + ' 沒有卡牌記錄 🔮' : '目前還沒有卡牌記錄 🔮') + '</p>';
      return;
    }
    cardRecordList.innerHTML = records.map((entry) => {
      const draw = entry.cardDraw || {};
      const drawCards = Array.isArray(draw.cards) && draw.cards.length
        ? draw.cards
        : [{ displayName: [draw.cardName, draw.position].filter(Boolean).join("") || "未抽取" }];
      const chips = drawCards.map((card) => '<span class="chip">' + esc(card.positionName ? card.positionName + "：" + card.displayName : card.displayName) + '</span>').join("");
      const details = [draw.question, draw.reading || entry.excerpt].filter(Boolean).map((text) => '<div class="entry-meta">' + esc(text) + '</div>').join("");
      return '<article class="card-record">'
        + '<div class="entry-title">' + esc(entry.title || "卡牌記錄") + '</div>'
        + '<div class="entry-meta">' + esc([entry.date || "", entry.time || "", draw.spreadType || (drawCards.length >= 3 ? "三張" : "單張")].filter(Boolean).join(" · ")) + '</div>'
        + '<div class="chip-row">' + chips + '</div>'
        + details
      + '</article>';
    }).join("");
  }

  function clientCardCatalog() {
    return [...cards, ...oshoCards].filter((card, index, list) => {
      const name = card.name || card.cardName || card.title || card.label || "";
      return name && list.findIndex((item) => (item.name || item.cardName || item.title || item.label || "") === name) === index;
    });
  }

  function clientCardSlotMarkup(index, card) {
    const value = typeof card === "string" ? card : (card?.name || "");
    const orientation = typeof card === "string" ? "無" : (card?.orientation || "無");
    return '<div class="client-card-slot" data-client-card-slot="' + index + '">' +
      '<input name="clientCardName' + index + '" value="' + esc(value) + '" placeholder="第 ' + (index + 1) + ' 張牌卡名稱">' +
      '<select name="clientCardOrientation' + index + '"><option value="正位"' + (orientation === "正位" ? " selected" : "") + '>正位</option><option value="逆位"' + (orientation === "逆位" ? " selected" : "") + '>逆位</option><option value="無"' + (orientation === "無" ? " selected" : "") + '>無</option></select>' +
      (index >= 3 ? '<button class="ghost remove-card" type="button" data-remove-client-card="' + index + '" title="移除此格">－</button>' : '<span></span>') +
    '</div>';
  }

  function renderClientCardFields(cards) {
    if (!clientCardFields) return;
    const values = Array.isArray(cards) && cards.length ? cards : [{ name: "", orientation: "無" }, { name: "", orientation: "無" }, { name: "", orientation: "無" }];
    clientCardFields.innerHTML = values.map((card, index) => clientCardSlotMarkup(index, card)).join("");
  }

  function collectClientCards() {
    return Array.from(clientCardFields.querySelectorAll(".client-card-slot")).map((slot) => {
      const index = slot.dataset.clientCardSlot;
      return { name: String(slot.querySelector('[name="clientCardName' + index + '"]')?.value || "").trim(), orientation: slot.querySelector('[name="clientCardOrientation' + index + '"]')?.value || "無" };
    });
  }

  async function loadClientPeople() {
    const body = await fetch(apiUrl("/api/wife-journal/clients"), { cache: "no-store", headers: headers() }).then(readJson);
    clientPeople = Array.isArray(body.people) ? body.people : [];
    renderClientPeople();
    if (activeClientId && clientPeople.some((person) => person.id === activeClientId)) {
      await loadClientRecords(activeClientId);
    } else if (clientPeople.length) {
      await loadClientRecords(clientPeople[0].id);
    } else {
      activeClientId = "";
      clientRecordsTitle.textContent = "請先新增人物 ✍️";
      clientRecordForm.hidden = true;
      clientRecordList.innerHTML = '<p class="muted">目前還沒有客戶人物。</p>';
    }
  }

  async function deleteClientPerson() {
    const personId = String(clientPersonForm.elements.id.value || "");
    const person = clientPeople.find((item) => item.id === personId);
    if (!person) return;
    const confirmed = window.confirm("確定要刪除「" + person.name + "」的人物設定嗎？\n\n人物會從列表移除，但算牌紀錄與 NAS 照片會保留。想要恢復時需要由後端資料處理。 ");
    if (!confirmed) return;
    clientPersonDeleteBtn.disabled = true;
    clientPeopleStatus.className = "status";
    clientPeopleStatus.textContent = "移除人物設定中...";
    try {
      await fetch(apiUrl("/api/wife-journal/clients/" + encodeURIComponent(personId)), { method: "DELETE", headers: headers() }).then(readJson);
      activeClientId = "";
      clientPersonForm.reset();
      clientPersonForm.elements.id.value = "";
      clientPersonDeleteBtn.hidden = true;
      document.getElementById("clientPersonSubmit").textContent = "新增人物";
      clientPeopleStatus.className = "status ok";
      clientPeopleStatus.textContent = "人物設定已移除，原有紀錄仍保留 ✨";
      await loadClientPeople();
    } catch (error) {
      clientPeopleStatus.className = "status error";
      clientPeopleStatus.textContent = error.message;
    } finally { clientPersonDeleteBtn.disabled = false; }
  }

  function renderClientPeople() {
    const query = String(clientSearchInput.value || "").trim().toLowerCase();
    const people = clientPeople.filter((person) => !query || [person.name, person.notes].some((value) => String(value || "").toLowerCase().includes(query)));
    clientPeopleList.innerHTML = people.length ? people.map((person) => (
      '<div class="client-person-row"><button class="ghost client-person-button' + (person.id === activeClientId ? ' active' : '') + '" type="button" data-client-id="' + esc(person.id) + '">' +
      '<span>👤 ' + esc(person.name) + '</span><small>' + esc(person.recordCount || 0) + ' 筆</small></button><button class="icon-button" type="button" data-client-edit-person="' + esc(person.id) + '" title="編輯人物">✏️</button></div>'
    )).join("") : '<p class="muted">找不到符合的人物。</p>';
  }

  async function loadClientRecords(personId) {
    const person = clientPeople.find((item) => item.id === personId);
    if (!person) return;
    activeClientId = personId;
    clientRecordsTitle.textContent = "👤 " + person.name + " 的算牌紀錄";
    clientRecordForm.hidden = false;
    clientRecordList.innerHTML = '<p class="muted">載入算牌紀錄中...</p>';
    renderClientPeople();
    const body = await fetch(apiUrl("/api/wife-journal/clients/" + encodeURIComponent(personId) + "/records"), { cache: "no-store", headers: headers() }).then(readJson);
    clientRecords = Array.isArray(body.records) ? body.records : [];
    renderClientRecords();
  }

  function clientRecordPhotoGallery(record) {
    return (record?.media || []).map(photoGalleryItem).filter(Boolean);
  }

  function clientMediaMarkup(record) {
    return clientRecordPhotoGallery(record).map((item, index) => {
      return '<button class="client-photo-button" type="button" data-client-record-id="' + esc(record.id) + '" data-client-photo-index="' + index + '"><img class="client-card-thumb" src="' + esc(item.thumb || item.url) + '" alt="附件照片" loading="lazy"></button>';
    }).join("");
  }

  function renderClientEditMedia(record) {
    const media = record?.media || [];
    const items = clientRecordPhotoGallery(record);
    clientEditMedia.hidden = !items.length;
    clientEditMedia.innerHTML = items.length ? items.map((item, photoIndex) => {
      const sourceItem = media.find((mediaItem) => photoGalleryItem(mediaItem)?.url === item.url);
      const mediaIndex = media.indexOf(sourceItem);
      return '<div class="client-edit-media-item"><button class="client-photo-button" type="button" data-client-record-id="' + esc(record.id) + '" data-client-photo-index="' + photoIndex + '"><img src="' + esc(item.thumb || item.url) + '" alt="附件照片" loading="lazy"></button><button class="danger" type="button" data-client-delete-media="' + mediaIndex + '">🗑️ 移除</button></div>';
    }).join("") : "";
  }

  function renderClientRecords() {
    if (!clientRecords.length) {
      clientRecordList.innerHTML = '<p class="muted">這位客戶目前還沒有算牌紀錄。</p>';
      return;
    }
    clientRecordList.innerHTML = clientRecords.map((record) => {
      const feedback = (record.feedback || []).map((item) => '<div class="client-feedback-item"><div><strong>' + esc([item.date, item.time].filter(Boolean).join(" · ")) + '</strong><br>' + esc(item.content) + '</div><div class="client-feedback-actions"><button class="icon-button" type="button" data-feedback-edit-record="' + esc(record.id) + '" data-feedback-edit-id="' + esc(item.id) + '" title="編輯反饋">✏️</button><button class="icon-button" type="button" data-feedback-delete-record="' + esc(record.id) + '" data-feedback-delete-id="' + esc(item.id) + '" title="刪除反饋">🗑️</button></div></div>').join("");
      return '<article class="client-record" data-client-record="' + esc(record.id) + '">' +
        '<div class="client-record-heading"><div><strong>' + esc([record.date, record.time].filter(Boolean).join(" · ")) + '</strong><div class="entry-meta">' + esc(record.spreadType || "") + '</div></div><div class="toolbar"><button class="ghost" type="button" data-client-edit-id="' + esc(record.id) + '">✏️ 編輯</button><button class="danger" type="button" data-client-delete-id="' + esc(record.id) + '">🗑️ 移除</button></div></div>' +
        '<p class="preserve-lines"><strong>問題：</strong>' + esc(record.question) + '</p>' +
        '<p><strong>牌陣卡牌：</strong>' + esc((record.cards || []).map((card) => typeof card === "string" ? card : [card.name, card.orientation !== "無" ? card.orientation : ""].filter(Boolean).join(" ")).join("、") || "未指定") + '</p>' +
        '<p class="preserve-lines"><strong>解讀：</strong>' + esc(record.reading || "") + '</p>' +
        '<div class="client-card-thumbs">' + clientMediaMarkup(record) + '</div>' +
        '<div class="client-feedback"><strong>💬 對方反饋</strong>' + (feedback || '<p class="muted">尚未新增反饋。</p>') +
        '<form class="client-feedback-form" data-feedback-record-id="' + esc(record.id) + '"><input type="hidden" name="feedbackId"><label>日期<input name="date" type="date" value="' + esc(new Date().toISOString().slice(0, 10)) + '"></label><label>後續回饋<textarea name="content" required placeholder="請記錄對方後續的感受、回應或新進展"></textarea></label><button class="ghost" type="submit">追加</button><button class="ghost" type="button" data-feedback-cancel>取消</button></form></div>' +
      '</article>';
    }).join("");
  }

  function resetClientRecordForm() {
    clientRecordForm.reset();
    clientRecordForm.elements.date.valueAsDate = new Date();
    clientRecordForm.elements.time.value = currentTime();
    clientRecordForm.elements.id.value = "";
    clientRecordForm.elements.spreadType.value = "2選1牌陣";
    document.getElementById("clientRecordSubmit").textContent = "✍️ 儲存算牌紀錄";
    document.getElementById("clientRecordCancel").hidden = true;
    clientUploadStatus.innerHTML = "";
    clientEditMedia.hidden = true;
    clientEditMedia.innerHTML = "";
    renderClientCardFields();
  }

  function editClientRecord(recordId) {
    const record = clientRecords.find((item) => item.id === recordId);
    if (!record) return;
    clientRecordForm.hidden = false;
    clientRecordForm.elements.id.value = record.id;
    clientRecordForm.elements.date.value = record.date || "";
    clientRecordForm.elements.time.value = record.time || "";
    clientRecordForm.elements.question.value = record.question || "";
    clientRecordForm.elements.spreadType.value = record.spreadType || "塔羅單張";
    renderClientCardFields(record.cards || []);
    clientRecordForm.elements.reading.value = record.reading || "";
    renderClientEditMedia(record);
    document.getElementById("clientRecordSubmit").textContent = "💾 儲存編輯";
    document.getElementById("clientRecordCancel").hidden = false;
    clientRecordForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function saveClientRecord(event) {
    event.preventDefault();
    if (!activeClientId) return;
    const button = document.getElementById("clientRecordSubmit");
    const formData = new FormData(clientRecordForm);
    const recordId = String(formData.get("id") || "");
    const files = Array.from(clientRecordForm.elements.media?.files || []);
    const commonFields = {
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      question: String(formData.get("question") || ""),
      spreadType: String(formData.get("spreadType") || ""),
      reading: String(formData.get("reading") || ""),
      cards: JSON.stringify(collectClientCards().filter((card) => card.name)),
    };
    const uploadStates = new Map(files.map((file) => [file, "waiting"]));
    renderClientUploadStatuses(files, uploadStates);
    button.disabled = true;
    clientRecordStatus.className = "status";
    clientRecordStatus.textContent = recordId ? "儲存編輯中... ✍️" : "新增算牌紀錄中... ✍️";
    try {
      let currentRecordId = recordId;
      let body;
      if (files.length) {
        for (const file of files) {
          uploadStates.set(file, "loading");
          renderClientUploadStatuses(files, uploadStates);
          const uploadData = new FormData();
          Object.entries(commonFields).forEach(([key, value]) => uploadData.set(key, value));
          uploadData.set("media", file);
          const path = currentRecordId
            ? "/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records/" + encodeURIComponent(currentRecordId)
            : "/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records";
          body = await fetch(apiUrl(path), { method: currentRecordId ? "PUT" : "POST", headers: headers(), body: uploadData }).then(readJson);
          if (!currentRecordId) currentRecordId = body.record && body.record.id;
          uploadStates.set(file, "ok");
          renderClientUploadStatuses(files, uploadStates);
        }
      } else {
        const saveData = new FormData();
        Object.entries(commonFields).forEach(([key, value]) => saveData.set(key, value));
        const path = currentRecordId
          ? "/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records/" + encodeURIComponent(currentRecordId)
          : "/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records";
        body = await fetch(apiUrl(path), { method: currentRecordId ? "PUT" : "POST", headers: headers(), body: saveData }).then(readJson);
      }
      clientRecordStatus.className = "status ok";
      clientRecordStatus.textContent = recordId ? "已更新算牌紀錄 ✨" : "已新增算牌紀錄 ✨";
      resetClientRecordForm();
      if (files.length) renderClientUploadStatuses(files, uploadStates);
      await loadClientPeople();
    } catch (error) {
      if (files.length) {
        const pending = files.find((file) => uploadStates.get(file) === "loading" || uploadStates.get(file) === "waiting");
        if (pending) uploadStates.set(pending, "error");
        renderClientUploadStatuses(files, uploadStates);
      }
      clientRecordStatus.className = "status error";
      clientRecordStatus.textContent = error.message;
    } finally { button.disabled = false; }
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
      showApp();
    } catch (error) {
      showGate(friendlyConnectionError(error), true);
      gateSettings.hidden = false;
      gateSettingsBtn.setAttribute("aria-expanded", "true");
    }
  }

  function openGateSettings(message, showToken) {
    gateSettings.hidden = false;
    gateSettingsBtn.setAttribute("aria-expanded", "true");
    if (showToken) {
      tokenField.hidden = false;
      toggleTokenInputBtn.setAttribute("aria-expanded", "true");
      tokenInput.focus();
    }
    gateStatus.className = "status";
    gateStatus.textContent = message || "";
  }

  async function connectFromHero() {
    const rememberedToken = localStorage.getItem("emilyhome.token") || "";
    if (!tokenInput.value.trim() && rememberedToken) tokenInput.value = rememberedToken;
    if (!tokenInput.value.trim()) {
      openGateSettings("請先在齒輪內設定密碼 Token，再點中間圖案登入 🔐", true);
      return;
    }
    await connect();
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
  libraryPanel.addEventListener("toggle", () => {
    if (libraryPanel.open) ensureLibrarySummary().catch(() => {});
  });
  document.getElementById("loadLibraryBtn").addEventListener("click", loadLibraryMonth);
  bodyYear.addEventListener("change", changeBodyMonth);
  bodyMonth.addEventListener("change", changeBodyMonth);
  cardTimelineYear.addEventListener("change", () => {
    activeCardMonth = "";
    syncCardTimelineMonths();
    activeCardMonth = cardTimelineMonth.value;
    renderCardRecords();
  });
  cardTimelineMonth.addEventListener("change", () => {
    activeCardMonth = cardTimelineMonth.value;
    renderCardRecords();
  });
  document.getElementById("cardTimelineApply").addEventListener("click", () => {
    activeCardMonth = cardTimelineMonth.value;
    renderCardRecords();
  });
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
    activeTodoDate = activeTodoDate === button.dataset.date ? "" : button.dataset.date;
    renderCalendar();
    renderEntries();
    renderTodos();
  });

  journalYear.addEventListener("change", () => {
    const months = journalEntryMonths().filter((month) => month.startsWith(journalYear.value + "-"));
    changeJournalMonth(months[0] || journalCalendarMonth());
  });

  journalMonth.addEventListener("change", () => {
    changeJournalMonth(journalMonth.value || journalCalendarMonth());
  });

  todoForm.addEventListener("submit", saveTodo);
  todoCancelBtn.addEventListener("click", resetTodoForm);
  todoRefreshBtn.addEventListener("click", () => loadTodosForMonth(journalCalendarMonth()).catch((error) => {
    todoStatus.className = "status error";
    todoStatus.textContent = error.message;
  }));
  todoList.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-todo-toggle]");
    if (checkbox) toggleTodo(checkbox.dataset.todoToggle, checkbox.checked);
  });
  todoList.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-todo-edit]");
    if (editButton) { editTodo(editButton.dataset.todoEdit); return; }
    const deleteButton = event.target.closest("[data-todo-delete]");
    if (!deleteButton) return;
    const todo = todos.find((item) => item.id === deleteButton.dataset.todoDelete);
    if (!todo || !window.confirm("確定要刪除這個待辦事項嗎？")) return;
    deleteButton.disabled = true;
    try {
      await fetch(apiUrl("/api/wife-journal/todos/" + encodeURIComponent(journalCalendarMonth()) + "/" + encodeURIComponent(todo.id)), { method: "DELETE", headers: headers() }).then(readJson);
      await loadTodosForMonth(journalCalendarMonth());
    } catch (error) { todoStatus.className = "status error"; todoStatus.textContent = error.message; }
  });

  bodyCalendar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-body-date]");
    if (!button) return;
    const hasRecords = bodyRecordsByDate().has(button.dataset.bodyDate);
    if (!hasRecords) {
      activeBodyDate = "";
      renderBodyCalendar();
      renderBodyRecords();
      return;
    }
    activeBodyDate = activeBodyDate === button.dataset.bodyDate ? "" : button.dataset.bodyDate;
    if (activeBodyDate) bodyForm.elements.date.value = activeBodyDate;
    renderBodyCalendar();
    renderBodyRecords();
  });

  bodyRecordList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-body-delete-id]");
    if (!button) return;
    if (!window.confirm("確定要刪除這筆身體記錄嗎？")) return;
    button.disabled = true;
    bodyStatus.className = "status";
    bodyStatus.textContent = "刪除中... 🌙";
    try {
      await sheetRequest("emilyBodyRecordDelete", { id: button.dataset.bodyDeleteId });
      await loadBodyRecords();
    } catch (error) {
      button.disabled = false;
      bodyStatus.className = "status error";
      bodyStatus.textContent = error.message;
    }
  });

  entryListEl.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-url]");
    if (viewButton) {
      openPhoto(viewButton.dataset.viewUrl);
      return;
    }
    const readButton = event.target.closest("[data-read-button-id]");
    if (readButton) {
      openReadEntry(readButton.dataset.readButtonId);
      return;
    }
    const button = event.target.closest("[data-edit-id]");
    if (button) {
      openEditEntry(button.dataset.editId);
      return;
    }
    const deleteButton = event.target.closest("[data-delete-id]");
    if (deleteButton) {
      deleteEntry(deleteButton.dataset.deleteId);
      return;
    }
    const entryCard = event.target.closest("[data-read-id]");
    if (entryCard) openReadEntry(entryCard.dataset.readId);
  });

  entryReaderContent.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-url]");
    if (viewButton) {
      const galleryIndex = Number(viewButton.dataset.galleryIndex);
      if (Number.isInteger(galleryIndex) && galleryIndex >= 0 && entryReaderGallery[galleryIndex]) {
        openPhotoGallery(entryReaderGallery, galleryIndex);
      } else {
        openPhoto(viewButton.dataset.viewUrl);
      }
      return;
    }
    const editButton = event.target.closest("[data-edit-id]");
    if (editButton) {
      entryReaderDialog.close();
      openEditEntry(editButton.dataset.editId);
    }
  });

  form.addEventListener("change", (event) => {
    if (event.target.matches('[name="visibility"]')) {
      updateEntryPasswordField(form);
      return;
    }
    if (!event.target.matches('input[type="file"][name="media"]')) return;
    renderUploadStatuses(entryUploadStatus, selectedUploadFiles(form), "waiting");
  });

  form.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-url]");
    if (!viewButton) return;
    openPhoto(viewButton.dataset.viewUrl);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const uploadFiles = selectedUploadFiles(form);
    renderUploadStatuses(entryUploadStatus, uploadFiles, "loading");
    button.disabled = true;
    const editId = form.dataset.entryId || "";
    statusEl.textContent = editId ? "儲存編輯中... 🧸" : "記錄中... 🧸";
    statusEl.className = "status";
    try {
      const result = await saveJournalEntryWithBatchedMedia(editId, uploadFiles);
      const body = result.body;
      const data = result.data;
      const passwordSheetSync = await syncJournalPasswordFromBrowser(body.entry || {}, data, body.passwordSheetSync);
      const syncMessage = journalPasswordSyncText(passwordSheetSync);
      statusEl.className = "status ok";
      statusEl.textContent = (editId ? "已更新：" : "已記錄：") + body.entry.title + " ✨" + syncMessage;
      renderUploadStatuses(entryUploadStatus, uploadFiles, "ok");
      resetEntryFormMode(statusEl.textContent, "status ok");
      await loadEntries();
    } catch (error) {
      statusEl.className = "status error";
      statusEl.textContent = error.message;
      renderUploadStatuses(entryUploadStatus, uploadFiles, "error", "上傳失敗");
    } finally {
      button.disabled = false;
      button.textContent = form.dataset.entryId ? "🧸 儲存編輯" : "🧸 記錄";
    }
  });

  cancelEntryEditBtn.addEventListener("click", () => {
    resetEntryFormMode("已取消編輯，回到新增心情日記 🧸");
    createCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("connectBtn").addEventListener("click", connect);
  gateHeroLoginBtn.addEventListener("click", connectFromHero);
  document.getElementById("gateSettingsBtn").addEventListener("click", () => toggleSettingsPanel("gateSettingsBtn", "gateSettings"));
  toggleTokenInputBtn.addEventListener("click", () => {
    const nextHidden = !tokenField.hidden;
    tokenField.hidden = nextHidden;
    toggleTokenInputBtn.setAttribute("aria-expanded", String(!nextHidden));
  });
  brandMenuBtn.addEventListener("click", () => {
    if (logoNav.hidden) return;
    const open = !siteHeader.classList.contains("nav-open");
    siteHeader.classList.toggle("nav-open", open);
    brandMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.getElementById("closeEntryReader").addEventListener("click", () => entryReaderDialog.close());
  entryReaderDialog.addEventListener("click", (event) => {
    if (event.target === entryReaderDialog) entryReaderDialog.close();
  });
  document.getElementById("closePhotoViewer").addEventListener("click", () => photoViewer.close());
  photoPrevBtn.addEventListener("click", () => movePhotoGallery(-1));
  photoNextBtn.addEventListener("click", () => movePhotoGallery(1));
  photoZoomInBtn.addEventListener("click", () => { photoZoom = Math.min(3, +(photoZoom + .25).toFixed(2)); renderPhotoGallery(); });
  photoZoomOutBtn.addEventListener("click", () => { photoZoom = Math.max(.5, +(photoZoom - .25).toFixed(2)); renderPhotoGallery(); });
  photoZoomResetBtn.addEventListener("click", () => { photoZoom = 1; renderPhotoGallery(); });
  photoStage.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch) return;
    photoTouchStartX = touch.clientX;
    photoTouchStartY = touch.clientY;
  }, { passive: true });
  photoStage.addEventListener("touchend", (event) => {
    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - photoTouchStartX;
    const deltaY = touch.clientY - photoTouchStartY;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;
    movePhotoGallery(deltaX < 0 ? 1 : -1);
  }, { passive: true });
  photoViewer.addEventListener("click", (event) => {
    if (event.target === photoViewer) photoViewer.close();
  });
  document.addEventListener("keydown", (event) => {
    if (!photoViewer.open) return;
    if (event.key === "ArrowLeft") movePhotoGallery(-1);
    if (event.key === "ArrowRight") movePhotoGallery(1);
  });
  document.getElementById("clearTokenBtn").addEventListener("click", () => {
    localStorage.removeItem("emilyhome.token");
    localStorage.removeItem("emilyhome.sheetToken");
    apiToken = "";
    sheetToken = "";
    tokenInput.value = "";
    sheetTokenInput.value = "";
    gateSheetTokenInput.value = "";
    showGate("已清除記住的 Token，請重新輸入 🧹", false);
    gateSettings.hidden = false;
    gateSettingsBtn.setAttribute("aria-expanded", "true");
  });
  timelineSearchBtn.addEventListener("click", () => {
    timelineSearchOpen = !timelineSearchOpen;
    timelineSearchPanel.hidden = !timelineSearchOpen;
    timelineSearchBtn.setAttribute("aria-expanded", String(timelineSearchOpen));
    if (timelineSearchOpen) timelineSearchInput.focus();
  });
  timelineSearchInput.addEventListener("input", () => {
    timelineSearchQuery = timelineSearchInput.value;
    renderEntries();
  });
  timelineSearchClearBtn.addEventListener("click", () => {
    timelineSearchQuery = "";
    timelineSearchInput.value = "";
    renderEntries();
    timelineSearchInput.focus();
  });
  learningSearchBtn.addEventListener("click", () => {
    learningSearchOpen = !learningSearchOpen;
    learningSearchPanel.hidden = !learningSearchOpen;
    learningSearchBtn.setAttribute("aria-expanded", String(learningSearchOpen));
    if (learningSearchOpen) learningSearchInput.focus();
  });
  learningSearchInput.addEventListener("input", () => { learningSearchQuery = learningSearchInput.value; renderLearningEntries(); });
  learningSearchClearBtn.addEventListener("click", () => { learningSearchQuery = ""; learningSearchInput.value = ""; renderLearningEntries(); learningSearchInput.focus(); });
  learningForm.addEventListener("submit", saveLearningRecord);
  learningCancelBtn.addEventListener("click", resetLearningForm);
  learningForm.elements.media.addEventListener("change", () => renderUploadStatuses(learningUploadStatus, Array.from(learningForm.elements.media.files || []), "waiting"));
  learningEntryList.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-learning-edit]");
    if (editButton) { editLearningRecord(editButton.dataset.learningEdit); return; }
    const photoButton = event.target.closest("[data-learning-photo]");
    if (photoButton) {
      const record = learningRecords.find((item) => item.id === photoButton.dataset.learningPhoto);
      if (record) openPhotoGallery((record.media || []).map(photoGalleryItem).filter(Boolean), Number(photoButton.dataset.learningPhotoIndex || 0));
    }
  });
  gateSheetTokenInput.addEventListener("change", () => saveSheetToken(false));
  gateSheetTokenInput.addEventListener("blur", () => saveSheetToken(false));
  sheetTokenInput.addEventListener("change", () => saveSheetToken(false));
  sheetTokenInput.addEventListener("blur", () => saveSheetToken(false));
  document.getElementById("saveSheetTokenBtn").addEventListener("click", () => saveSheetToken(true));
  document.getElementById("clearSheetTokenBtn").addEventListener("click", () => {
    sheetToken = "";
    sheetTokenInput.value = "";
    gateSheetTokenInput.value = "";
    localStorage.removeItem("emilyhome.sheetToken");
    bodyStatus.className = "status";
    bodyStatus.textContent = "已清除本機記住的試算表 Token 🧹";
  });
  document.getElementById("bodyUnlockBtn").addEventListener("click", unlockBodyRecords);
  document.getElementById("bodySetPasswordBtn").addEventListener("click", setBodyLockPassword);
  document.getElementById("bodyLockBtn").addEventListener("click", lockBodyRecords);
  document.getElementById("bodyTokenSettingsBtn").addEventListener("click", () => toggleSettingsPanel("bodyTokenSettingsBtn", "bodyTokenSettings"));
  document.getElementById("bodyLockSettingsBtn").addEventListener("click", () => toggleSettingsPanel("bodyLockSettingsBtn", "bodyLockSettings"));
  bodyForm.elements.type.addEventListener("change", updateBodyTemplateFields);
  bodyImageInput.addEventListener("change", () => {
    renderUploadStatuses(bodyImageStatus, Array.from(bodyImageInput.files || []), "waiting");
  });
  document.getElementById("refreshBtn").addEventListener("click", async () => {
    siteHeader.classList.remove("nav-open");
    brandMenuBtn.setAttribute("aria-expanded", "false");
    await loadEntries();
    if (!cardView.hidden) await ensureCardsLoaded();
    if (!bodyView.hidden) await loadBodyRecords();
    if (!clientView.hidden) await loadClientPeople();
    if (!journalView.hidden) await loadTodosForMonth(journalCalendarMonth());
    if (!journalView.hidden && libraryPanel.open) await ensureLibrarySummary();
  });
  document.getElementById("lockAppBtn").addEventListener("click", () => {
    showGate("已鎖定 Emily's Home，請重新連線 🔒", false);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
      siteHeader.classList.remove("nav-open");
      brandMenuBtn.setAttribute("aria-expanded", "false");
    });
  });
  clientPeopleList.addEventListener("click", (event) => {
    const selectButton = event.target.closest("[data-client-id]");
    if (selectButton) {
      loadClientRecords(selectButton.dataset.clientId).catch((error) => {
        clientPeopleStatus.className = "status error";
        clientPeopleStatus.textContent = error.message;
      });
      return;
    }
    const editButton = event.target.closest("[data-client-edit-person]");
    if (!editButton) return;
    const person = clientPeople.find((item) => item.id === editButton.dataset.clientEditPerson);
    if (!person) return;
    clientPersonForm.elements.id.value = person.id;
    clientPersonForm.elements.name.value = person.name || "";
    clientPersonForm.elements.notes.value = person.notes || "";
    clientPersonDeleteBtn.hidden = false;
    document.getElementById("clientPersonSubmit").textContent = "儲存人物修改";
    clientPersonForm.closest("details").open = true;
    clientPersonForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  clientSearchInput.addEventListener("input", renderClientPeople);
  clientRefreshBtn.addEventListener("click", () => loadClientPeople().catch((error) => {
    clientPeopleStatus.className = "status error";
    clientPeopleStatus.textContent = error.message;
  }));
  clientPersonForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(clientPersonForm).entries());
    const personId = String(data.id || "");
    const button = document.getElementById("clientPersonSubmit");
    button.disabled = true;
    clientPeopleStatus.className = "status";
    clientPeopleStatus.textContent = personId ? "更新人物中..." : "新增人物中...";
    try {
      const path = personId ? "/api/wife-journal/clients/" + encodeURIComponent(personId) : "/api/wife-journal/clients";
      const body = await fetch(apiUrl(path), { method: personId ? "PUT" : "POST", headers: headers({ "content-type": "application/json" }), body: JSON.stringify({ name: data.name, notes: data.notes }) }).then(readJson);
      activeClientId = body.person.id;
      clientPersonForm.reset();
      clientPersonForm.elements.id.value = "";
      clientPersonDeleteBtn.hidden = true;
      button.textContent = "新增人物";
      clientPeopleStatus.className = "status ok";
      clientPeopleStatus.textContent = personId ? "人物資料已更新 ✨" : "人物已新增 ✨";
      await loadClientPeople();
    } catch (error) {
      clientPeopleStatus.className = "status error";
      clientPeopleStatus.textContent = error.message;
    } finally { button.disabled = false; }
  });
  clientPersonDeleteBtn.addEventListener("click", deleteClientPerson);
  clientRecordForm.addEventListener("submit", saveClientRecord);
  clientRecordForm.addEventListener("change", (event) => {
    if (event.target.matches('[name="media"]')) renderUploadStatuses(clientUploadStatus, Array.from(event.target.files || []), "waiting");
  });
  addClientCardBtn.addEventListener("click", () => {
    const cards = collectClientCards();
    cards.push({ name: "", orientation: "無" });
    renderClientCardFields(cards);
  });
  clientCardFields.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-client-card]");
    if (!button) return;
    const index = Number(button.dataset.removeClientCard);
    const cards = collectClientCards();
    if (Number.isInteger(index)) cards.splice(index, 1);
    renderClientCardFields(cards);
  });
  clientRecordList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-client-delete-id]");
    if (deleteButton) {
      const recordId = deleteButton.dataset.clientDeleteId;
      const record = clientRecords.find((item) => item.id === recordId);
      if (!record || !window.confirm("確定要移除這篇算牌紀錄嗎？\n\n本篇文字、反饋與紀錄附件關聯會移除，NAS 原始照片會保留。")) return;
      deleteButton.disabled = true;
      fetch(apiUrl("/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records/" + encodeURIComponent(recordId)), { method: "DELETE", headers: headers() })
        .then(readJson)
        .then(() => {
          clientRecords = clientRecords.filter((item) => item.id !== recordId);
          if (clientRecordForm.elements.id.value === recordId) resetClientRecordForm();
          renderClientRecords();
          clientRecordStatus.className = "status ok";
          clientRecordStatus.textContent = "算牌紀錄已移除，NAS 原始照片已保留 ✨";
        })
        .catch((error) => {
          deleteButton.disabled = false;
          clientRecordStatus.className = "status error";
          clientRecordStatus.textContent = error.message;
        });
      return;
    }
    const editButton = event.target.closest("[data-client-edit-id]");
    if (editButton) { editClientRecord(editButton.dataset.clientEditId); return; }
    const photoButton = event.target.closest("[data-client-record-id]");
    if (photoButton) {
      const record = clientRecords.find((item) => item.id === photoButton.dataset.clientRecordId);
      if (record) openPhotoGallery(clientRecordPhotoGallery(record), Number(photoButton.dataset.clientPhotoIndex || 0));
      return;
    }
    const feedbackEditButton = event.target.closest("[data-feedback-edit-id]");
    if (feedbackEditButton) {
      const record = clientRecords.find((item) => item.id === feedbackEditButton.dataset.feedbackEditRecord);
      const feedback = record?.feedback?.find((item) => item.id === feedbackEditButton.dataset.feedbackEditId);
      const feedbackForm = feedbackEditButton.closest(".client-record")?.querySelector("[data-feedback-record-id]");
      if (feedback && feedbackForm) {
        feedbackForm.elements.feedbackId.value = feedback.id;
        feedbackForm.elements.date.value = feedback.date || "";
        feedbackForm.elements.content.value = feedback.content || "";
        feedbackForm.querySelector('button[type="submit"]').textContent = "儲存修改";
        feedbackForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      return;
    }
    const feedbackCancelButton = event.target.closest("[data-feedback-cancel]");
    if (feedbackCancelButton) {
      const feedbackForm = feedbackCancelButton.closest("[data-feedback-record-id]");
      if (feedbackForm) {
        feedbackForm.reset();
        feedbackForm.elements.feedbackId.value = "";
        feedbackForm.querySelector('button[type="submit"]').textContent = "追加";
      }
      return;
    }
    const feedbackDeleteButton = event.target.closest("[data-feedback-delete-id]");
    if (feedbackDeleteButton) {
      if (!window.confirm("確定要刪除這則對方反饋嗎？")) return;
      fetch(apiUrl("/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records/" + encodeURIComponent(feedbackDeleteButton.dataset.feedbackDeleteRecord) + "/feedback/" + encodeURIComponent(feedbackDeleteButton.dataset.feedbackDeleteId)), { method: "DELETE", headers: headers() })
        .then(readJson).then(() => loadClientRecords(activeClientId)).catch((error) => {
          clientRecordStatus.className = "status error";
          clientRecordStatus.textContent = error.message;
        });
    }
  });
  clientEditMedia.addEventListener("click", async (event) => {
    const photoButton = event.target.closest("[data-client-record-id]");
    if (photoButton) {
      const record = clientRecords.find((item) => item.id === photoButton.dataset.clientRecordId);
      if (record) openPhotoGallery(clientRecordPhotoGallery(record), Number(photoButton.dataset.clientPhotoIndex || 0));
      return;
    }
    const deleteButton = event.target.closest("[data-client-delete-media]");
    if (!deleteButton) return;
    const recordId = String(clientRecordForm.elements.id.value || "");
    if (!activeClientId || !recordId || !window.confirm("確定要移除這張附件照片嗎？\n\n只會解除本篇算牌紀錄的附件關聯，NAS 原始照片會保留。")) return;
    deleteButton.disabled = true;
    try {
      const body = await fetch(apiUrl("/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records/" + encodeURIComponent(recordId) + "/media/" + encodeURIComponent(deleteButton.dataset.clientDeleteMedia)), { method: "DELETE", headers: headers() }).then(readJson);
      const record = body.record;
      const index = clientRecords.findIndex((item) => item.id === recordId);
      if (index >= 0) clientRecords[index] = record;
      renderClientEditMedia(record);
      renderClientRecords();
      clientRecordStatus.className = "status ok";
      clientRecordStatus.textContent = "附件已從本篇紀錄移除，NAS 照片已保留 ✨";
    } catch (error) {
      clientRecordStatus.className = "status error";
      clientRecordStatus.textContent = error.message;
      deleteButton.disabled = false;
    }
  });
  clientRecordList.addEventListener("submit", async (event) => {
    const feedbackForm = event.target.closest("[data-feedback-record-id]");
    if (!feedbackForm) return;
    event.preventDefault();
    const content = feedbackForm.elements.content.value.trim();
    if (!content) return;
    const feedbackId = String(feedbackForm.elements.feedbackId.value || "");
    const button = feedbackForm.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      const feedbackPath = "/api/wife-journal/clients/" + encodeURIComponent(activeClientId) + "/records/" + encodeURIComponent(feedbackForm.dataset.feedbackRecordId) + "/feedback";
      await fetch(apiUrl(feedbackId ? feedbackPath + "/" + encodeURIComponent(feedbackId) : feedbackPath), { method: feedbackId ? "PUT" : "POST", headers: headers({ "content-type": "application/json" }), body: JSON.stringify({ date: feedbackForm.elements.date.value, content }) }).then(readJson);
      await loadClientRecords(activeClientId);
    } catch (error) {
      clientRecordStatus.className = "status error";
      clientRecordStatus.textContent = error.message;
      button.disabled = false;
    }
  });
  document.getElementById("clientRecordCancel").addEventListener("click", resetClientRecordForm);
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
    const spreadType = drawMode === "three" ? "塔羅三張" : (drawMode === "osho" ? "奧修單張" : "塔羅單張");
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
    data.set("cardPosition", drawMode === "three" ? "塔羅三張" : (cardsDrawn[0]?.orientation || ""));
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
      activeCardMonth = date.slice(0, 7);
      await loadEntries();
    } catch (error) {
      cardStatus.className = "status error";
      cardStatus.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });
  bodyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = bodyForm.querySelector("button[type='submit']");
    const data = new FormData(bodyForm);
    const date = data.get("date");
    const type = data.get("type");
    const imageFiles = type === "氣喘" ? Array.from(bodyImageInput.files || []) : [];
    button.disabled = true;
    bodyStatus.className = "status";
    bodyStatus.textContent = "寫入身體記錄中... 🌙";
    try {
      const imageMedia = await uploadBodyImages(imageFiles, date);
      const imageUrls = imageMedia.map((item) => mediaUrl(item.originalUrl || item.thumbnailUrl || item.url || "", item.fileName || "")).filter(Boolean);
      await sheetRequest("emilyBodyRecordWrite", {
        date,
        time: currentTime(),
        type,
        severity: "",
        flow: data.get("flow"),
        painLevel: data.get("painLevel"),
        asthmaTrigger: data.get("asthmaTrigger"),
        medicineUsed: "",
        notes: imageUrls.map((url) => "圖片附件：" + url).join(","),
        source: "EmilyHome",
      });
      bodyYear.value = String(date).slice(0, 4);
      bodyMonth.value = String(date).slice(5, 7);
      activeBodyDate = date;
      bodyForm.reset();
      bodyForm.elements.date.value = date;
      bodyImageStatus.innerHTML = "";
      updateBodyTemplateFields();
      await loadBodyRecords();
      bodyStatus.className = "status ok";
      bodyStatus.textContent = "已寫入身體記錄 ✨";
    } catch (error) {
      bodyStatus.className = "status error";
      bodyStatus.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });
  function currentTime() {
    const now = new Date();
    return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
  }
  form.elements.date.valueAsDate = new Date();
  form.elements.time.value = currentTime();
  cardForm.elements.date.valueAsDate = new Date();
  cardForm.elements.time.value = currentTime();
  setupBodyFilters();
  updateBodyTemplateFields();
  renderBodyCalendar();
  renderBodyRecords();
  resetTodoForm();
  renderCardDrawFields();
  renderTagPicker();
  clientRecordForm.elements.date.valueAsDate = new Date();
  clientRecordForm.elements.time.value = currentTime();
  renderClientCardFields();
})();
