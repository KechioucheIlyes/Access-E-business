import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(req) {

    const prisma = new PrismaClient()

    const etudesAvecResultats = await prisma.etudes.findMany({
        where: {
            statut: "en cours",
            resultats: {
                some: {},
            },
        },
        include: {
            resultats: true,
        }
    });

    const etudesIds = etudesAvecResultats.map(etude => etude.id);

    const etudes_en_cours = await prisma.clients.findMany({
        where: {
            Etudes: {
                some: {
                    id: {
                        in: etudesIds,
                    },
                    statut: "en cours",
                },
            },
        },
        include: {
            Etudes: {
                where: {
                    id: {
                        in: etudesIds,
                    },
                },
                include: {
                    Commissions: true,
                    resultats: true,
                }
            },
            User: true,
            Dirigeants: true,
        }
    });
    const commission = await prisma.commissions.findMany({

    })

    if (etudes_en_cours && commission) {
        return NextResponse.json({
            etudes_en_cours, commission
        }, { status: 200 })
    }
    else {
        return NextResponse.json({ message: "aucune études/commission pour le moment" }, { status: 401 })
    }


}