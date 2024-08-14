module.exports = {
  development: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "rootharsh123",
    database: "url_shortener"
  },
  staging: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "8888",
    database: "times_pro"
  },
  production: {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "times_pro"
  }
};
