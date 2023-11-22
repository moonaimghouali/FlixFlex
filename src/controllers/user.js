const bcrypt = require("bcrypt");
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
    let id = parseInt(req.params.id)

    const fav = await prismadb.favourite.create({
      data : {
        mediaId : req.body.mediaId,
        userId : id,
      }
    })

    res.status(201).send({message : 'Successfully added to favourites'})
  }catch(error)
  {
    res.status(500).send({success : false, message : error})
  }
};

const deletetFromFav =  async (req, res) => {
    try{
      let id = parseInt(req.params.id)

      const fav = await prismadb.favourite.delete({
        where : {
          userId_mediaId : {
            mediaId : req.body.mediaId,
            userId : id,
          }
        }
      })

      res.status(200).send({message : 'Successfully deleted from favourites'})
    }catch(error)
    {
      res.status(500).send({success : false, message : error.message})
    }
};

const getFav =  async (req, res) => {
  try{
    let id = parseInt(req.params.id)

    let fav = []
    fav = await prismadb.favourite.findMany({
      where : {
        userId : id,
      },
      include : {
        media : true
      }
    })
    
    res.status(200).send({data : fav, message : 'success'})
  }catch(error)
  {
    res.status(500).send({success : false, message : error.message})
  }
};



module.exports = {userLogin, addToFav, deletetFromFav, getFav}