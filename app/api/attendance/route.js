import { db } from "@/utils";
import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { eq, isNull, or } from "drizzle-orm";
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
        attendanceID: ATTENDANCE.id
    }).from(STUDENT)
    .leftJoin(ATTENDANCE, eq(STUDENT.userID, ATTENDANCE.stud_ID))
    .where(eq(STUDENT.grade, grade))
    .where (
        or (eq(ATTENDANCE.date, month), isNull(ATTENDANCE.date))
    )

    return NextResponse.json(result)
}