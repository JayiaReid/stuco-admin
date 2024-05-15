import { db } from "@/utils";
import { STUDENT } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const data = await req.json();

    const result = await db.insert(STUDENT)
    .values({
        fname: data?.fname,
        lname: data?.lname,
        email: data?.email,
        userID: data?.userID,
        stud_ID: data?.stud_ID,
        passwrd: data?.passwrd,
        sch_ID: data?.sch_ID,
        grade: data?.grade
    })

    return NextResponse.json(result)
}

export async function GET(req){
    const result = await db.select().from(STUDENT)

    return NextResponse.json(result)
}

export async function DELETE(req){

    const searchParams=req.nextUrl.searchParams;
    const userID=searchParams.get('userID');

    const result=await db.delete(STUDENT).where(eq(STUDENT.userID, userID))

    return NextResponse.json(result)

}