import { db } from "@/utils";
import { ADMIN } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){

    const searchParams=req.nextUrl.searchParams;
    const email=searchParams.get('email');

    const result = ((await db.select().from(ADMIN).where(eq(ADMIN.email, email))))
   return NextResponse.json(result)
}