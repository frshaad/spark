import ky from 'ky';

export const api = ky.create({
  prefixUrl: '/api',
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith('At')) {
        return new Date(value);
      }
      return value;
    }),
});
