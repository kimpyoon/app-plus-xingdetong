const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
const pwd = 'Lk38IW8ZUj9D2kWd'; // 密码

import { guid,random } from 'js-util-tools'

//解密方法
export function Decrypt(word) {
	let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
	let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}

//加密方法
export function Encrypt(word) {
	let srcs = CryptoJS.enc.Utf8.parse(word);
	let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	return encrypted.ciphertext.toString().toUpperCase();
}

// 获取签名
export function GetSign() {
	let time = new Date().getTime();
	let uuid = guid(8);
	let num = random(1000,9999);
	return Encrypt(uuid + '@' + pwd + '@' + time + '@' + num);
}