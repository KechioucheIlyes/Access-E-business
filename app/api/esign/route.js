import { NextResponse } from "next/server";
import { Submissions } from "./submissions"
export async function GET(req) {


    const pdfID = req.nextUrl.searchParams.get("id")
   
    if (pdfID !== 'null') {
        const sub = await Submissions(pdfID)

        return NextResponse.json({ sub: sub.documents , status :sub.status })
    } else {
        return NextResponse.json({ msg: "test" }, { status: 400 })
    }



}