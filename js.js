const bookArea = document.querySelector(".main-content");

let library = [];

function Book(title, author, pageCount, readOrNot) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readOrNot = readOrNot;
  let result = "";

  this.info = function () {
    if (title && author && pageCount && readOrNot) {
      result = title + " by " + author + ", " + pageCount + " pages, ";
      readOrNot ? (result += "read") : (result += "not read yet");
      return result;
    }
  };
}

function addBook(Book) {
  if (checkIfBookInLibrary(Book) && library.length != 0) {
    return;
  }
  library.push(Book);
  displayBook(Book);
}

function displayBook(Book) {
  if (library.length > 0) {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookArea.appendChild(bookDiv);

    let index = document.createAttribute("data-index");
    index.value = (library.length - 1).toString();
    document.querySelector(".book:last-child").setAttributeNode(index);

    let bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookDiv.appendChild(bookTitle);
    bookTitle.textContent = Book.title;

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookDiv.appendChild(bookAuthor);
    bookAuthor.textContent = Book.author;

    let bookPageCount = document.createElement("div");
    bookPageCount.classList.add("book-page-count");
    bookDiv.appendChild(bookPageCount);
    bookPageCount.textContent = Book.pageCount;

    let bookReadOrNot = document.createElement("div");
    bookReadOrNot.classList.add("book-read-or-not");
    bookDiv.appendChild(bookReadOrNot);
    bookReadOrNot.textContent = Book.readOrNot;

    let actions = document.createElement("div");
    actions.classList.add("actions");
    bookDiv.appendChild(actions);

    let removeButton = document.createElement("button");
    actions.appendChild(removeButton);
    removeButton.classList.add("remove-button");
    removeButton.textContent = "REMOVE";
    //Get data index of the parent element of the parent element, fetch the book in the library at that index and send it over to removeBook function

    let readButton = document.createElement("button");
    actions.appendChild(readButton);
    readButton.classList.add("read-button");
    readButton.textContent = "Read?";
    //Get data index of the parent element of the parent element, fetch the book in the library at that index and send it over to switchReadStatus function
  }
}

function removeBook(Book) {
  if (checkIfBookInLibrary(Book)) {
    for (let i = 0; i < library.length; i++) {
      if (
        Book.title == library[i].title &&
        Book.author == library[i].author &&
        Book.pageCount == library[i].pageCount
      ) {
        library.splice(i, 1);
        removeBookFromDisplay(i.toString());
      }
    }
  }
}

function removeBookFromDisplay(index) {
  //let book = document.querySelector("[data-index=" + `"'${index}'"`) + "]";
  let bookToRemove = bookArea.getElementsByClassName("book")[parseInt(index)];
  bookArea.removeChild(bookToRemove);
  reorderDataAttributes();
}

function reorderDataAttributes() {
  let books = document.getElementsByClassName("book");
  for (let i = 0; i < library.length; i++) {
    books[i].setAttribute("data-index", i.toString());
  }
}

function checkIfBookInLibrary(Book) {
  let yesOrNo;
  for (let i = 0; i < library.length; i++) {
    if (
      Book.title == library[i].title &&
      Book.author == library[i].author &&
      Book.pageCount == library[i].pageCount
    ) {
      yesOrNo = true;
    }
  }
  if (yesOrNo == true) {
    return true;
  } else {
    return false;
  }
}
