import { db } from "@/utils"
import { ATTENDANCE, STUDENT } from "@/utils/schema"
import { and, desc, eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req){
    const searchParams=req.nextUrl.searchParams;
    const grade=searchParams.get('grade');
    const month=searchParams.get('month');
    const sch_ID = searchParams.get('sch_ID')

    const result = await db.select({
        day: ATTENDANCE.day,
        presentCount:sql`count(${ATTENDANCE.day})`
    }).from(ATTENDANCE)
    .leftJoin(STUDENT, and(eq(ATTENDANCE.date, month),eq(ATTENDANCE.stud_ID, STUDENT.userID), eq(STUDENT.sch_ID, sch_ID)))
    // .where(eq(STUDENT.sch_ID, sch_ID))
    .groupBy(ATTENDANCE.day).where(eq(STUDENT.grade, grade))
    .orderBy(desc(ATTENDANCE.day))
    .limit(31)

    return NextResponse.json(result)
}