import * as argon from 'argon2';
import * as passwordGenerator from 'generate-password';

export const hashPassword = async (password: string) => {
  return await argon.hash(password);
};

export const verifyPassword = async (hash: string, password: string) => {
  return await argon.verify(hash, password);
};

export const generatePassword = () => {
  return passwordGenerator.generate({ length: 6, numbers: true });
};
