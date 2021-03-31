/**
 *
 *存入
 * @param {*} id
 * @param {*} key
 * @param {*} value
 */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage._seller_; // 双下换线代表私有的 专门用来存储商家seller
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage._seller_ = JSON.stringify(seller);
}
/**
 *读取
 * @param {*} id
 * @param {*} key
 * @param {*} def
 */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
