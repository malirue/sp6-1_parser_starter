// Разбор данных meta
function parseMeta() {}

function parseMetaKeywords() {}

function parseMetaOpengraph() {}

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
    meta: {},
    product: {},
    suggested: [],
    reviews: [],
  };
}

window.parsePage = parsePage;
