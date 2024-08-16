import argon2 from 'argon2';

export async function saltAndHashPassword(password: string) {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}

export async function verifyPassword({ password, hashedPassword }: { password: string; hashedPassword: string }) {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}
