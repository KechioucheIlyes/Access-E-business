import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


/**
 * @swagger
 * tags:
 *   name: Commission
 *   description: Opérations liées aux commissions
 */

/**
 * @swagger
 * /api/crud/commissions/{slug}:
 *   get:
 *     summary: Récupérer les détails d'une commission
 *     description: Récupère les détails d'une commission en fonction de l'ID spécifié.
 *     tags: [Commission]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID de la commission à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la commission récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               getCommisions: { commissionDetails }
 *       404:
 *         description: Commission non trouvée.
 *         content:
 *           application/json:
 *             example:
 *               message: Commission non trouvée.
 *       500:
 *         description: Erreur serveur lors de la récupération de la commission.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération de la commission.
*     security:
 *       - BearerAuth: []
 */


export async function GET(req, { params }) {


    const id = parseInt(params.slug)

    const prisma = new PrismaClient()

    
    const getCommisions = await prisma.commissions.findUnique({
        where: {
            id
        }
    })

    if (getCommisions) {
        return NextResponse.json({ getCommisions })
    }
    else {
        return NextResponse.json({ message: "Erreur l'ors de la recuperation de la commission" })
    }

}