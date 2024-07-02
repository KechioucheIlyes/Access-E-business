import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const { etudeID, clientsID } = await req.json();
        const prisma = new PrismaClient();

        await prisma.contrats.deleteMany({
            where: { id_etudes: etudeID }
        });


        await prisma.resultats.deleteMany({
            where: { id_etudes: etudeID }
        });
        const linkedCommissions = await prisma.commissions.findMany({
            where: {
                Etudes: {
                    some: {
                        id: etudeID
                    }
                }
            }
        });
        if (linkedCommissions) {
            for (const commission of linkedCommissions) {
                await prisma.commissions.delete({
                    where: { id: commission.id }
                });
            }
        }

        const etude = await prisma.etudes.delete({
            where: { id: etudeID }
        });


        if (etude) {
            return NextResponse.json({
                message: "Etude et entités liées supprimées avec succès !"
            }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Erreur lors de la suppression de l'étude et des entités liées !",
            error: error.message
        }, { status: 500 });
    }
}
