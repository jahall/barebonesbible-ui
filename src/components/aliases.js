
export function createBookAliases(collections) {
    /* Create mapping from alias to book code */
    var bookAliases = {};
    for (const item of collections) {
      for (const book of item.books) {
        bookAliases[normalize(book.code)] = book.code;
        bookAliases[normalize(book.name)] = book.code;
        for (const alias of book.aliases) {
          bookAliases[normalize(alias)] = book.code;
        }
      }
    }
    return bookAliases;
  }

export function normalize(alias) {
    /* Normalize aliases to lower case with no spaces */
    return alias.toLowerCase().replace(/\s/g, "");
}