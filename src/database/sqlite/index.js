const sqlite3 = require("sqlite3");  
const sqlite = require("sqlite");    
const path = require("path");
const { open } = sqlite; 

async function sqliteConnection(){
    const database = await open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });

    return database; 
}

module.exports = sqliteConnection;
