import { db } from "@/utils";
import { SCHOOL } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const result = ((await db.select().from(SCHOOL)))
   return NextResponse.json(result)
}

export async function POST(req, res){
    const data = await req.json();

    const result = await db.insert(SCHOOL)
    .values({
        sch_ID: data?.sch_ID,
        sch_name: data?.sch_name,
        level_ID: data?.level_ID,
        region: data?.region,
        country: data?.country
    });

    return NextResponse.json(result)

}

export async function DELETE(req){

    const searchParams=req.nextUrl.searchParams;
    const sch_ID=searchParams.get('sch_ID');

    const result=await db.delete(SCHOOL).where(eq(SCHOOL.sch_ID, sch_ID))

    return NextResponse.json(result)
}