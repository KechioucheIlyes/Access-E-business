import { NextRequest, NextResponse } from "next/server"
import GenerateContratPDF from "./../../../libs/protected/generatePDF/generatePdf"
import { PrismaClient } from "@prisma/client"
import { SubmissionEsign } from "./submissions"
import { Esign } from "./esign"
export async function POST(req) {

    const prisma = new PrismaClient()

    const { result, client, etudes } = await req.json()

    const prestation_courtage_elec = result.ctr_nb_compteur_elec > 0 ? true : false
    const prestation_courtage_gaz = result.ctr_nb_compteur_gaz > 0 ? true : false
    const prestation_turpe = result.noteCategorieTaxes <= 5 ? true : false
    const cspe = result.CSPE
    const presta_eco_energie = result.noteCategorieEconomiesEnergie <= 5 ? true : false
    const presta_decret_tertiare = (result && (result.rg_operate_tertiaire_oui_01 || result.rg_oblig_obj_tertiaire_oui_01 || result.rg_bis_1k_tertiaire_non_01)) ? true : false
    const presta_decret_bacs = result && result.rg_bacs_outils_oui_01 ? true : false
    const nom_societe = client.nom_entreprise
    const forme_juridique = client.forme_juridique
    const ville = client.ville
    const siret = client.siret
    const adresse = client.adresse_postal
    const contact_signataire = `${client.Dirigeants[0].nom.toUpperCase()} ${client.Dirigeants[0].prenom}`
    const fonction = client.Dirigeants[0].fonction



    let pdfEsign = await Esign(nom_societe, forme_juridique, ville, siret, adresse, contact_signataire, prestation_courtage_elec, prestation_courtage_gaz, prestation_turpe, cspe, presta_eco_energie, presta_decret_tertiare, presta_decret_bacs, fonction)





    const contrat = await prisma.contrats.findFirst({
        where: {
            id_etudes: etudes.id
        }
    })


    let pdfID = pdfEsign[0].id

    let SubmissionData = await SubmissionEsign(pdfID)

    const updatedEtude = await prisma.etudes.update({
        data: {
            brouillon: false
        },
        where: {
            id: etudes.id
        }
    })

    //TODO:UNE FOIS QUE JE POST LA SUBMISSION JE RECUPERE LE ID ET J'APPPELLE LAPI ROUTE /submission/:id pour stocker l'url du contrat signé plus le statut du contrat (à rajouter dans la bdd)
    if (contrat) {
        const updatedContrat = await prisma.contrats.update({
            where: {
                id: contrat.id,
            },
            data: {
                status: SubmissionData.status,
                pdfID: pdfEsign[0].id
            }
        })

        if (updatedContrat) {
            return NextResponse.json({ message: "Un e-mail viens de vous être envoyée pour signer les CPP", statut: updatedContrat.status })
        }
        else {
            return NextResponse.json({ message: "erreur !" })
        }

    }


}
