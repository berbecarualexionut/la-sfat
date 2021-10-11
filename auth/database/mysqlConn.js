import sequelize from 'sequelize'

const seq = new sequelize("social", "root", "admin", {
     host: "mysql",
      dialect: "mysql" 
})

export { seq as seqConn }