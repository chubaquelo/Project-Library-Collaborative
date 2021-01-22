const booksContainer = document.querySelector(".books-container");
const bookTitleInput = document.querySelector("#book-title");
const bookDescriptionInput = document.querySelector("#book-description");
const pagesInput = document.querySelector("#pages-number");
const readStatusInput = document.querySelector("#read-status");
const buttonInput = document.querySelector(".btn");

let myLibrary = [];

buttonInput.addEventListener("click", createNewBook);


function createNewBook() {
  let title = bookTitleInput.value;
  let desc = bookDescriptionInput.value;
  let pages = pagesInput.value;
  let status = readStatusInput.checked;

  let book = Book(title, desc, pages, status);
  addBookToLibrary(book);
}

function Book(title, description, pages, read) {
  return { title, description, pages, read };
  // the constructor...
}

function addNewBook() {
  let addNew = document.querySelector(".new-book");
  if (addNew.style.display === "flex") {
    addNew.style.display = "none";
  } else {
    addNew.style.display = "flex"
  }
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);

  let bookCard = document.createElement('div');
  bookCard.className = 'book-card';
  bookCard.setAttribute('data-idx', myLibrary.indexOf(book));

  let bookTitle = document.createElement('h1');
  bookTitle.textContent = book.title;

  let bookDescription = document.createElement('p');
  bookDescription.textContent = book.description;
  bookDescription.className = 'description';

  let bookPages = document.createElement('p');
  bookPages.textContent = 'Has ' + book.pages + ' pages.';
  bookPages.className = 'pages';

  let readStatus = document.createElement('p');
  if (book.read === true) {
    readStatus.textContent = 'You have read this book.';
  } else {
    readStatus.textContent = 'You have not read this book.';
  }
  readStatus.className = 'read-status-text';

  let changeReadStatusBtn = document.createElement('button');
  changeReadStatusBtn.className = 'read-switch-btn';
  
  if (book.read === true) {
    changeReadStatusBtn.textContent = "Unread";
  } else {
    changeReadStatusBtn.textContent = "Read";
  }
  changeReadStatusBtn.addEventListener("click", switchReadStatus);

  let removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
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
  bookIndex = e.target.parentNode.getAttribute('data-idx');
  myLibrary.splice(bookIndex, 1);
}

function switchReadStatus(e) {
  // switch button and read status for a book
  bookIndex = e.target.parentNode.getAttribute('data-idx');
  book = myLibrary[bookIndex];
  let text = e.target.parentNode.querySelector(".read-status-text");
  
  if (book.read === true) {
    book.read = false;
    e.target.textContent = "Read";
    text.textContent = "You have not read this book.";
  } else {
    book.read = true;
    e.target.textContent = "Unread";
    text.textContent = "You have read this book.";
  }
}

myLibrary.forEach((book) => addBookToLibrary(book));
