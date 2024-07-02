import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
export async function GET(req) {

    const prisma = new PrismaClient()



    const topGunUsers = await prisma.user.findMany({
        where: {
            Commissions: {
                some: {}
            }
        },
        orderBy: {
            Commissions: {
                _count: 'desc'
            }
        },
        include: {
            Commissions: true
        },
        take: 3
    })

    


    if (topGunUsers) {
        if (topGunUsers.length > 0) {

            return NextResponse.json({
                topGunUsers: topGunUsers , 
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: "Pas de commission"
            }, { status: 400 })
        }
    } else {
        return NextResponse.json({
            message: "Pas de topGunUser"
        }, { status: 400 })
    }
}