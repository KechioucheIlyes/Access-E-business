import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
// recuperer tout les resultat


/**
 * @swagger
 * /api/crud/resultat/get-all:
 *   get:
 *     summary: Récupérer tous les résultats d'étude
 *     description: Récupère tous les résultats d'étude disponibles.
 *     tags: [Résultats]
 *     responses:
 *       200:
 *         description: Résultats d'étude récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               allResultat: [
 *                 { // Exemple du premier résultat d'étude
 *                   id: 1,
 *                   courtage: "ExempleCourtage",
 *                   TURPE: "ExempleTURPE",
 *                   CSPE: "ExempleCSPE",
 *                   logiciel: "ExempleLogiciel",
 *                   GTB: "ExempleGTB",
 *                   // ... Autres propriétés du résultat
 *                 },
 *                 { // Exemple du deuxième résultat d'étude
 *                   id: 2,
 *                   courtage: "ExempleCourtage2",
 *                   TURPE: "ExempleTURPE2",
 *                   CSPE: "ExempleCSPE2",
 *                   logiciel: "ExempleLogiciel2",
 *                   GTB: "ExempleGTB2",
 *                   // ... Autres propriétés du résultat
 *                 },
 *                 // ... Autres résultats d'étude
 *               ]
 *       404:
 *         description: Aucun résultat d'étude trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: Aucun résultat d'étude trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération des résultats d'étude.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération des résultats d'étude.
*     security:
 *       - BearerAuth: []
 */

export async function GET(req) {

    const prisma = new PrismaClient()


    const allResultat = await prisma.resultats.findMany()

    if (allResultat) {
        return NextResponse.json({ allResultat })
    } else {

        return NextResponse.json({ message: "Echec l'ors de la recuperation de tout les resultat" })
    }
}
