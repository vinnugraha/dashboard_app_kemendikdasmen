// hash.js
import bcrypt from "bcrypt";

const pwd = process.argv[2];
const hash = await bcrypt.hash(pwd, 10);
console.log(hash);
