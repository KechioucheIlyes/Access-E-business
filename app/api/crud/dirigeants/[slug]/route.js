
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * tags:
 *   name: Dirigeants
 *   description: Opérations liées aux dirigeants
 */

/**
 * @swagger
 * /api/crud/dirigeants/{slug}:
 *   get:
 *     summary: Récupérer les détails d'un dirigeant
 *     description: Récupère les détails d'un dirigeant en fonction de l'ID spécifié.
 *     tags: [Dirigeants]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du dirigeant à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du dirigeant récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               id: 123
 *               nom: "John Doe"
 *               poste: "PDG"
 *               entreprise: "Entreprise XYZ"
 *               email: "john.doe@example.com"
 *               téléphone: "+1 (123) 456-7890"
 *       404:
 *         description: Dirigeant non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Dirigeant non trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération du dirigeant.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération du dirigeant.
*     security:
 *       - BearerAuth: []
 */

export async function GET(req, { params }) {

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()


    const getDirigant = await prisma.dirigeants.findUnique({
        where: {
            id
        }
    })

    if (getDirigant) {
        return NextResponse.json({ getDirigant })
    } else {
        return NextResponse.json({ message: "Impossible de recuperer le Dirigeant" })
    }

}