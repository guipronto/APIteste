const sqliteConnection = require("../../sqlite")
const createUsers = require("./createUsers")

async function migrationRun(){
    const schemas = [
        createUsers
    ].join("");

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(erro => console.error(error))

}

module.exports = migrationRun;