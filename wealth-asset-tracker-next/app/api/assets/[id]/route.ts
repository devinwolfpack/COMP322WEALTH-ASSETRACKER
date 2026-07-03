import { NextRespons, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({
    adapter: adapter
});

export async function PUT (
    request: Request,
    context: { params: Promise<{ id:string }>}
) {
    try{
        const params= await context.params;
        const id = Number(params.id);
        const body = await request.json();
        const name = body.name;
        const category = body.category;
        const value= Number(body.value);
        if(!name || !category || value<=0) {
            return NextResponse.json(
                {
                    message: "Name, category, and a value greater than 0 are required"
                },
                {
                    status: 400
                }
            );
        }
        const updatedAsset = await prisma.asset.update({
            where: {
                id: id
            },
            data: {
                name: name,
                category: category,
                value: value
            }
            
        });
        return NextResponse.json(updatedAsset);
    } catch(error) {
        return NextResponse.json(
            {
                message: "Could not update asset"
            },
            {
                status: 500
            }
        );
    }
    }
    export async function DELETE(
        request: Request,
        context: { params: Promsie<NextRespons{ id: string }> }
    ) {
        try{
            const params = await context.params;
            const id = Number(params.id);
            await prisma.asset.delete({
                where: {
                    id: id
                }
            });
            return NextResponse.json({
                message: "Asset deleted"
            });
        } catch(error) {
            return NextResponse.json(
                {
                    message: "Could not delete asset"
                },
                {
                    status: 500
                }
            );
        }
    }
