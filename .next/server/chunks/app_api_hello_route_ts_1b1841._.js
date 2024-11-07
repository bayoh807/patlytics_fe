module.exports = {

"[project]/app/api/hello/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
async function GET(request) {
    const response = await fetch("http://dev-be/search", {
        method: "GET"
    });
    return new Response(response.body, {
        status: 200
    });
}

})()),

};

//# sourceMappingURL=app_api_hello_route_ts_1b1841._.js.map