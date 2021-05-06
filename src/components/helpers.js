import ls from 'local-storage';


export function localLoad(field, def) {
  /* Load value from local storage...or return default */
  var value = ls.get(field);
  if (value === undefined || value === null) {
    value = def;
  }
  return value;
}

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

export function createBookLookup(collections) {
  /* Create lookup of book to metadata */
  var bookLookup = {};
  for (const item of collections) {
    for (const book of item.books) {
      bookLookup[book.code] = book;
    }
  }
  return bookLookup;
}

export function normalize(alias) {
    /* Normalize aliases to lower case with no spaces */
    return alias.toLowerCase().replace(/\s/g, "");
}