import { NextResponse } from "next/server";
export async function GET(req, { params }) {

    const siren = params.slug;

    try {
        const res = await fetch(`https://api.pappers.fr/v2/entreprise?api_token=${process.env.PAPPERS_API}&siren=${siren}`);
        if (res.ok) {
            const data = await res.json();

            return NextResponse.json({ data });
        } else {
            return NextResponse.json({ message: "erreur serveur" });
        }
    } catch (error) {
        return NextResponse.json({ message: "Une erreur s'est produite lors de la requête." });
    }
}
