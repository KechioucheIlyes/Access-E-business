import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
// recuperer tout les resultat


/**
 * @swagger
 * /api/crud/dirigeants/get-all:
 *   get:
 *     summary: Récupérer tous les dirigeants
 *     description: Récupère tous les dirigeants.
 *     tags: [Dirigeants]
 *     responses:
 *       200:
 *         description: Tous les dirigeants récupérés avec succès.
 *         content:
 *           application/json:
 *             example:
 *               allDirigants: 
 *               - id: 1
 *                 civilite: "M."
 *                 nom: "Doe"
 *                 prenom: "John"
 *                 date_naissance: "1990-01-01"
 *                 email: "john.doe@example.com"
 *                 mobile: "+1 (123) 456-7890"
 *                 fixe: "+1 (123) 456-7891"
 *                 fonction: "PDG"
 *                 signataire: true
 *                 decisionnaire: true
 *                 signature_fichier: "john_doe_signature.pdf"
 *                 ID_clients: 123
 *               - id: 2
 *                 civilite: "Mme."
 *                 nom: "Smith"
 *                 prenom: "Jane"
 *                 date_naissance: "1992-03-15"
 *                 email: "jane.smith@example.com"
 *                 mobile: "+1 (234) 567-8901"
 *                 fixe: "+1 (234) 567-8902"
 *                 fonction: "Directeur Marketing"
 *                 signataire: false
 *                 decisionnaire: false
 *                 signature_fichier: "jane_smith_signature.pdf"
 *                 ID_clients: 124
 *       500:
 *         description: Erreur serveur lors de la récupération de tous les dirigeants.
 *         content:
 *           application/json:
 *             example:
 *               message: Échec lors de la récupération de tous les dirigeants.
*     security:
 *       - BearerAuth: []
 */

export async function GET(req) {

    const prisma = new PrismaClient()


    const allDirigants = await prisma.dirigeants.findMany()

    if (allDirigants) {
        return NextResponse.json({ allDirigants })
    } else {
        return NextResponse.json({ message: "Echec l'ors de la recuperation de tout les resultat" })
    }

}
