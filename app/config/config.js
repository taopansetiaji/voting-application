require("dotenv/config");

const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

// sequelize model:create --name User --attributes name:string,role:string,email:string,password:string
// sequelize model:create --name Candidate --attributes name:string,staff_id:string
// sequelize model:create --name Vote --attributes choice:string,user_id:string
