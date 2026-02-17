const bibles = document.getElementById("bible-select");
const books = document.getElementById("book-select");
const chapters = document.getElementById("chapter-select");
const verses = document.getElementById("verses");

bibles.addEventListener("change", loadBooks);
books.addEventListener("change", loadChapters);
chapters.addEventListener("change", loadVerses);

function loadBibles() {
  resetBibles();
  const myHeaders = new Headers();

  myHeaders.append("Accept", "*/*");
  myHeaders.append("api-key", "ba3ccb7438359e4d7ac826186cf25e97");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://api.scripture.api.bible/v1/bibles?language=eng",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => populateBibleList(result))
    .catch((error) => console.error(error));
}

function resetSelectList(selectList) {
  selectList.innerHTML = "";
  const emptyOption = generateSelectListOption("---", "");
  selectList.appendChild(emptyOption);
}

function resetBibles() {
  resetSelectList(bibles);
  resetBooks();
}
function resetBooks() {
  resetSelectList(books);
  resetChapters();
}
function resetChapters() {
  resetSelectList(chapters);
  resetVerses();
}
function resetVerses() {
  verses.innerHTML = "";
}

function loadBooks() {
  resetBooks();
  if (bibles.value === "") {
    return;
  }
  const myHeaders = new Headers();

  myHeaders.append("Accept", "*/*");
  myHeaders.append("api-key", "ba3ccb7438359e4d7ac826186cf25e97");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://api.scripture.api.bible/v1/bibles/" + bibles.value + "/books",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => populateBookList(result))
    .catch((error) => console.error(error));
}
function loadChapters() {
  resetChapters();
  if (bibles.value === "" || books.value === "") {
    return;
  }
  const myHeaders = new Headers();

  myHeaders.append("Accept", "*/*");
  myHeaders.append("api-key", "ba3ccb7438359e4d7ac826186cf25e97");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://api.scripture.api.bible/v1/bibles/" +
      bibles.value +
      "/books/" +
      books.value +
      "/chapters",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => populateChapterList(result))
    .catch((error) => console.error(error));
}
function loadVerses() {
  resetVerses();
  if (bibles.value === "" || chapters.value === "") {
    return;
  }
  const myHeaders = new Headers();

  myHeaders.append("Accept", "*/*");
  myHeaders.append("api-key", "ba3ccb7438359e4d7ac826186cf25e97");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://api.scripture.api.bible/v1/bibles/" +
      bibles.value +
      "/chapters/" +
      chapters.value,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => populateVerses(result))
    .catch((error) => console.error(error));
}

function populateBibleList(responseBody) {
  bibles.innerHTML = "";
  const emptyOption = generateSelectListOption("---", "");
  bibles.appendChild(emptyOption);
  responseBody.data.forEach((bible) => {
    const option = generateSelectListOption(bible.name, bible.id);
    bibles.appendChild(option);
  });
}
function populateBookList(responseBody) {
  books.innerHTML = "";
  const emptyOption = generateSelectListOption("---", "");
  books.appendChild(emptyOption);
  responseBody.data.forEach((book) => {
    const option = generateSelectListOption(book.name, book.id);
    books.appendChild(option);
  });
}
function populateChapterList(responseBody) {
  chapters.innerHTML = "";
  const emptyOption = generateSelectListOption("---", "");
  chapters.appendChild(emptyOption);
  responseBody.data.forEach((chapter) => {
    const option = generateSelectListOption(chapter.number, chapter.id);
    chapters.appendChild(option);
  });
}

function populateVerses(responseBody) {
  verses.innerHTML = responseBody.data.content;
}

function generateSelectListOption(displayText, value) {
  const option = document.createElement("option");
  option.textContent = displayText;
  option.value = value;
  return option;
}

loadBibles();
