module.exports = [
"[externals]/child_process [external] (child_process, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_child_process_964038fc._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/child_process [external] (child_process, cjs)");
    });
});
}),
"[project]/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_871181ae._.js",
  "server/chunks/ssr/[externals]_node:crypto_c20cce38._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
    });
});
}),
];