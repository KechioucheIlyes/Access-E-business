import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { NextResponse } from "next/server"
import fs from "fs"



/**
 * @swagger
 * /api/crud/fournisseurs/create:
 *   post:
 *     summary: Créer un fournisseur avec logo
 *     description: Crée un nouveau fournisseur avec un logo.
 *     tags: [Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom_fournisseur:
 *                 type: string
 *                 description: Nom du fournisseur.
 *               image:
 *                 type: file
 *                 description: Logo du fournisseur au format image.
 *               type_energie:
 *                 type: string
 *                 description: Type d'énergie fournie par le fournisseur.
 *     responses:
 *       201:
 *         description: Fournisseur créé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Fournisseur créé avec succès !
 *       400:
 *         description: Erreur lors de la création du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               error: La création du fournisseur n'a pas abouti !
 *       500:
 *         description: Erreur serveur lors de la création du fournisseur.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur serveur lors de la création du fournisseur.
*     security:
 *       - BearerAuth: []
 */
// Créer un fournisseur 

const saveFile = async (file) => {
    if (!file) {
        console.error('File is undefined');
        return;
    }


    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const fileExtension = file.name.split('.').pop(); // Obtenez l'extension du fichier
    const uniqueFileName = `${timestamp}.${fileExtension}`;

    const publicPath = `./public/logo-fournisseurs/${uniqueFileName}`;

    try {

        const fileBuffer = await file.arrayBuffer();
        await fs.promises.writeFile(publicPath, Buffer.from(fileBuffer));

        return publicPath
    } catch (error) {
        console.error(`Error saving file: ${error.message}`);
        return null
    }
};

export async function POST(req) {
    const formData = await req.formData()

    const nom_fournisseur = formData.get('nom_fournisseur')
    const logo = formData.get('image')
    const type_energie = formData.get('type_energie')


    if (!logo) {
        return NextResponse.json({ error: "no image" })
    } else {

        const publicPath = await saveFile(logo)
        if (publicPath) {
            const prisma = new PrismaClient()

            const createFournisseur = await prisma.fournisseurs.create({
                data: {
                    nom_fournisseur,
                    logo: publicPath,
                    type_energie
                }
            })

            if (createFournisseur) {
                return NextResponse.json({
                    message: "Fournisseur créé avec success !"
                }, { status: 201 })
            } else {
                return NextResponse.json({
                    error: "la création du fournisseur n'a pas aboutie !"
                })
            }
        }

    }


}
