import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



/**
 * @swagger
 * /api/crud/commissions/save:
 *   post:
 *     summary: Enregistrer une nouvelle commission
 *     description: Enregistrer une nouvelle commission avec les informations fournies.
 *     tags: [Commission]  # Si vous avez une section spécifique pour les commissions
 *     requestBody:
 *       description: Données de la commission à Enregistrer
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
 *         description: Commission Enregistrer avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Commission Enregistrer avec succès !
 *       500:
 *         description: Erreur serveur lors de l'enregistrement de la commission.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de l'enregistrement de la commission.
*     security:
 *       - BearerAuth: []
 */


export async function POST(req, { params }) {

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

    const createCommission = await prisma.commissions.create({
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
    if (createCommission) {
        return NextResponse.json({
            message: "Commission creer avec succès !"
        },
            {
                status: 200
            })
    }
    else {
        return NextResponse.json({
            message: "Echec l'ors de la creation de la Commission !"
        })
    }



}