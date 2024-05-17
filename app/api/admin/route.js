import { db } from "@/utils";
import { ADMIN } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const result = ((await db.select().from(ADMIN)))
   return NextResponse.json(result)
}

export async function POST(req, res){
    const data =await req.json()
    const result = await db.insert(ADMIN)
    .values({
        fname: data?.fname,
        lname: data?.lname,  
        role:   data?.role,
        email: data?.email 
    });

    return NextResponse.json(result)

}

export async function DELETE(req){

    const searchParams=req.nextUrl.searchParams;
    const adminID=searchParams.get('adminID');

    const result=await db.delete(SCHOOL).where(eq(ADMIN.adminID, adminID))

    return NextResponse.json(result)
}