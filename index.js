function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'read' : 'not read yet'} `
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    
})

let library = [];

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
    rl.write(`Added "${title}" to the library.\n`);
}

function askForBookDetails() {
    rl.question('Enter book title: \n', (title) => {
        rl.question('Enter author name: \n', (author) => {
            rl.question('Enter number of pages: \n', (pages) => {
                rl.question('Have you read it? (yes/no): \n', (readAnswer) => {
                    const read = readAnswer.toLowerCase() === 'yes';
                    addBookToLibrary(title, author, pages, read);
                    
                nextAction();
                }); 
            });
        });
    });
}

function nextAction() {
    rl.question('what would you like to do next? (add/print/exit): ', (answer) => {
        switch (answer.toLowerCase()) {
            case 'add':
                askForBookDetails();
                break;
            case 'print':
                printLibrary();
                nextAction();
                break;
            case 'exit':
                closeProgram();
                break;
            default:
                rl.write('Invalid option. Please choose add, print or exit \n');
                nextAction();
                break;
        }
    })
}

function closeProgram () {
    rl.write('exiting the program. \n');
    rl.close();
}


function printLibrary() {
    if (library.length === 0 ) {
        rl.write('the library is empty \n');
        nextAction();
    } else {
        rl.write('books in the library: \n');
        library.forEach((book, index) => {
            rl.write(`${index +1}: ${book.info()}`);
        })
    
    }
}

askForBookDetails();