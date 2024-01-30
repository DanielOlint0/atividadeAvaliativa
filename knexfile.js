module.exports = {
    client: 'mysql2',
    connection: {
       host: 'localhost', //process.env.DB_HOST,      //por padrão localhost
          user: 'root', //process.env.DB_USER,       //por padrão root
          password: 'usbw',//process.env.DB_PASSWORD,  //sua senha definida
          database: 'agenda'//process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  }; 