import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function GET(req) {


    const prisma = new PrismaClient()

    
    const newUsers = await prisma.user.findMany({
        where: {
            activated: false,
            refused: false
        },
        include: {
            filleul: {
                include: {
                    Commission_filleul: true
                }
            }
        }
    })

    if (newUsers) {
        return NextResponse.json({ newUsers })
    } else {
        return NextResponse.json({ message: "Une erreur est survenue !" })
    }



}