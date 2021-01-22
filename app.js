const booksContainer = document.querySelector(".books-container");
const bookTitleInput = document.querySelector("#book-title");
const bookDescriptionInput = document.querySelector("#book-description");
const pagesInput = document.querySelector("#pages-number");
const readStatusInput = document.querySelector("#read-status");
const buttonInput = document.querySelector(".btn");

let myLibrary = [
  {
    title: "Book 1",
    description: "Description 1",
    pages: "950",
    readStatus: false,
  },
  {
    title: "Book 2",
    description: "Description 2",
    pages: "850",
    readStatus: true,
  },
  {
    title: "Book 3",
    description: "Description 3",
    pages: "750",
    readStatus: false,
  },
  {
    title: "Book 4",
    description: "Description 5",
    pages: "650",
    readStatus: false,
  },
];

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
  if (addNew.style.display === "none") {
    addNew.style.display = "flex";
  } else {
    addNew.style.display = "none"
  }
}

function addBookToLibrary(book) {
  // do stuff here
  let bookCard = document.createElement('div');
  bookCard.className = 'book-card';

  let bookTitle = document.createElement('h1');
  bookTitle.textContent = book.title;

  let bookDescription = document.createElement('p');
  bookDescription.textContent = book.description;
  bookDescription.className = 'description';

  let bookPages = document.createElement('p');
  bookPages.textContent = 'Has ' + book.pages + ' pages.';
  bookPages.className = 'pages';

  let readStatus = document.createElement('p');
  if (book.readStatus === true) {
    readStatus.textContent = 'You have read this book.';
  } else {
    readStatus.textContent = 'You have not read this book.';
  }

  bookCard.append(bookTitle, bookDescription, bookPages, readStatus);
  booksContainer.appendChild(bookCard);
}

myLibrary.forEach((book) => addBookToLibrary(book));
