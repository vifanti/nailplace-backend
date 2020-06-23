export default {
  jwt: {
    secret: process.env.APP_SECRET ?? '32bdc6df63a7153eecac7b6d2ec9e8e4',
    expiresIn: '1d',
  },
};
