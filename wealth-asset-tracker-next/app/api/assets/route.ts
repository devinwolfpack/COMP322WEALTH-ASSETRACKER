import { NextResponse} from "next/server";
import {PrismaClient} from "../../../generated/prisma";
import { PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({
    adapter: adapter
});

export async function GET() {
    try{
        const assets = await prisma.asset.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(assets);
    } 
    catch(error) {
        return NextResponse.json(
            {
                message: "Could not get assets"
            },
            {
                status : 500
            }
        );
    }
}
export async function POST(request: Request) {
    try{
        const body = await request.json();
        const name = body.name;
        const category = body.category;
        const value = Number(body.value);

    if(!name || !category || value<= 0) {
        return NextResponse.json(
            {
                message: "Name, category, and a value greater than 0 are required"
            },
            {
                status : 400
            }
        );
    }
    const newAsset= await prisma.asset.create({
        data: {
            name: name,
            category: category,
            value: value
        }
    });
    return NextResponse.json(newAsset);
}
catch(error) {
    return NextResponse.json(
        {
            message: "Could not create asset"
        },
        {
            status: 500
        }
    );
}
}