import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


export async function GET(req) {


    const prisma = new PrismaClient()
    
    const newUsers = await prisma.user.findMany({

    })


    const commissionTotal = await prisma.user.findMany({
        where: {
            Commissions: {
                some: {}
            }
        },
        include: {
            Commissions: true
        }

    })

    let commissionTotale = 0

    commissionTotal.map(commission => {
        commission.Commissions.map(commission => {
            commissionTotale += commission.montant_commission_total
        })
    })


    if (newUsers) {
        return NextResponse.json({ newUsers, userLength: newUsers.length, commissionTotal , commissionTotale })
    } else {
        return NextResponse.json({ message: "Une erreur est survenue !" })
    }



}