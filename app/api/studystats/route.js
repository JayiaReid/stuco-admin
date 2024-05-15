import { db } from "@/utils"
import { STUDYSTATS } from "@/utils/schema"
import { NextResponse } from "next/server"

export async function GET(){

    const result = await db.select().from(STUDYSTATS)

    return NextResponse.json(result)
}