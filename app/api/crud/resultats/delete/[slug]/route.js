//Suprimer un resultat
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"


/**
 * @swagger
 * /api/crud/resultat/delete/{slug}:
 *   delete:
 *     summary: Supprimer un résultat d'étude
 *     description: Supprime un résultat d'étude en fonction de l'ID spécifié.
 *     tags: [Résultats]
 *     parameters:
 *       - in: path
 *         name: slug
 *         description: ID du résultat d'étude à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Résultat d'étude supprimé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Résultat supprimé avec succès !
 *       404:
 *         description: Résultat d'étude non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Résultat d'étude non trouvé.
 *       500:
 *         description: Erreur serveur lors de la suppression du résultat d'étude.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la suppression du résultat d'étude.
*     security:
 *       - BearerAuth: []
 */

export async function DELETE(req, { params }) {

    const id = parseInt(params.slug)
    const prisma = new PrismaClient()

    const deletedResultat = await prisma.resultats.delete({
        where: {
            id
        }
    })

    if (deletedResultat) {
        return NextResponse.json({ message: "Resultat supprimé avec succès !" })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la suppression du Resultat !" })
    }
}