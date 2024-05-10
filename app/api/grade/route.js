import { db } from "@/utils";
import { GRADES } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req){
    const result = ((await db.select().from(GRADES)))
    result.sort((a, b) => a.level_ID - b.level_ID);
   return NextResponse.json(result)
}