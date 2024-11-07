
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString(); // 直接生成查詢字串

    const response = await fetch(`${process.env.API_URL}/report?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });


    const data = await response.json();

    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
            "Content-Type": "application/json",
        },
    });

}
