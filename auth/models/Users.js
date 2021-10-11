import sequelize from "sequelize"
import { seqConn } from "../database/mysqlConn.js"

const User = seqConn.define("users", {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: sequelize.STRING(100),
        unique: true
      },
      password: {
        type: sequelize.STRING(64),
        is: /^[0-9a-f]{64}$/i
      },
      username: {
        type: sequelize.STRING(64)
      },
      createdAt: sequelize.DATE,
      updatedAt: sequelize.DATE
})  

export default User