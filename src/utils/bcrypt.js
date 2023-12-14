import bcrypt from "bcrypt";

export async function generateHash(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePass(password, hash) {
  return await bcrypt.compare(password, hash);
}
