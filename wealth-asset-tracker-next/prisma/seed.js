require("dotenv/config");
const {PrismaClient} = require("../generated/prisma");
const{ PrismaPg}=require("@prisma/adapter-pg");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma= new PrismaClient({
    adapter: adapter
});
async function main() {
    const assetCount= await prisma.asset.count();
    if (assetCount===0){
        await prisma.asset.createMany({
            data: [ {
                name: "Savings Account",
                category: "Cash",
                value: 1000000
            },
            {
                name: "Space x stock",
                category: "Investments",
                value: 1000000
            },
            {
                name: "Tesla",
                category: "Vehicle",
                value: 25000
            }
        ]
        });
    console.log("Seed data added successfully.");
} else {
    console.log("Database already has assets. Seed data was not added.");
}
}
main()
.then(async function() {
    await prisma.$disconnect();

})
.catch(async function(error){
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);

});
