// Define DOM variables
const booksContainer = document.querySelector(".books-container");
const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#pages-number");
const readStatusInput = document.querySelector("#read-status");
const buttonInput = document.querySelector(".btn");
const btnAddNewBook = document.querySelector(".btn-add-new-book");
const newBookForm = document.querySelector(".new-book");

// Define arrow function modules to be called later

const mySecModule = (() => {

   function _removeCard(e) {
     e.target.parentNode.remove();
     bookIndex = e.target.parentNode.getAttribute("data-idx");
     myLibrary.splice(bookIndex, 1);
     libraryController.saveLocal(myLibrary);
     libraryController.clearBooks();
     libraryController.loadBooks(myLibrary);
   }

   function _switchReadStatus(e) {
     // switch button and read status for a book
     libraryController.clearBooks();
     libraryController.loadBooks(myLibrary);
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

     libraryController.saveLocal(myLibrary);
     libraryController.clearBooks();
     libraryController.loadBooks(myLibrary);
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
    changeReadStatusBtn.addEventListener("click", _switchReadStatus);

    let removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove Book";
    removeBtn.addEventListener("click", _removeCard);

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

  return { addBookToLibrary };
})();

const myModule = (() =>{
  
  const setMyLibrary = () => {
    let myLibrary = '';
    if (localStorage.getItem("myLibrary") !== null) {
      myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
      } else {
      myLibrary = [];
      }
    return myLibrary;
  }
  
  const loadBooks = (library) => {
      library.forEach((book) => {
      const mySecModuleLocal = mySecModule;
      mySecModuleLocal.addBookToLibrary(book);
    });
  }
  
  const clearBooks = () => {
    container = document.querySelector(".books-container");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  
  const createNewBook = () => {
    if (
      bookTitleInput.value == "" ||
      bookAuthorInput.value == "" ||
      pagesInput.value == ""
    ) {
      alert("You must complete all fields.");
    } else {
      let title = bookTitleInput.value;
      let author = bookAuthorInput.value;
      let pages = pagesInput.value;
      let status = readStatusInput.checked;
      let book = { title, author, pages, status };
      myLibrary.push(book);
      saveLocal(myLibrary);
      clearBooks();
      loadBooks(myLibrary);
    }
  }
  
  const openForm = () => {
    if (newBookForm.style.display === "flex") {
      newBookForm.style.display = "none";
    } else {
      newBookForm.style.display = "flex";
    }
  }
  
  const saveLocal = (myLibrary) => {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }

  return { setMyLibrary, loadBooks, clearBooks, createNewBook, openForm, saveLocal };
  
})();
// End of function module

const libraryController = myModule;
let myLibrary = libraryController.setMyLibrary();

// Load books if it's something on localStorage
if (myLibrary !== '') {
  libraryController.loadBooks(myLibrary);
}

// Add listeners for main add book button
buttonInput.addEventListener("click", libraryController.createNewBook);
btnAddNewBook.addEventListener("click", libraryController.openForm);
