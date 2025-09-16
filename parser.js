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

/**
 * Функция для определения валюты
 * @param {*} currencyIn
 * @returns
 */
function currency(currencyIn) {
  if (currencyIn === "₽") {
    return "RUB";
  }
  if (currencyIn === "$") {
    return "USD";
  }
  if (currencyIn === "€") {
    return "€";
  }
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
  let price = +document
    .querySelector("div .price")
    .firstChild.textContent.replace(/[^0-9]/g, "");
  let oldPrice = +document
    .querySelector("div .price")
    .lastElementChild.textContent.replace(/[^0-9]/g, "");
  let discount = oldPrice - price;
  let discountPercent = (discount / oldPrice) * 100;
  let currencyIn = document
    .querySelector("div .price")
    .firstChild.nodeValue.replace(/[0-9]+/g, "")
    .trim();

  return {
    id: document.querySelector(".product").dataset.id,
    name: document.querySelector("h1").textContent,
    isLiked: document
      .querySelector("figure button")
      .classList.contains("active"),
    tags: parseProductTags(),
    price: price,
    oldPrice: oldPrice,
    discount: discount,
    discountPercent: discountPercent + "%",
    currency: currency(currencyIn),
    properties: parseProductProperties(),
    description: document.querySelector("div.description").textContent,
    images: parseProductiImages(),
  };
}

//    ,

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

function parseProductProperties() {
  let liItems = document.querySelectorAll("ul.properties li");
  let data = {};
  liItems.forEach((item) => {
    let spans = item.querySelectorAll("span");

    //Переделать
    let key = spans[0].textContent.trim();
    let value = spans[1].textContent.trim();

    data[key] = value;
  });
  return { properties: data };
}

function parseProductiImages() {
  let imgItems = document.querySelectorAll("nav button img");
  let data = [];

  imgItems.forEach((img) => {
    let preview = img.getAttribute("src");
    let full = img.getAttribute("data-src");
    let alt = img.getAttribute("alt");
    let obj = { preview: preview, full: full, alt: alt };
    data.push(obj);
  });
  return data;
}

// Разбор данных suggested
function parseSuggested() {
  let suggested = [];

  let items = document.querySelectorAll("section.suggested article");

  items.forEach((article) => {
    let currencyIn = article
      .querySelector("b")
      .textContent.replace(/[0-9]+/g, "")
      .trim();

    let prod = {
      name: article.querySelector("h3").textContent,
      description: article.querySelector("p").textContent,
      image: article.querySelector("img").getAttribute("src"),
      price: +article.querySelector("b").textContent.replace(/[^0-9]/g, ""),
      currency: currency(currencyIn),
    };
    suggested.push(prod);
  });
  return suggested;
}

// Разбор данных reviews
function parseReviews() {
  let reviews = [];

  let ownReview = document.querySelectorAll("section.reviews article");

  ownReview.forEach((el) => {
    let author = {
      avatar: el.querySelector(".author img").getAttribute("src"),
      name: el.querySelector(".author span").textContent,
    };

    let date = el.querySelector(".author i").textContent;

    let review = {
      rating: el.querySelectorAll(".rating span.filled").length,
      author: author,
      title: el.querySelector("h3").textContent,
      description: el.querySelector("p").textContent,
      date: parseReviewsDate(date),
    };
    reviews.push(review);
  });
  return reviews;
}

function parseReviewsDate(date) {
  let dateParts = date.split("/");
  let formattedDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;
  return formattedDate;
}

// Главная функция
function parsePage() {
  return {
    meta: parseMeta(),
    product: parseProduct(),
    suggested: parseSuggested(),
    reviews: parseReviews(),
  };
}

window.parsePage = parsePage;
