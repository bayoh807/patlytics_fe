module.exports = {

"[project]/app/api/report/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString(); // 直接生成查詢字串
    const response = await fetch(`http://dev-be/report?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

})()),

};

//# sourceMappingURL=app_api_report_route_ts_d0f5e1._.js.map