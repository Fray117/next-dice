'use strict'

import { readdirSync } from 'fs'
import Sequelize, { DataTypes } from 'sequelize'

const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const db = {}

let sequelize
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const models = process.cwd() + '/db/models/' || __dirname

readdirSync(models)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js')
	})
	.forEach(file => {
		const model = require('./' + file.slice(0, -3))(sequelize, DataTypes)
		db[model.name] = model
	})

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
