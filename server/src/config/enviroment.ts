const NODE_ENV = Bun.env.NODE_ENV || "development";
const PORT = Bun.env.PORT || 8000;

export const env = {
  NODE_ENV,
  PORT,
};
