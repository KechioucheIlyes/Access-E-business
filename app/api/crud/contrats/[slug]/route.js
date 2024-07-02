import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



/**
 * @swagger
 * tags:
 *   name: Contrats
 *   description: Opérations liées aux contrats
 */

/**
 * @swagger
 * /api/crud/contrats/{slug}:
 *   get:
 *     summary: Récupérer les détails d'un contrat
 *     description: Récupère les détails d'un contrat en fonction de l'ID spécifié.
 *     tags: [Contrats]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du contrat à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du contrat récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               id: 123
 *               nom: "Contrat d'achat de fournitures"
 *               description: "Contrat pour l'achat de fournitures de bureau"
 *               date_debut: "2023-01-15"
 *               date_fin: "2023-12-31"
 *               fournisseur: "Fournitures Inc."
 *               montant: 10000.00
 *               utilisateur: "John Doe"
 *       404:
 *         description: Contrat non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Contrat non trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération du contrat.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération du contrat.
*     security:
 *       - BearerAuth: []
 */

export async function GET(req, { params }) {


    const id = parseInt(params.slug)

    const prisma = new PrismaClient()

    const getContrat = await prisma.contrats.findUnique({
        where: {
            id
        }
    })

    if (getContrat) {
        return NextResponse.json({ getContrat })
    }
    else {
        return NextResponse.json({ message: "Erreur l'ors de la recuperation du contrat" })
    }

}