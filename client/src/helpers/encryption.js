import { box, randomBytes } from 'tweetnacl';
import {
  encodeBase64,
  decodeBase64,
  encodeUTF8,
  decodeUTF8
} from 'tweetnacl-util';

export function encrypt(text, publicKey, secretKey) {
  //generate a nonce of known length
  const nonce = randomBytes(box.nonceLength);
  //turn message text into a byte array
  const messageArray = decodeUTF8(text);
  //encrypt using their public key and our secret key
  const secret = decodeBase64(secretKey);
  const shared = decodeBase64(publicKey);
  const encrypted = box(messageArray, nonce, shared, secret);
  //add nonce to the front of the encrypted message
  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);
  //turn array into base64 string for transmit
  return encodeBase64(fullMessage);
}

export function decrypt(text, publicKey, secretKey) {
  //turn base64 string into a byte array
  const messageArrayWithNonce = decodeBase64(text);
  //strip the nonce from the encoded string
  const nonce = messageArrayWithNonce.slice(0, box.nonceLength);
  //extract message
  const message = messageArrayWithNonce.slice(box.nonceLength);
  //decrypt message
  const secret = decodeBase64(secretKey);
  const shared = decodeBase64(publicKey);
  const decrypted = box.open(message, nonce, shared, secret);
  //turn into a string and return
  return encodeUTF8(decrypted);
}
