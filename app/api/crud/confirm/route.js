import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function POST(req) {
    const statued = true
    const { user_id } = await req.json()

    const prisma = new PrismaClient()

    if (statued) {

        const user = await prisma.user.update({
            where: {
                id: user_id,
            },
            data: {
                activated: true
            }

        })
        
        if (user) {
            if (user.affiliation_id) {
                let currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 90);
                const expirationDateISO = currentDate.toISOString();

                const filleul = await prisma.filleul.update({
                    where: {
                        lien_affiliation: user.affiliation_id
                    },
                    data: {
                        date_expiration_avantage: expirationDateISO
                    }
                })
            }
            return NextResponse.json({
                message: 'Validé avec succès !'
            })
        }
        else {
            return NextResponse.json({
                message: "Une erreur est survenue l'or de la validation !"
            })
        }
    }


}