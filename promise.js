
//promise
// let pro = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve({name: "UID1"});
//     }, 2500)
// })
// let pro1 = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve({name: "UID2"});
//     }, 2500)
// })

// Promise.all([pro1, pro])
//     .then(data => {
//         console.log(data);
//     });

const nodemailer = require("nodemailer");
const config = require("config");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'lc@cit.edu.np',
           pass: config.get("clubp"),
       }
   });

var message = {
    from: 'lc@cit.edu.np',
    bcc: 'leyinab403@4tmail.net',
    subject: 'autoMailer Test',
    text: 'cc and bcc test',
    html: '<h1>testing automailer module for sending file attachments asynchronous cc and bcc</h1>',
    attachments: [
        {
            path: "./public/background1.jpg"
        }
    ]
};

console.log("before");
async function sendMail(){
    transporter.sendMail(message, (err, info)=>{
        if(err){
            console.log(err);
        } else{
            console.log(info);
        }
    });
};
sendMail();
console.log("after");