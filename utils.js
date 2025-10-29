/**
 * タイムスタンプから年を抽出する
 * @param {number} ts - Unixタイムスタンプ（ミリ秒）
 * @returns {number} 年（例: 2025）
 */
const getYearFromTs = (ts) => {
  return new Date(ts).getFullYear();
};

/**
 * タイムスタンプから年月文字列を抽出する
 * @param {number} ts - Unixタイムスタンプ（ミリ秒）
 * @returns {string} 年月文字列（例: "2025-10"）
 */
const getYearMonthFromTs = (ts) => {
  const date = new Date(ts);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

/**
 * タイムスタンプから日付文字列を抽出する
 * @param {number} ts - Unixタイムスタンプ（ミリ秒）
 * @returns {string} 日付文字列（例: "2025-10-28"）
 */
const getDateFromTs = (ts) => {
  const date = new Date(ts);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * タイムスタンプから時刻文字列を抽出する
 * @param {number} ts - Unixタイムスタンプ（ミリ秒）
 * @returns {string} 時刻文字列（例: "14:30:45"）
 */
const getTimeFromTs = (ts) => {
  const date = new Date(ts);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

/**
 * タイムスタンプから日時文字列を抽出する
 * @param {number} ts - Unixタイムスタンプ（ミリ秒）
 * @returns {string} 日時文字列（例: "2025-10-28 14:30:45"）
 */
const getDateTimeFromTs = (ts) => {
  return `${getDateFromTs(ts)} ${getTimeFromTs(ts)}`;
};

/**
 * 現在のタイムスタンプを取得する
 * @returns {number} 現在のUnixタイムスタンプ（ミリ秒）
 */
const getNow = () => Date.now();

/**
 * 短いランダムID（5文字）を生成する
 * @returns {string} 短いランダムID
 */
const generateShortId = () => {
  const array = new Uint8Array(3);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/[+/=]/g, '')
    .substring(0, 5);
};

/**
 * Chrome Storageからデータを読み込む
 * @param {string|string[]|object} keys - 読み込むキー
 * @returns {Promise<object>} 読み込んだデータ
 */
const getStorage = async (keys) => {
  return await chrome.storage.sync.get(keys);
};

/**
 * Chrome Storageにデータを保存する
 * @param {object} data - 保存するデータ
 * @returns {Promise<void>}
 */
const setStorage = async (data) => {
  return await chrome.storage.sync.set(data);
};

/**
 * Chrome Storageのデータを削除する
 * @param {string|string[]} keys - 削除するキー
 * @returns {Promise<void>}
 */
const removeStorage = async (keys) => {
  return await chrome.storage.sync.remove(keys);
};

/**
 * Chrome Storageをクリアする
 * @returns {Promise<void>}
 */
const clearStorage = async () => {
  return await chrome.storage.sync.clear();
};
