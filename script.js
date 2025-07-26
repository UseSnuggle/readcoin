const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const profileSection = document.getElementById('profileSection');
const mainApp = document.getElementById('mainApp');
const displayName = document.getElementById('displayName');
const bookCountEl = document.getElementById('bookCount');
const readerLevelEl = document.getElementById('readerLevel');

let user = {
  name: "",
  books: []
};

function saveName() {
  const input = document.getElementById('username').value;
  if (input.trim() === "") return;
  user.name = input;
  displayName.textContent = input;
  profileSection.style.display = 'none';
  mainApp.style.display = 'block';
  updateBookStats();
  loadBooksFromLocal();
}

function updateBookStats() {
  bookCountEl.textContent = user.books.length;
  let lvl = "📖 Rookie Reader";
  if (user.books.length >= 5) lvl = "🔥 Page Turner";
  if (user.books.length >= 10) lvl = "🏆 Literary Beast";
  if (user.books.length >= 20) lvl = "👑 Legendary Reader";
  readerLevelEl.textContent = lvl;
}

bookForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const review = document.getElementById('review').value;

  const newBook = { title, author, review };
  user.books.push(newBook);
  localStorage.setItem('r3adUserBooks', JSON.stringify(user.books));
  addBookToList(newBook);
  updateBookStats();
  bookForm.reset();
});

function addBookToList(book) {
  const bookItem = document.createElement('div');
  bookItem.className = "book-card";
  bookItem.innerHTML = `
    <img src="https://robohash.org/${book.title}?set=set4" alt="NFT">
    <h4>${book.title}</h4>
    <p><strong>by:</strong> ${book.author}</p>
    <p><em>${book.review}</em></p>
  `;
  bookList.prepend(bookItem);
}

function loadBooksFromLocal() {
  const savedBooks = JSON.parse(localStorage.getItem('r3adUserBooks')) || [];
  user.books = savedBooks;
  savedBooks.forEach(addBookToList);
  updateBookStats();
}
