import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


export async function DELETE(req) {

    const {
        filleulID
    } = await req.json()



    const prisma = new PrismaClient()

    try {
        const commissionsFilleul = await prisma.commission_filleul.deleteMany({
            where: {
                filleul_id: filleulID
            }
        })

        if (commissionsFilleul) {
            const deletedFilleul = await prisma.filleul.delete({
                where: {
                    id: filleulID
                }
            })

            if (deletedFilleul) {
                return NextResponse.json({
                    message: "Filleul supprimé avec succès !"
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    message: "Erreur l'or de la suppression du filleul !"
                }, { status: 400 })
            }
        }else{
            return NextResponse.json({
                message: "Erreur l'or de la suppression du filleul !"
            }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Erreur serveur !"
        }, { status: 500 })
    }






}