import { db } from "@/utils"
import { LEVELS } from "@/utils/schema"
import { NextResponse } from "next/server"

export async function GET(req){

    const result = ((await db.select().from(LEVELS)))
   return NextResponse.json(result)
}