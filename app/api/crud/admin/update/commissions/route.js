import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";




export async function POST(req) {

    const {
        reference,
        courtage,
        turpe,
        CSPE,
        logiciel,
        GTB,
        montant_commission_total,
        montant_commission_courtage,
        montant_commission_turpe,
        montant_commission_cspe,
        montant_commission_logiciel,
        montant_commission_gtb,
        user_id,
        etude_id,
        username,
        useremail,

    } = await req.json()

    const prisma = new PrismaClient()


    const updateCommission = await prisma.commissions.update({
        where: {
            reference
        },
        data: {
            courtage,
            TURP: turpe,
            CSPE,
            logiciel,
            GBT: GTB,
            montant_commission_total: parseFloat(montant_commission_total),
            montant_commission_courtage: parseFloat(montant_commission_courtage),
            montant_commission_TURP: parseFloat(montant_commission_turpe),
            montant_commission_CSPE: parseFloat(montant_commission_cspe),
            montant_commission_logiciel: parseFloat(montant_commission_logiciel),
            montant_commission_GBT: parseFloat(montant_commission_gtb),
            user_id,
            Date_signature: new Date().toISOString(),
            Date_signature_courtage: courtage ? new Date().toISOString() : null,
            Date_signature_CSPE: CSPE ? new Date().toISOString() : null,
            Date_signature_GBT: GTB ? new Date().toISOString() : null,
            Date_signature_logiciel: logiciel ? new Date().toISOString() : null,
            Date_signature_TURP: turpe ? new Date().toISOString() : null,
        }
    })

    if (updateCommission) {
        return NextResponse.json({ updateCommission, message: `la Commission ${reference} a été mise a jour avec success ! ` }, { status: 200 })
    }
    else {
        return NextResponse.json({ message: "Aucune commission trouvé avec cette reference !" }, { status: 404 })
    }






}