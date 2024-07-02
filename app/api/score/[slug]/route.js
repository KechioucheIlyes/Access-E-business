
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
export async function POST(req, { params }) {

    const id_etudes = parseInt(params.slug)

    const { resultat, naf, score } = await req.json()





    for (const item in resultat) {


        
        if (typeof resultat[item] === "object") {
            console.log("Object")
        } else {
            if (resultat[item].includes("oui")) {
                resultat[item] = true
            } else if (resultat[item].includes("non")) {
                resultat[item] = false
            }
            else if (resultat[item].includes('ne_sais_pas')) {
                resultat[item] = null
            }
        }



    }



    const prisma = new PrismaClient()

    const reponse_resultat = await prisma.resultats.create({
        data: {
            noteGlobal: score.scoreMoyen,
            noteCategorieAnalyse: score.noteCategorieAnalyse,
            noteCategorieEconomiesEnergie: score.noteCategorieEconomiesEnergie,
            noteCategorieReglementaire: score.noteCategorieReglementaire,
            noteCategorieTaxes: score.noteCategorieTaxes,
            CSPE: naf,
            ctr_nb_compteur_gaz: parseInt(resultat["Combien de compteurs d'électricité ou de gaz possédez-vous?"]['ctr_nb_compteur_gaz']),
            ctr_nb_compteur_elec: parseInt(resultat["Combien de compteurs d'électricité ou de gaz possédez-vous?"]['ctr_nb_compteur_elec']),
            ctr_fournisseurs_gaz: resultat['Quelle est votre fournisseur de gaz actuel ?'][0]['Fournisseur de gaz'],
            ctr_fournisseurs_elec: resultat['Quelle est votre fournisseur elec actuel ?'][0]["Fournisseur d'électricité"],
            ctr_ARENH: resultat['Le choix de ce contrat a-t-il été défini en fonction de votre % de bandeau ARENH ?'],
            ctr_renegociation: resultat["Anticipez-vous la date de la renégociation de votre contrat en fonction d'une veille marché quotidienne ?"],
            ctr_duree_engage_definit: resultat["Le choix de la durée d'engagement de vos contrats est-il défini selon le prix de marché le jour du renouvellement ?"],
            ctr_est_accomp_tiers: resultat["accompagner_qui"],
            tx_puissance_souscrite: resultat["Majorité inférieur ou supérieur à 36 KVA ?"],
            tx_formule_tarifaire: resultat["Connaissez-vous votre formule tarifaire d'acheminement ?"],
            tx_subis_penalites: resultat["Avez-vous déjà eu des pénalités de dépassements de puissance ?"],
            tx_surfacturation: resultat["Vos factures d'électricité comportent-elles des lignes de surfacturation en lien avec la consommation d'énergie réactive?"],
            tx_coherence_puissance_1: resultat["Avez-vous déjà étudié la cohérence entre votre puissance souscrite et votre puissance soutirée ?"],
            tx_periodique_1_1: resultat["periodique_chaque_deux_ans"],
            tx_cspe_eligible: resultat["CSPE"],
            ec_reduc_consom: resultat["Votre activité est éligible à un remboursement de la CSPE avez-vous déjà fait cette demande et bénéficiez-vous du taux réduit ?"],
            ec_mesures_econom: resultat["Quelles sont ces mesures ?"] && resultat["Quelles sont ces mesures ?"].length > 0 ? resultat["Quelles sont ces mesures ?"][0]['lesquelles_mesures_reduction'] : null,
            ec_actions_econom: resultat["Quelles sont ces actions ?"] && resultat["Quelles sont ces actions ?"].length > 0 ? resultat["Quelles sont ces actions ?"][0]['action_a_entreprendre'] : null,
            ec_outils_mesure_conso: resultat["Êtes-vous muni de moyens de mesure permettant de quantifier la consommation par équipement (chauffage, éclairage, ventilation, production, etc.)?"],
            rg_adheresion_tertiaire_1: resultat["Êtes-vous assujetti au décret tertiaire ?"],
            rg_adheresion_tertiaire_1_ne_sais_pas: resultat["Êtes-vous assujetti au décret tertiaire ?"],
            rg_operate_tertiaire_oui_01: resultat["Avez-vous répondu à votre première obligation déclarative sur la plate-forme OPERATE ?"],
            rg_oblig_obj_tertiaire_oui_01: resultat["Êtes-vous accompagné d'un tiers pour la seconde obligation d'atteindre les objectifs (-40% d'ici 2030)"],
            rg_bis_1k_tertiaire_non_01: resultat["Possédez-vous ou occupez-vous un bâtiment ou un ensemble de bâtiments dans une seule unité? foncière, dont la surface de plancher est égale ou supérieure à 1 000 m2 ."],
            rg_bacs_oui_01: resultat["Êtes-vous assujetti au décret BACS ?"],
            rg_bacs_outils_oui_01: resultat["Êtes-vous équipé d'une GTB (Gestion technique du Bâtiment)"],
            rg_bacs_ne_sais_pas: resultat["Êtes-vous assujetti au décret BACS ?"],
            id_etudes
        }
    })

    if (reponse_resultat) {

        const dateActuelle = new Date().toISOString();
        const etude = await prisma.etudes.update({
            data: {
                statut: "en cours",
                date_fin: dateActuelle
            },
            where: {
                id: id_etudes
            },
            include: {
                Clients: true
            },


        })
        if (etude) {

            const contrat = await prisma.contrats.create({
                data: {
                    reference_contrat: `contrat-${reponse_resultat.id}-${etude.id}`,
                    nom_site: etude.Clients.raison_sociale,
                    fournisseur: `${['Quelle est votre fournisseur de gaz actuel ?'][0]['Fournisseur de gaz']}-${resultat['Quelle est votre fournisseur elec actuel ?'][0]["Fournisseur d'électricité"]}`,
                    id_etudes: id_etudes
                }

            })

            if (contrat) {
                return NextResponse.json({ resultat: resultat, etude, contrat }, { status: 200 })
            } else {
                return NextResponse.json({ message: "Erreur l'ors de la création du resultat !" }, { status: 400 })
            }
        } else {
            return NextResponse.json({ message: "Erreur l'ors de la création du resultat !" }, { status: 400 })
        }
    }
    else {
        return NextResponse.json({ message: "Erreur l'ors de la création du resultat !" }, { status: 400 })
    }


}