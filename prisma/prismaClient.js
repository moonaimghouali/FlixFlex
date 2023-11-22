const { PrismaClient } = require('@prisma/client')

// declare global {
//   var prisma: PrismaClient | undefined
// }

const prismadb =  new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

module.exports = {prismadb} ;
