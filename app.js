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
const bookDescriptionInput = document.querySelector("#book-description");
const pagesInput = document.querySelector("#pages-number");
const readStatusInput = document.querySelector("#read-status");
const buttonInput = document.querySelector(".btn");
const btnAddNewBook = document.querySelector(".btn-add-new-book");
const newBookForm = document.querySelector(".new-book");

buttonInput.addEventListener("click", createNewBook);

function createNewBook() {
  let title = bookTitleInput.value;
  let desc = bookDescriptionInput.value;
  let pages = pagesInput.value;
  let status = readStatusInput.checked;

  let book = {title, desc, pages, status};
  addBookToLibrary(book);
  myLibrary.push(book);
  saveLocal(myLibrary);
}

// function Book(title, description, pages, read) {
//   return { title, description, pages, read };
//   // the constructor...
// }

setMyLibrary();

btnAddNewBook.addEventListener("click", openForm);

function openForm() {
  newBookForm.style.display = "flex";
}

function saveLocal(myLibrary) {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function addNewBook() {
  let addNew = document.querySelector(".new-book");
  if (addNew.style.display === "flex") {
    addNew.style.display = "none";
  } else {
    addNew.style.display = "flex";
  }
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
  // do stuff here
  let bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.setAttribute("data-idx", myLibrary.indexOf(book));

  let bookTitle = document.createElement("h1");
  bookTitle.textContent = book.title;

  let bookDescription = document.createElement("p");
  bookDescription.textContent = book.description;
  bookDescription.className = "description";

  let bookPages = document.createElement("p");
  bookPages.textContent = "Has " + book.pages + " pages.";
  bookPages.className = "pages";

  console.log(book);

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
  // switch button and read status for a book
  clearBooks();
  loadBooks();
  bookIndex = e.target.parentNode.getAttribute("data-idx");
  book = myLibrary[bookIndex];
  let text = e.target.parentNode.querySelector(".read-status-text");

  if (book.status === false) {
    book.status = true;
    e.target.textContent = "Unread";
    text.textContent = "You have read this book.";
  } else {
    book.status = false;
    e.target.textContent = "Read";
    text.textContent = "You have not read this book.";
  }

  saveLocal(myLibrary);
  // loadBooks(myLibrary);

}

// myLibrary.forEach((book) => addBookToLibrary(book));
