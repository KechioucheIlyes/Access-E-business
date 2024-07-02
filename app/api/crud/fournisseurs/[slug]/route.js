import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

// Récuper les détails d'un fournisseur par ID

/**
 * @swagger
 * tags:
 *   name: Fournisseurs
 *   description: Opérations liées aux fournisseurs
 */

/**
 * @swagger
 * /api/crud/fournisseurs/{slug}:
 *   get:
 *     summary: Récupérer les détails d'un fournisseur
 *     description: Récupère les détails d'un fournisseur en fonction de l'ID spécifié.
 *     tags: [Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du fournisseur à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du fournisseur récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               findFournisseurById: {
 *                 id: 1,
 *                 nom: "Fournisseur Exemple",
 *                 adresse: "123 Rue de l'Exemple",
 *                 telephone: "123-456-7890",
 *                 email: "exemple@example.com"
 *               }
 *       404:
 *         description: Fournisseur non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Fournisseur non trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération du fournisseur.
*     security:
 *       - BearerAuth: []
 */

export async function GET(req, { params }) {
    const id = params.slug

    const intId = parseInt(id, 10)

    const prisma = new PrismaClient()


    const findFournisseurById = await prisma.fournisseurs.findFirst({
        where: {
            id: intId
        },
    })


    return NextResponse.json({ findFournisseurById })

}