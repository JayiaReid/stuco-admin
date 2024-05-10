import { db } from "@/utils";
import { SCHOOL } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req){
    const result = ((await db.select().from(SCHOOL)))
   return NextResponse.json(result)
}