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
function parseProduct() {
  return {
    id: document.querySelector(".product").dataset.id,
    name: document.querySelector("h1").textContent,
    isLiked: document
      .querySelector("figure button")
      .classList.contains("active"),
    tags: parseProductTags(),
  };
}

// "product": {
//     "tags": {
//       "category": [
//         "tag1"
//       ],
//       "discount": [
//         "tag3"
//       ],
//       "label": [
//         "tag2"
//       ]
//     },
//     "price": 50,
//     "oldPrice": 80,
//     "discount": 30,
//     "discountPercent": "37.50%",
//     "currency": "RUB",
//     "properties": {
//       "key1": "value1",
//       "key2": "value2",
//       "key3": "value3"
//     },
//     "description": "<h3>Title</h3>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>",
//     "images": [
//       {
//         "preview": "https://placehold.co/92x66?text=1",
//         "full": "https://placehold.co/600?text=1",
//         "alt": "slide1"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=2",
//         "full": "https://placehold.co/600?text=2",
//         "alt": "slide2"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=3",
//         "full": "https://placehold.co/600?text=3",
//         "alt": "slide3"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=4",
//         "full": "https://placehold.co/600?text=4",
//         "alt": "slide4"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=5",
//         "full": "https://placehold.co/600?text=5",
//         "alt": "slide5"
//       }
//     ]
//   },

function parseProductTags() {
  let category = [];
  let discount = [];
  let label = [];

  let tags = document.querySelectorAll(".tags span");

  tags.forEach((tag) => {
    if (tag.classList.contains("green") === true) {
      category.push(tag.textContent);
    }
    if (tag.classList.contains("blue") === true) {
      label.push(tag.textContent);
    }
    if (tag.classList.contains("red") === true) {
      discount.push(tag.textContent);
    }
  });
  //Добавить очищение от лишних пробелов для tag.textContent через отдельную функцию
  return { category: category, discount: discount, label: label };
}

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
    product: parseProduct(),
    suggested: [],
    reviews: [],
  };
}

window.parsePage = parsePage;
