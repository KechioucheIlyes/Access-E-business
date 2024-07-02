import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(req) {

    const prisma = new PrismaClient()


    const commissions = await prisma.commissions.findMany({

        where: {
            Etudes: {
                some: {
                },

            },
        },
        include: {
            Etudes: {
                include: {
                    Clients: true,
                    resultats: true,
                    
                }
            },
            User: true
        }

    })


    if (commissions) {
        return NextResponse.json({
            commissions,
        }, { status: 200 })
    }
    else {
        return NextResponse.json({ message: "aucune études/commission pour le moment" }, { status: 401 })
    }


}