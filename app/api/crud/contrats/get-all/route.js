import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
// recuperer tout les resultat



/**
 * @swagger
 * /api/crud/contrats/get-all:
 *   get:
 *     summary: Récupérer tous les contrats
 *     description: Récupère tous les contrats disponibles.
 *     tags: [Contrats]
 *     responses:
 *       200:
 *         description: Liste de tous les contrats récupérée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               allContrats: [
 *                 {
 *                   id: 123,
 *                   reference_contrat: "CON-123",
 *                   nom_site: "Site A",
 *                   fournisseur: "Fournisseur Inc.",
 *                   date_echeance: "2023-12-31",
 *                   type_contrat: "Achat",
 *                   fichier_contrat: "contrat123.pdf",
 *                   id_etudes: 456
 *                 },
 *                 {
 *                   id: 124,
 *                   reference_contrat: "CON-124",
 *                   nom_site: "Site B",
 *                   fournisseur: "Fournisseur Corp.",
 *                   date_echeance: "2023-11-30",
 *                   type_contrat: "Location",
 *                   fichier_contrat: "contrat124.pdf",
 *                   id_etudes: 457
 *                 },
 *                 // Autres contrats...
 *               ]
 *       500:
 *         description: Erreur serveur lors de la récupération de tous les contrats.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération de tous les contrats.
*     security:
 *       - BearerAuth: []
 */

export async function GET(req) {

    const prisma = new PrismaClient()


    const allContrats = await prisma.contrats.findMany()

    if (allContrats) {
        return NextResponse.json({ allContrats })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la recuperation de tout les contrats" })
    }

}
