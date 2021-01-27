let myLibrary = [];

function setMyLibrary() {
  if (localStorage.getItem("myLibrary") !== null) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    loadBooks();
  } else {
    myLibrary = [];
  }
}

const booksContainer = document.querySelector(".books-container");
const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#pages-number");
const readStatusInput = document.querySelector("#read-status");
const buttonInput = document.querySelector(".btn");
const btnAddNewBook = document.querySelector(".btn-add-new-book");
const newBookForm = document.querySelector(".new-book");

buttonInput.addEventListener("click", createNewBook);

function createNewBook() {
  if (bookTitleInput.value == "" || bookAuthorInput.value == "" || pagesInput.value == "") {
    alert('You must complete all fields.');
  } else {
    let title = bookTitleInput.value;
    let author = bookAuthorInput.value;
    let pages = pagesInput.value;
    let status = readStatusInput.checked;

    let book = new Book(title, author, pages, status)

    function Book(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }
    myLibrary.push(book);
    saveLocal(myLibrary);
    clearBooks();
    loadBooks();
  }
}

setMyLibrary();

btnAddNewBook.addEventListener("click", openForm);

function openForm() {
  if (newBookForm.style.display === "flex") {
    newBookForm.style.display = "none";
  } else {
    newBookForm.style.display = "flex";
  }
}

function addNewBook() {
  if (newBookForm.style.display === "flex") {
    newBookForm.style.display = "none";
  } else {
    newBookForm.style.display = "flex";
  }
}

function saveLocal(myLibrary) {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


function clearBooks() {
  container = document.querySelector('.books-container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function loadBooks() {
  myLibrary.forEach((book) => {
    addBookToLibrary(book)
  }
  )
}

function addBookToLibrary(book) {
  let bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.setAttribute("data-idx", myLibrary.indexOf(book));

  let bookTitle = document.createElement("h1");
  bookTitle.textContent = book.title;

  let bookDescription = document.createElement("p");
  bookDescription.textContent = book.author;
  bookDescription.className = "description";

  let bookPages = document.createElement("p");
  bookPages.textContent = "Has " + book.pages + " pages.";
  bookPages.className = "pages";

  let readStatus = document.createElement("p");
  if (book.status === true) {
    readStatus.textContent = "You have read this book.";
  } else {
    readStatus.textContent = "You have not read this book.";
  }
  readStatus.className = "read-status-text";

  let changeReadStatusBtn = document.createElement("button");
  changeReadStatusBtn.className = "read-switch-btn";

  if (book.status === true) {
    changeReadStatusBtn.textContent = "Unread";
  } else {
    changeReadStatusBtn.textContent = "Read";
  }
  changeReadStatusBtn.addEventListener("click", switchReadStatus);

  let removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove Book";
  removeBtn.addEventListener("click", removeCard);

  bookCard.append(
    bookTitle,
    bookDescription,
    bookPages,
    readStatus,
    changeReadStatusBtn,
    removeBtn
  );
  booksContainer.appendChild(bookCard);
}

function removeCard(e) {
  e.target.parentNode.remove();
  bookIndex = e.target.parentNode.getAttribute("data-idx");
  myLibrary.splice(bookIndex, 1);
  saveLocal(myLibrary);
  clearBooks();
  loadBooks();
}

function switchReadStatus(e) {
  clearBooks();
  loadBooks();
  bookIndex = e.target.parentNode.getAttribute("data-idx");
  book = myLibrary[bookIndex];
  let text = e.target.parentNode.querySelector(".read-status-text");

  if (book.status === true) {
    book.status = false;
    e.target.textContent = "Read";
    text.textContent = "You have not read this book.";
  } else {
    book.status = true;
    e.target.textContent = "Unread";
    text.textContent = "You have read this book.";
  }

  saveLocal(myLibrary);
  clearBooks();
  loadBooks(myLibrary);

}
