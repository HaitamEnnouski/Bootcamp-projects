const books = require('./books.json');

function priceOfBook(title) {
    let price = 0
    for (let book of books) {
        if (book.title === title) {
            return price = book.price;
        }
    }
    return null;
}
// console.log(priceOfBook("The Great Gatsby")); // Output: 10.99

function affordableBooks(budget){
    let affordable = [];
    for (let i = 0; i < books.length; i++) {
        if (books[i].price <= budget) {
            affordable.push(books[i].title);
        }
    }
    return affordable;
}

// console.log(affordableBooks(15)); // Output: ["The Great Gatsby", "198

function findBookByGenre(genre){
    let foundBooks = [];
    for (let i = 0; i < books.length; i++) {
        for (let j = 0; j < books[i].genres.length; j++) {
            if (books[i].genres[j] === genre) {
                foundBooks.push(books[i].title);
            }
        }
    }
    return foundBooks;
}

// console.log(findBookByGenre("Fiction")); // Output: ["The Great Gatsby", "1984"]

function sortBooksByPrice() {
    for (let i = 0; i < books.length - 1; i++) {
        for (let j = i + 1; j < books.length; j++) {
            if (books[i].price > books[j].price) {
                [books[i], books[j]] = [books[j], books[i]];
            }
        }
    }
}