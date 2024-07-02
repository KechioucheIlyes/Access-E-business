
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"




/**
 * @swagger
 * /api/crud/commissions/update/{slug}:
 *   put:
 *     summary: Mettre à jour une commission
 *     description: Met à jour les informations d'une commission en fonction de l'ID spécifié.
 *     tags: [Commission]  # Si vous avez une section spécifique pour les commissions
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID de la commission à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nouvelles données de la commission à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 description: Référence de la commission
 *               courtage:
 *                 type: string
 *                 description: Courtage de la commission
 *               TURP:
 *                 type: string
 *                 description: TURP de la commission
 *               CSPE:
 *                 type: string
 *                 description: CSPE de la commission
 *               logiciel:
 *                 type: string
 *                 description: Logiciel de la commission
 *               GBT:
 *                 type: string
 *                 description: GBT de la commission
 *               Date_signature:
 *                 type: string
 *                 description: Date de signature de la commission
 *               montant_commission:
 *                 type: number
 *                 description: Montant de la commission
 *               user_id:
 *                 type: integer
 *                 description: ID de l'utilisateur associé à la commission
 *     responses:
 *       200:
 *         description: Commission mise à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Commission mise à jour avec succès !
 *       500:
 *         description: Erreur serveur lors de la mise à jour de la commission.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la mise à jour de la commission.
*     security:
 *       - BearerAuth: []
 */


export async function PUT(req, { params }) {

    const id = parseInt(params.slug)

    const {
        reference,
        courtage,
        TURP,
        CSPE,
        logiciel,
        GBT,
        Date_signature,
        montant_commission,
        user_id
    } = await req.json()

    const prisma = new PrismaClient()


    const updatedCommission = await prisma.commissions.update({
        where: {
            id
        },
        data: {
            reference,
            courtage,
            TURP,
            CSPE,
            logiciel,
            GBT,
            Date_signature,
            montant_commission,
            user_id
        }
    })

    if (updatedCommission) {
        return NextResponse.json({ message: "Commission mise à jours avec succes ! " })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la mise a jour du Commission !" })
    }

}