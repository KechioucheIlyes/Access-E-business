import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    const prisma = new PrismaClient();

    const { userID } = await req.json();

    let good = false

    try {
        await prisma.$transaction(async (prisma) => {

            const clients = await prisma.clients.findMany({
                where: {
                    user_id: userID
                },
                select: {
                    id: true
                }
            })

            // Extraire les identifiants des clients
            const clientIds = clients.map(client => client.id)


            const etudes = await prisma.etudes.findMany({
                where: {
                    ID_clients: {
                        in: clientIds
                    }
                }
            })

            const etudesIds = etudes.map(etude => etude.id)

            console.log(etudesIds)
            console.log(clientIds)

            await prisma.contrats.deleteMany({
                where: {
                    id_etudes: {
                        in: etudesIds
                    }
                }
            })

            await prisma.commissions.deleteMany({
                where: { user_id: userID },
            });

            await prisma.resultats.deleteMany({
                where: {
                    id_etudes: {
                        in: etudesIds
                    }
                }
            })



            await prisma.filleul.deleteMany({
                where: { user_id: userID },
            });
            await prisma.token_mail.deleteMany({
                where: { userId: userID },
            });

            // Supprimer les études liées aux clients
            await prisma.etudes.deleteMany({
                where: {
                    ID_clients: {
                        in: clientIds
                    }
                }
            })


            await prisma.dirigeants.deleteMany({
                where: {
                    ID_clients: {
                        in: clientIds
                    }
                }
            })

            await prisma.clients.deleteMany({
                where: { user_id: userID },
            });


            // Supprimer les enregistrements dépendants ici


            await prisma.authentication.deleteMany({
                where: {
                    userId: userID
                }
            })

            const userDeleted = await prisma.user.delete({
                where: {
                    id: userID,
                },
            });

            if (userDeleted) {
                good = true
            }


        });


        if (good) {
            return NextResponse.json({
                userDeleted: good,
                message: "Utilisateur supprimé avec succès !",
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: "Erreur l'or de la suppression de l'utilisateur !",
            }, { status: 400 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Erreur serveur !",
        }, { status: 500 });
    }
}