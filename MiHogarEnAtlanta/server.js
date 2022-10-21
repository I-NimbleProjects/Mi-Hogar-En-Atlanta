const express = require ('express');
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer");

const PORT = 4000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/", cors(), async (req, res) => {
	let { text } = req.body
    let { email } = req.body
    let { name } = req.body
	const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth:{
            user: 'worldwidecruisersdev@gmail.com',
            pass: 'I-nimble123'
		}
	})

    transport.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

	await transport.sendMail({
		from: `${name}`,
		to: "jirr081696@gmail.com",
        subject: `Build your own request from ${name}`,
		text: `${text}
        <h2>Request</h2>
        
        `
	})

    transport.sendMail( (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})