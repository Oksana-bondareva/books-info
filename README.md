# Books Management Table with Infinite Scroll and Gallery View

## Deploy: https://incandescent-sorbet-64a28e.netlify.app/

## Overview

This project is a React-based application that showcases a book management system. Users can view books in either a table or gallery view, dynamically switch between languages, and export book data to a CSV file. It includes features like infinite scrolling for loading more books as the user scrolls down and the ability to generate books with customizable parameters.

## Features

* Infinite Scroll: Load more books as the user scrolls down, ensuring smooth and uninterrupted browsing.

* Table and Gallery View: Users can switch between a detailed table view and a more visual gallery view.

* Language Switching: Dynamic language support for English, French, and German.

* Customizable Book Generation: Users can adjust the number of likes and reviews for books, and books are generated with unique details based on these parameters.

* CSV Export: Export the displayed books' data to a CSV file for further analysis or record-keeping.

## Technologies Used

* React: For building the user interface.

* React-Bootstrap: For responsive and visually appealing UI components.

* Faker.js: For generating fake book data, including titles, authors, publishers, etc.

* InfiniteScroll: For implementing the infinite scrolling functionality.

* Seedrandom: For generating predictable random data.

* Papaparse: For parsing and exporting data to CSV.

* FileSaver: For saving files on the client-side.