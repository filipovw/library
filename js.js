const bookDisplay = document.getElementById("book-display");
const newBookForm = document.getElementById("new-book-form");
const newBookBtn = document.getElementById("new-book-btn");

let myLibrary = [];

function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numPages} pages, ${
    this.read ? "already read" : "not read yet"
  }`;
};

function addBookToLibrary(book) {
  // Check if the book already exists in the library
  const existingBook = myLibrary.find(
    (b) =>
      b.title === book.title &&
      b.author === book.author &&
      b.numPages === book.numPages
  );
  if (!existingBook) {
    // Book does not exist in the library, add it
    myLibrary.push(book);
  } else {
    // Book already exists in the library, display a message and prevent the form from being submitted
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

function displayBooks() {
  bookDisplay.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookDiv = document.createElement("div");
    const bookInfo = document.createElement("p");
    bookInfo.textContent = book.info();
    bookDiv.appendChild(bookInfo);
    bookDisplay.appendChild(bookDiv);

    // Add toggle read status button
    const toggleReadStatusBtn = document.createElement("button");
    toggleReadStatusBtn.textContent = "Toggle read status";
    toggleReadStatusBtn.addEventListener("click", () => {
      book.read = !book.read;
      displayBooks();
    });
    bookDiv.appendChild(toggleReadStatusBtn);

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("remove");
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      displayBooks();
    });
    bookDiv.appendChild(deleteBtn);
  }
}

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const author = formData.get("author");
  const numPages = formData.get("numPages");
  const read = formData.get("read");
  const book = new Book(title, author, numPages, read);
  addBookToLibrary(book);
  displayBooks();
  newBookForm.reset();
  newBookForm.style.display = "none";
});
newBookBtn.addEventListener("click", () => {
  newBookForm.style.display = "block";
});

bookDisplay.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-book-btn")) {
    const index = event.target.dataset.index;
    myLibrary.splice(index, 1);
    displayBooks();
  } else if (event.target.classList.contains("toggle-read-status-btn")) {
    const index = event.target.dataset.index;
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
  }
});

displayBooks();
const cancelBtn = document.getElementById("cancel-btn");

cancelBtn.addEventListener("click", () => {
  newBookForm.style.display = "none";
});
