import crypto from "crypto";
import { env } from "../config/enviroment";

function encryptString(plaintext: string) {
  let salt = crypto.randomBytes(env.PBKDF2_SALT_SIZE);

  let key = crypto.pbkdf2Sync(
    env.ENCRYPTION_KEY,
    salt.toString("base64"),
    env.PBKDF2_ITERATIONS,
    env.ALGORITHM_KEY_SIZE,
    env.PBKDF2_NAME
  );

  let ciphertextAndNonceAndSalt = Buffer.concat([
    new Uint8Array(salt),
    new Uint8Array(_encrypt(Buffer.from(plaintext), key)),
  ]);

  return ciphertextAndNonceAndSalt.toString("base64");
}

function decryptString(base64CiphertextAndNonceAndSalt: string) {
  let ciphertextAndNonceAndSalt = new Buffer(
    base64CiphertextAndNonceAndSalt,
    "base64"
  );

  let salt = ciphertextAndNonceAndSalt.slice(0, env.PBKDF2_SALT_SIZE);
  let ciphertextAndNonce = ciphertextAndNonceAndSalt.slice(
    env.PBKDF2_SALT_SIZE
  );

  let key = crypto.pbkdf2Sync(
    env.ENCRYPTION_KEY,
    salt.toString("base64"),
    env.PBKDF2_ITERATIONS,
    env.ALGORITHM_KEY_SIZE,
    env.PBKDF2_NAME
  );

  return _decrypt(ciphertextAndNonce, key).toString("utf8");
}

function _encrypt(plaintext: Buffer, key: Buffer) {
  let nonce = crypto.randomBytes(env.ALGORITHM_NONCE_SIZE);

  let cipher = crypto.createCipheriv(
    env.ENCRYTPION_ALGORITHM,
    new Uint8Array(key),
    new Uint8Array(nonce)
  );

  let ciphertext = Buffer.concat([
    new Uint8Array(cipher.update(new Uint8Array(plaintext))),
    new Uint8Array(cipher.final()),
  ]);

  return Buffer.concat([
    new Uint8Array(nonce),
    new Uint8Array(ciphertext),
    new Uint8Array(cipher.getAuthTag()),
  ]);
}

function _decrypt(ciphertextAndNonce: Buffer, key: Buffer) {
  let nonce = ciphertextAndNonce.slice(0, env.ALGORITHM_NONCE_SIZE);
  let ciphertext = ciphertextAndNonce.slice(
    env.ALGORITHM_NONCE_SIZE,
    ciphertextAndNonce.length - env.ALGORITHM_TAG_SIZE
  );
  let tag = ciphertextAndNonce.slice(
    ciphertext.length + env.ALGORITHM_NONCE_SIZE
  );

  let cipher = crypto.createDecipheriv(
    env.ENCRYTPION_ALGORITHM,
    new Uint8Array(key),
    new Uint8Array(nonce)
  );

  cipher.setAuthTag(new Uint8Array(tag));
  return Buffer.concat([
    new Uint8Array(cipher.update(new Uint8Array(ciphertext))),
    new Uint8Array(cipher.final()),
  ]);
}

export { encryptString, decryptString };
