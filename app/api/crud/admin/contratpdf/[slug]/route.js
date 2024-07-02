import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req, { params }) {

    const id = params.slug

    const prisma = new PrismaClient()

    const contratPDF = await prisma.contrats.findFirst({
        where: {
            id: parseInt(id)
        }
    })
    if (contratPDF && contratPDF.fichier_contrat_url) {
        
        return NextResponse.json({ url: contratPDF.fichier_contrat_url })

    } else {
        return NextResponse.json({ message: "Aucun fichier trouvé pour ce contrat !" }, { status: 404 });
    }

}

