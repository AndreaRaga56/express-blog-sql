import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog-db'
});

connection.connect((err)=>{
    if(err)throw err;
    console.log("Connected to MySQL")
});

export default connection