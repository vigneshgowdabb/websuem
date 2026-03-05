module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},50645,a=>{a.n(a.i(27572))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},44067,a=>{a.n(a.i(36102))},97582,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/admin/projects/AdminProjectsClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/admin/projects/AdminProjectsClient.tsx <module evaluation>","default")},54729,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/admin/projects/AdminProjectsClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/admin/projects/AdminProjectsClient.tsx","default")},69217,a=>{"use strict";a.i(97582);var b=a.i(54729);a.n(b)},80955,a=>{"use strict";var b=a.i(7997),c=a.i(22176),d=a.i(69217);async function e(){let a=await (0,c.createClient)(),{data:e}=await a.from("clients").select(`
            id,
            company_name,
            profiles ( full_name, role )
        `),{data:f}=await a.from("projects").select(`
            *,
            clients ( company_name, profiles ( full_name ) ),
            deliverables (*)
        `).order("created_at",{ascending:!1});return(0,b.jsx)(d.default,{initialProjects:f||[],clients:e||[]})}a.s(["default",()=>e])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1cfbd480._.js.map