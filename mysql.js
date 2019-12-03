const connection = require("./models/mysqlconnection");

connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected to mysql server");
    }
});

const table = "Enrolled_by"

const sql = `select * from ${table}`;
const sql1 = "insert into Enrolled_by values(99, 'engineering')";
const sql2 = "delete from Enrolled_by where cid = 'engineering'";


const usar = [
    { Sid: 101, cid: 'csc-401' },
    { Sid: 101, cid: 'csc-401' },
    { Sid: 101, cid: 'csc-401' },
    { Sid: 101, cid: 'csc-401' }
]



connection.query(sql, (err, data, fields)=>{
    if(err){
        console.log("error", err);
    }else{
        // console.log(data.filter((datas)=>{
        //     if(datas.Sid = 102){
        //         return datas;
        //     }
        // }));
        console.log("success ","data \n",data, "\n fields",fields);
    }
})