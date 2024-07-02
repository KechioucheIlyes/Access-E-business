import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
// recuperation resultat by id

/**
 * @swagger
 * tags:
 *   name: Résultats
 *   description: Opérations liées aux résulats d'une études
 */
/**
 * @swagger
 * /api/crud/resultats/{slug}:
 *   get:
 *     summary: Récupérer les détails d'un résultat d'étude
 *     description: Récupère les détails d'un résultat d'étude en fonction de l'ID spécifié.
 *     tags: [Résultats]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du résultat d'étude à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du résultat d'étude récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               getResultat: {
 *                 courtage: "Exemple de courtage",
 *                 TURPE: "Exemple de TURPE",
 *                 CSPE: "Exemple de CSPE",
 *                 logiciel: "Exemple de logiciel",
 *                 GTB: "Exemple de GTB",
 *                 ctr_nb_compteur_gaz: "Exemple de compteur gaz",
 *                 ctr_nb_compteur_elec: "Exemple de compteur électricité",
 *                 ctr_fournisseurs_gaz: "Exemple de fournisseurs gaz",
 *                 ctr_fournisseurs_elec: "Exemple de fournisseurs électricité",
 *                 ctr_ARENH: "Exemple de ARENH",
 *                 // Ajoutez d'autres détails ici
 *                 id_etudes: 1
 *               }
 *       404:
 *         description: Résultat d'étude non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Résultat d'étude non trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération du résultat d'étude.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération du résultat d'étude.
*     security:
 *       - BearerAuth: []
 */


export async function GET(req, { params }) {

    const id = parseInt(params.slug)

    const prisma = new PrismaClient()

    const getResultat = await prisma.resultats.findUnique({
        where: {
            id
        }
    })

    if (getResultat) {
        return NextResponse.json({ getResultat })
    } else {
        return NextResponse.json({ message: "Aucun resultat d'étude n'a été trouvé !" }, { status: 400 })
    }
}