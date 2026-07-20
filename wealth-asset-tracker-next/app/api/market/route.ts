import{ NextResponse} from "next/server";
export async function GET() {
    try{
        const response= await fetch (
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
            {
                cache:"no-store"
            }
        );
        if (!response.ok) {
            return NextResponse.json(
                {
                    message: "Could not fetch market data"
                },
                {
                    status: 500
                }
            );
                }
                const data=await response.json();
                return NextResponse.json(data);
            } catch (error) {
                return NextResponse.json(
                    {
                        message: "Could not fetch market data"
                    },
                    {
                        status: 500
                    }
                );
            }
        }
