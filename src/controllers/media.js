const {PrismaClient} = require('@prisma/client')

const prismadb = new PrismaClient() 

const getMedia =  async (req, res) => {
  try{
   let type = req.query.type
   let page = parseInt(req.query.page)
   let size = parseInt(req.query.size)

   if(!page || !size) {
    res.status(400).send({message : 'bad request missing page and size queries'})
   }

   let media = []
   if(type ==='movie'){
    media = await prismadb.media.findMany({
      where : {
        type : 'Movie'
      },
      skip : (page - 1) *size,
      take : size
    })
   }else{
    media = await prismadb.media.findMany({
      where : {
        type : 'Serie'
      },
      skip : (page - 1) *size,
      take : size
    })

   }
    
    res.status(200).send({data  :media, message : 'success'})
  }catch(error)
  {
    res.status(500).send({success : false, message : error.message})
  }
};

const getTopMedia =  async (req, res) => {
  try{
   let type = req.query.type

   let media = []
   if(type ==='movie'){
    media = await prismadb.media.findMany({
      where : {
        type : 'Movie'
      },
      orderBy: {
        rating: 'desc', 
      },
      take : 5,
      
    })
   }else{
    media = await prismadb.media.findMany({
      where : {
        type : 'Serie'
      },
      orderBy: {
        rating: 'desc', 
      },
      take : 5,
    })

   }
    
    res.status(200).send({data  :media, message : 'success'})
  }catch(error)
  {
    res.status(500).send({success : false, message : error.message})
  }
};

const searchMedia =  async (req, res) => {
    try{
      let q = req.query.q
      console.log(q)
      // let media = []

      media = await prismadb.media.findMany({
        where : {
          title : {
            contains : q,
            mode: 'insensitive',
          }
        },
      })

      res.status(200).send({data : media})
      
    }catch(error)
    {
      res.status(500).send({success : false, message : error})
    }
};

const getMediaDetails =  async (req, res) => {
  try{
    let id = parseInt(req.params.id) 

    let media = await prismadb.media.findUnique({
      where : {
        id : id
      },
      include : {
        details : true,
      }
    })

    res.status(200).send({data : media})
  }catch(error)
  {
    res.status(500).send({success : false, message : error})
  }
};

const getMediaTrailer =  async (req, res) => {
  try{
    let id = parseInt(req.params.id) 

    let trailer = await prismadb.media.findUnique({
      where : {
        id : id
      },
      select : {
        trailer : true
      }
    })

    res.status(200).send({data : trailer})
    
  }catch(error)
  {
    res.status(500).send({success : false, message : error})
  }
};



module.exports = {getMedia, getTopMedia, searchMedia, getMediaDetails, getMediaTrailer}