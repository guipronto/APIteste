const {hash} = require("bcryptjs");
const AppError = require("../utils/erro");
const sqliteConnection = require("../database/sqlite");


class UsersController{
   async create(request,response){

    const { name, email, password } = request.body

    const database = await sqliteConnection();
    const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)',[email])

    if(checkUserExist){
        throw new AppError("esta email ja esta em uso")

    }

    const hashPassword = await hash(password,8);

    await database.run("INSERT INTO users (name,email,password) VALUES (?,?,?)",
   [name,email,hashPassword])

    return response.status(201).json();
 
    }

    async update(request,response){

        const {name,email} = request.body
        const {id} = request.params

        const database = await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)',[id])

        if(!user){

            throw new AppError("usuário não existe ")

        }

        const userWhitUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)',[email])

        if(userWhitUpdateEmail && userWhitUpdateEmail.id !== user.id){
            throw new AppError("esta email ja esta em uso")
        }

        user.name = name;
        user.email = email;

        await database.run(`UPDATE users SET
        name = ?,
        email = ?,
        updated_at = ?
        WHERE id = ? 
        `,[user.name,user.email,new Date(),id]
            
        );
            return response.status(200).json();


    }
}

module.exports = UsersController;