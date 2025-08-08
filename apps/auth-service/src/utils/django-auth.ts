import crypto from 'node:crypto';

const length = 32;
const algo = 'sha256';

const verify = (data: { password: string; hash: string }): Promise<boolean> => {
  const [_algo, iterations, salt, value] = data.hash.split('$');
  return new Promise<boolean>((resolve, reject) => {
    const handler = (err: Error | null, result: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.toString('base64') === value);
      }
    };
    crypto.pbkdf2(
      data.password,
      salt,
      Number(iterations),
      length,
      algo,
      handler
    );
  });
};

const hash = (password: string): Promise<string> => {
  const salt = crypto.randomBytes(8).toString('base64');
  const iterations = 60_000;
  return new Promise<string>((resolve, reject) => {
    const handler = (err: Error | null, result: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          `pbkdf2_sha256$${iterations}$${salt}$${result.toString('base64')}`
        );
      }
    };
    crypto.pbkdf2(password, salt, iterations, length, algo, handler);
  });
};

export const djangoPassword = {
  verify,
  hash,
};
