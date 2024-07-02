import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { sendEmail } from "./../../../../../../libs/SendMail/sendMail";

export async function POST(req) {

    const {
        reference,
        courtage,
        turpe,
        CSPE,
        logiciel,
        GTB,
        montant_commission_total,
        montant_commission_courtage,
        montant_commission_turpe,
        montant_commission_cspe,
        montant_commission_logiciel,
        montant_commission_gtb,
        user_id,
        etude_id,
        username,
        useremail

    } = await req.json()

    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
        where: {
            id: user_id
        }
    })

    if (user.affiliation_id) {
        const filleul = await prisma.filleul.findUnique({
            where: {
                lien_affiliation: user.affiliation_id
            }
        })

        if (filleul) {
            const dateExpiration = new Date(filleul.date_expiration_avantage)
            const maintenant = new Date();

            if (dateExpiration > maintenant) {
                const comission_filleul = await prisma.commission_filleul.create({
                    data: {
                        montant_commission_filleul: parseFloat(montant_commission_total),
                        montant_commission_parrain: parseFloat((montant_commission_total * filleul.pourcentage_promo) / 100),
                        filleul_id: filleul.id,
                        courtage,
                        TURP: turpe,
                        CSPE,
                        logiciel,
                        GBT: GTB,
                    }

                })

                if (comission_filleul) {
                    const commission = await prisma.commissions.create({
                        data: {
                            reference,
                            courtage,
                            TURP: turpe,
                            CSPE,
                            logiciel,
                            GBT: GTB,
                            montant_commission_total: parseFloat(montant_commission_total),
                            montant_commission_courtage: parseFloat(montant_commission_courtage),
                            montant_commission_TURP: parseFloat(montant_commission_turpe),
                            montant_commission_CSPE: parseFloat(montant_commission_cspe),
                            montant_commission_logiciel: parseFloat(montant_commission_logiciel),
                            montant_commission_GBT: parseFloat(montant_commission_gtb),
                            user_id,
                            Date_signature: new Date().toISOString(),
                            Date_signature_courtage: courtage ? new Date().toISOString() : null,
                            Date_signature_CSPE: CSPE ? new Date().toISOString() : null,
                            Date_signature_GBT: GTB ? new Date().toISOString() : null,
                            Date_signature_logiciel: logiciel ? new Date().toISOString() : null,
                            Date_signature_TURP: turpe ? new Date().toISOString() : null,
                        },

                    })

                    if (commission) {
                        const etudes = await prisma.etudes.update({
                            where: {
                                id: etude_id
                            },
                            data: {
                                statut: 'terminé',
                                commissionsId: commission.id
                            }
                        })

                        if (etudes) {
                            const emailOptions = {
                                to: useremail,
                                subject: 'Notification de Mise à Jour de la Commission',
                                text: `Bonjour ${username}, votre commission a été mise à jour avec succès !`,
                                html: `<p>Bonjour <b>${username}</b>,<br>Votre commission pour {{nom_entreprise}} viens d'être traiter ! <br>Venez vite découvrir votre solde dans la rubrique Commission ! </p>`, // corps HTML
                            };
                            try {
                                await sendEmail(emailOptions);
                                return NextResponse.json({ commission, etudes: etudes.statut, message: `Commission et commission Filleul créées avec succès ! Un e-mail a été envoyé à ${username} pour l'informé !` }, { status: 200 });

                            } catch (error) {
                                return NextResponse.json({ message: "La commission a été créée, mais l'envoi de l'e-mail de notification a échoué !" }, { status: 500 });
                            }
                        }
                        else {
                            return NextResponse.json({ message: "Erreur l'ors de la création de la commission ! " }, { status: 400 })
                        }
                    }
                    else {
                        return NextResponse.json({ message: "Erreur l'ors de la création de la commission ! " }, { status: 400 })
                    }
                }

            } else {
                const commission = await prisma.commissions.create({
                    data: {
                        reference,
                        courtage,
                        TURP: turpe,
                        CSPE,
                        logiciel,
                        GBT: GTB,
                        montant_commission_total: parseFloat(montant_commission_total),
                        montant_commission_courtage: parseFloat(montant_commission_courtage),
                        montant_commission_TURP: parseFloat(montant_commission_turpe),
                        montant_commission_CSPE: parseFloat(montant_commission_cspe),
                        montant_commission_logiciel: parseFloat(montant_commission_logiciel),
                        montant_commission_GBT: parseFloat(montant_commission_gtb),
                        user_id,
                        Date_signature: new Date().toISOString(),
                        Date_signature_courtage: courtage ? new Date().toISOString() : null,
                        Date_signature_CSPE: CSPE ? new Date().toISOString() : null,
                        Date_signature_GBT: GTB ? new Date().toISOString() : null,
                        Date_signature_logiciel: logiciel ? new Date().toISOString() : null,
                        Date_signature_TURP: turpe ? new Date().toISOString() : null,
                    },

                })

                if (commission) {
                    const etudes = await prisma.etudes.update({
                        where: {
                            id: etude_id
                        },
                        data: {
                            statut: 'terminé',
                            commissionsId: commission.id
                        }
                    })

                    if (etudes) {
                        const emailOptions = {
                            to: useremail,
                            subject: 'Notification de Mise à Jour de la Commission',
                            text: `Bonjour ${username}, votre commission a été mise à jour avec succès !`,
                            html: `<p>Bonjour <b>${username}</b>,<br>Votre commission pour {{nom_entreprise}} viens d'être traiter ! <br>Venez vite découvrir votre solde dans la rubrique Commission ! </p>`, // corps HTML
                        };
                        try {
                            await sendEmail(emailOptions);
                            return NextResponse.json({ commission, etudes: etudes.statut, message: `Commission créée avec succès ! Un e-mail a été envoyé à ${username} pour l'informé !` }, { status: 200 });

                        } catch (error) {
                            return NextResponse.json({ message: "La commission a été créée, mais l'envoi de l'e-mail de notification a échoué !" }, { status: 500 });
                        }
                    }
                    else {
                        return NextResponse.json({ message: "Erreur l'ors de la création de la commission ! " }, { status: 400 })
                    }
                }
                else {
                    return NextResponse.json({ message: "Erreur l'ors de la création de la commission ! " }, { status: 400 })
                }
            }
        }
    } else {
        const commission = await prisma.commissions.create({
            data: {
                reference,
                courtage,
                TURP: turpe,
                CSPE,
                logiciel,
                GBT: GTB,
                montant_commission_total: parseFloat(montant_commission_total),
                montant_commission_courtage: parseFloat(montant_commission_courtage),
                montant_commission_TURP: parseFloat(montant_commission_turpe),
                montant_commission_CSPE: parseFloat(montant_commission_cspe),
                montant_commission_logiciel: parseFloat(montant_commission_logiciel),
                montant_commission_GBT: parseFloat(montant_commission_gtb),
                user_id,
                Date_signature: new Date().toISOString(),
                Date_signature_courtage: courtage ? new Date().toISOString() : null,
                Date_signature_CSPE: CSPE ? new Date().toISOString() : null,
                Date_signature_GBT: GTB ? new Date().toISOString() : null,
                Date_signature_logiciel: logiciel ? new Date().toISOString() : null,
                Date_signature_TURP: turpe ? new Date().toISOString() : null,
            },

        })

        if (commission) {
            const etudes = await prisma.etudes.update({
                where: {
                    id: etude_id
                },
                data: {
                    statut: 'terminé',
                    commissionsId: commission.id
                }
            })

            if (etudes) {
                const emailOptions = {
                    to: useremail,
                    subject: 'Notification de Mise à Jour de la Commission',
                    text: `Bonjour ${username}, votre commission a été mise à jour avec succès !`,
                    html: `<p>Bonjour <b>${username}</b>,<br>Votre commission pour {{nom_entreprise}} viens d'être traiter ! <br>Venez vite découvrir votre solde dans la rubrique Commission ! </p>`, // corps HTML
                };
                try {
                    await sendEmail(emailOptions);
                    return NextResponse.json({ commission, etudes: etudes.statut, message: `Commission créée avec succès ! Un e-mail a été envoyé à ${username} pour l'informé !` }, { status: 200 });

                } catch (error) {
                    return NextResponse.json({ message: "La commission a été créée, mais l'envoi de l'e-mail de notification a échoué !" }, { status: 500 });
                }
            }
            else {
                return NextResponse.json({ message: "Erreur l'ors de la création de la commission ! " }, { status: 400 })
            }
        }
        else {
            return NextResponse.json({ message: "Erreur l'ors de la création de la commission ! " }, { status: 400 })
        }
    }



}