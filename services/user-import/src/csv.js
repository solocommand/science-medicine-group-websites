const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const { createObjectCsvWriter } = require('csv-writer');

/**
 * Turns array of array data into objects, using first row as headers.
 *
 * @param {array[]} rows
 * @returns {object[]}
 */
const objectify = (rows = []) => {
  const headers = rows.slice(0, 1).pop();
  return rows.slice(1).map((row) => ({
    ...(headers[0] && { [headers[0]]: `${row[0]}`.trim() }),
    ...(headers[1] && { [headers[1]]: `${row[1]}`.trim() }),
    ...(headers[2] && { [headers[2]]: `${row[2]}`.trim() }),
    ...(headers[3] && { [headers[3]]: `${row[3]}`.trim() }),
    ...(headers[4] && { [headers[4]]: `${row[4]}`.trim() }),
    ...(headers[5] && { [headers[5]]: `${row[5]}`.trim() }),
    ...(headers[6] && { [headers[6]]: `${row[6]}`.trim() }),
  }));
};

module.exports = {
  /**
   * @param {string} file Path to file to read
   * @returns {Promise<object[]>}
   */
  readCsv: (file) => new Promise((resolve, reject) => {
    try {
      const rows = [];
      const stream = fs.createReadStream(file, 'utf8');
      stream
        .on('error', reject)
        .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', (row) => rows.push(row))
        .on('finish', () => resolve(objectify(rows)));
    } catch (e) {
      reject(e);
    }
  }),
  /**
   * Writes objects to CSV files
   *
   * @param {string} path
   * @param {string[]} header
   * @param {object[]} data
   * @param {boolean} alwaysQuote
   * @returns {Promise<void>}
   */
  writeCsv: (path, header = [], data = [], alwaysQuote = false) => createObjectCsvWriter({
    path,
    header,
    alwaysQuote,
  }).writeRecords(data),
};
