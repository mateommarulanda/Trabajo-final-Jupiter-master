const jsonwebtoken=require('jsonwebtoken');


const SECRET_KEY='327YCGv@AJu8HxiQWY$oPae&a5D63J@q#Ne4o^3&DWdS7EumzoHvq4t2Rqh5a^pa#LARjz2ftr@xxpKrLWA33vVaNzK2Ux73gSDz8#qn!zS5zvwmbXbfdG&MSHf$^'
const creartoken=(payload)=>{
    return jsonwebtoken.sing(payload, SECRET_KEY    )
}

const validarToken=(token)=>{
    return jsonwebtoken.decode(token,SECRET_KEY)
}

module.exports={creartoken,validarToken}