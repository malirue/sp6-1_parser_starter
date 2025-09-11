/**
 * Функция для разбиения строки на части по определенному
 * символу для преобразования в массив
 * +чистка от ненужных пробелов
 * @param {string} str - строка, которую нужно разделить по символу
 * @param {string} symbol - символ, по коротому нужно разделить
 * @returns массив с  элементами без пробелов в начале и конце
 */
function splitAndClean(str, symbol) {
  return str.split(symbol).map((el) => el.trim());
}

// Разбор данных meta
function parseMeta() {
  return {
    title: document.querySelector("title").textContent,
    description: document
      .querySelector("meta[name='description']")
      .getAttribute("content"),
    keywords: parseMetaKeywords(),
    language: document.querySelector("html").getAttribute("lang"),
    opengraph: parseMetaOpengraph(),
  };
}

function parseMetaKeywords() {
  let keywords = document
    .querySelector("meta[name='keywords']")
    .getAttribute("content");
  return splitAndClean(keywords, ",");
}

function parseMetaOpengraph() {
  let rez = {
    title: document
      .querySelector("meta[property='og:title']")
      .getAttribute("content"),
    image: document
      .querySelector("meta[property='og:image']")
      .getAttribute("content"),
    type: document
      .querySelector("meta[property='og:type']")
      .getAttribute("content"),
  };
  return rez;
}

// Разбор данных product
function parseProduct() {}

function parseProductTags() {}

function parseProductProperties() {}

function parseProductiImages() {}

// Разбор данных suggested
// ------побочные функции ещё не определила
function parseSuggested() {}

// Разбор данных reviews
// ------побочные функции ещё не определила
function parseReviews() {}

// Главная функция
function parsePage() {
  return {
    meta: parseMeta(),
    product: {},
    suggested: [],
    reviews: [],
  };
}

window.parsePage = parsePage;
