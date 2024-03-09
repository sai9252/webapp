const express = require('express');
const mongoose = require('mongoose');
const devuser = require('./datamodels');
const jwt = require('jsonwebtoken');
const { readSync } = require('fs');
const middleware = require('./middleware');
const cors = require('cors');
const app = express();

let url = ("mongodb+srv://Nanda:nanda1234@cluster0.dh7ntw5.mongodb.net/?retryWrites=true&w=majority")

async function dbConnect() {

    await mongoose.connect(url).then(
        () => console.log("DB Connected....")
        )
}

app.use(express.json());

app.use(cors({origin:'*'}));

app.get('/', (req, res) => {
    return res.send("HELLO WORLD...");
})

app.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, confirmpassword } = req.body;
        console.log(fullName);
        console.log(email);
        console.log(password);
        console.log(confirmpassword);
        const exist = await devuser.findOne({ email });
        if (exist) {
            return res.status(400).json({message:"user already exist..."});
        }
        if (password != confirmpassword) {
            return res.status(403).json({message:"Password invalid"});
        }
        let newUser = new devuser({
            fullName, email, password,
        })
        newUser.save()
        return res.status(200).json({message:"USER REGISTRATION SUCCESSFUL"});

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message:"server error...."})

    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await devuser.findOne({ email });
        if (!exist || exist.password != password) {
            return res.status(500).json({message:"the entered Email or password is not correct"});
        }


        let payload = {
            user: {
                id: exist.id,
                email: exist.email,
                password: exist.password
            }
        }
        // console.log("requested");
        let token = jwt.sign(payload, 'jwtpassword', { expiresIn: '1hr' })
        if (!token) {
            return res.json({ message: "token not found " });
        }
        return res.json({ "token":token,"message":"login successful" }); // token:"sascascwcwewec"


    } catch (err) {
        console.log(err);
        return res.status(500).json({message : "server errror..."});

    }
})

app.get('/allprofiles',middleware, async (req, res) => {
    try {
        const allprofiles = await devuser.find();
        return res.json(allprofiles);


    } catch (err) {
        console.log(err);
        return res.status(500).send("server error....");

    }

})

app.get('/myprofile', middleware,async(req , res)=>{

    try {
        let user = await devuser.findById(req.user.id);
        return res.json({user});
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("server error....")
        
    }
})

app.put('/editprofile', middleware,async(req,res) => {
    try{
        const{fullName , email , about , skills} = req.body
        let user = await devuser.updateOne({_id:req.user.id},{
            fullName,email,about,skills
        });
        return res.json({user})
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("server error....")
        
    }});


app.listen(3001, async () => {
    await dbConnect();
    console.log("server running....")
});