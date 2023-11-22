const bcrypt = require("bcrypt");
// const {prismadb} = require('../../prisma/prismaClient.js')
const {PrismaClient} = require('@prisma/client')

const prismadb = new PrismaClient() 


const userLogin =  async (req, res) => {
    try{
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      console.log(hashedPassword)
      
      let user = await prismadb.user.findUnique({
        where : {
          username : req.body.username,
        },
      })  

      if (!user) {
        res.status(401).send({message : 'No user exists with this username.'})
      }

      if (await bcrypt.compare(req.body.password, user.password)) {
        res.status(200).send({data :user,  message : 'login successful'})  
      }else{
        res.status(401).send({message : "wrong password for this user"})
      }
      
    }catch(error)
    {
      res.status(500).send({success : false, message : error})
    }
};

const addToFav =  async (req, res) => {
    try{
      
    }catch(error)
    {
      res.status(500).send({success : false, message : error})
    }
};

const deletetFromFav =  async (req, res) => {
    try{
      
    }catch(error)
    {
      res.status(500).send({success : false, message : error})
    }
};

const getFav =  async (req, res) => {
    try{
      
      
    }catch(error)
    {
      res.status(500).send({success : false, message : error})
    }
};



module.exports = {userLogin, addToFav, deletetFromFav, getFav}