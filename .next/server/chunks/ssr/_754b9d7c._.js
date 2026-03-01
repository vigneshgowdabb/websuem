module.exports=[50645,a=>{a.n(a.i(27572))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},44067,a=>{a.n(a.i(36102))},67880,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/admin/invoices/AdminInvoicesClient.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/admin/invoices/AdminInvoicesClient.tsx <module evaluation>","default")},21794,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/admin/invoices/AdminInvoicesClient.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/admin/invoices/AdminInvoicesClient.tsx","default")},34450,a=>{"use strict";a.i(67880);var b=a.i(21794);a.n(b)},72154,a=>{"use strict";var b=a.i(7997),c=a.i(22176),d=a.i(34450);async function e(){let a=await (0,c.createClient)(),{data:e}=await a.from("projects").select(`
            id,
            name,
            clients ( company_name )
        `).neq("status","completed"),{data:f}=await a.from("invoices").select(`
            *,
            projects ( name, clients ( company_name ) )
        `).order("created_at",{ascending:!1});return(0,b.jsx)(d.default,{initialInvoices:f||[],projects:e||[]})}a.s(["default",()=>e])}];

//# sourceMappingURL=_754b9d7c._.js.map