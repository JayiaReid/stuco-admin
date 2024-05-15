import { db } from "@/utils";
import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){

    const searchParams=req.nextUrl.searchParams;
    const grade=searchParams.get('grade');
    const month=searchParams.get('month');
    
    const result = await db.select({
        stud_ID: STUDENT.userID,
        fname:STUDENT.fname,
        lname: STUDENT.lname,
        present: ATTENDANCE.present,
        day:ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENT.grade,
        attendanceID: ATTENDANCE.id,
    }).from(STUDENT)
    .leftJoin(ATTENDANCE, and(eq(STUDENT.userID, ATTENDANCE.stud_ID), eq(ATTENDANCE.date, month)))
    .where(eq(STUDENT.grade, grade))

    return NextResponse.json(result)
}

export async function POST(req, res){

    const data = await req.json()
    console.log(data)

    const result = await db.insert(ATTENDANCE)
    .values({
        stud_ID:data.stud_ID,
        present:data.present,
        day: data.day,
        date:data.date
    })

    return NextResponse.json(result)
}

export async function DELETE(req){

    const searchParams=req.nextUrl.searchParams
    const stud_ID= searchParams.get('stud_ID')
    const date= searchParams.get('date')
    const day= searchParams.get('day')
    // const id = searchParams.get('id')

    const result = await db.delete(ATTENDANCE).where(
        and(
            eq(ATTENDANCE.stud_ID, stud_ID),
            eq(ATTENDANCE.day, day),
            eq(ATTENDANCE.date, date)
        )
        
    )

    return NextResponse.json(result)
}