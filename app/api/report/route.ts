
const example = {"patent_id":"BB-RE49889-E1","company_name":"Walmart Inc.","analysis_date":"2023-09-15","analyze":{"overall_risk_assessment":"High risk. Walmart has several products and features that appear to directly infringe on the core claims of the patent related to generating shopping lists from digital advertisements. Walmart should seek a license or modify their products to avoid infringement.","top_infringing_products":[{"explanation":"The Walmart Grocery app allows users to add items to a shopping list from digital advertisements, which directly infringes on the core claims of the patent.","infringement_likelihood":"High","product_name":"Walmart Grocery","relevant_claims":[14,16,17,18,33,34,35,36,37],"specific_features":["Automated list building from ads","Adding items from digital advertisements"]},{"explanation":"An AI-powered shopping list creator from weekly ads infringes on claims related to generating a shopping list from an advertisement for a product.","infringement_likelihood":"High","product_name":"Smart Shopping List","relevant_claims":[14,16,33,36,37],"specific_features":["AI-powered shopping list creator from weekly ads"]},{"explanation":"The ability to add items directly from digital advertisements to a shopping list infringes on core claims of the patent.","infringement_likelihood":"High","product_name":"Quick Add from Ads","relevant_claims":[14,33],"specific_features":["Adding items from digital advertisements"]}]}}

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
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });

}


