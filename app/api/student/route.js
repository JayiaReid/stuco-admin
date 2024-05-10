import { db } from "@/utils";
import { STUDENT } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const data = await req.json();

    const result = await db.insert(STUDENT)
    .values({
        fname: data?.fname,
        lname: data?.lname,
        email: data?.email,
        // DOB: null,
        stud_ID: data?.stud_ID,
        passwrd: data?.passwrd,
        sch_ID: data?.sch_ID,
        grade: data?.grade
    })

    return NextResponse.json(result)
}