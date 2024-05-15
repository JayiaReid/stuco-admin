import { db } from "@/utils";
import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){

    const searchParams=req.nextUrl.searchParams;
    const grade=searchParams.get('grade');
    const month=searchParams.get('month');
    const sch_ID = searchParams.get('sch_ID')
    
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
    .where(and(eq(STUDENT.sch_ID, sch_ID),eq(STUDENT.grade, grade)))

    return NextResponse.json(result)
}