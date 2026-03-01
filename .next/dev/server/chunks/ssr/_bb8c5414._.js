module.exports = [
"[project]/src/utils/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://vmnamtzupzbdhdtfhqru.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_fsAx7qVXOXkICRHhq84ZnQ_jJAQaekc"), {
        cookies: {
            get (name) {
                return cookieStore.get(name)?.value;
            },
            set (name, value, options) {
                try {
                    cookieStore.set({
                        name,
                        value,
                        ...options
                    });
                } catch (error) {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            },
            remove (name, options) {
                try {
                    cookieStore.set({
                        name,
                        value: '',
                        ...options
                    });
                } catch (error) {
                // The `remove` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/src/app/actions/leads.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"601a2cc7d9f61798343f36276c7aeac1a0f93a8e52":"createLead"},"",""] */ __turbopack_context__.s([
    "createLead",
    ()=>createLead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
// 1. Define Validation Schema (Zod)
const leadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Name must be at least 2 characters"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email address"),
    service_interest: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'Web Development',
        'AI Automation',
        'Brand Identity',
        'Other'
    ]),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10, "Message must be at least 10 characters")
});
async function createLead(prevState, formData) {
    // 2. Extract Data from FormData
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        service_interest: formData.get('service_interest'),
        message: formData.get('message')
    };
    // 3. Validate Data
    const validatedFields = leadSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return {
            success: false,
            message: validatedFields.error.flatten().fieldErrors.name?.[0] || validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.message?.[0] || "Invalid form data"
        };
    }
    const { name, email, service_interest, message } = validatedFields.data;
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        // 4. Insert into Supabase 'leads' table
        const { error } = await supabase.from('leads').insert([
            {
                name,
                email,
                service_interest,
                message,
                status: 'new' // Initial status as defined in schema
            }
        ]);
        if (error) {
            console.error('Supabase error:', error);
            return {
                success: false,
                message: "Failed to submit request. Please try again."
            };
        }
        // 5. Trigger Claude Flow Lead Notification Swarm (simulated via shell)
        try {
            const { exec } = await __turbopack_context__.A("[externals]/child_process [external] (child_process, cjs, async loader)");
            const message = `[LEAD_ALERT] New prospect: ${name} (${email}) interested in ${service_interest}`;
            exec(`npx @claude-flow/cli@v3alpha hive-mind notify --message "${message}" --priority high`);
        } catch (swarmErr) {
            console.error('Swarm notification failed:', swarmErr);
        }
        // 6. Real Email Notification via Resend
        try {
            const { Resend } = await __turbopack_context__.A("[project]/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript, async loader)");
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: 'Websuem | New Lead <onboarding@resend.dev>',
                to: 'hello@websuem.com',
                subject: `🚀 New Lead: ${name} (${service_interest})`,
                html: `
          <div style="font-family: sans-serif; padding: 20px; background: #0A0A0A; color: #fff; border-radius: 12px;">
            <h2 style="color: #2563EB;">New Websuem Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Interest:</strong> ${service_interest}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #111; padding: 15px; border-radius: 8px; border: 1px solid #333;">
              ${message}
            </div>
            <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">View this lead in the CRM: <a href="http://websuem.com/admin" style="color: #2563EB;">websuem.com/admin</a></p>
          </div>
        `
            });
        } catch (emailErr) {
            console.error('Email notification failed:', emailErr);
        }
        // 7. Success
        return {
            success: true,
            message: "Your message has been received! We'll be in touch shortly."
        };
    } catch (err) {
        console.error('Submission error:', err);
        return {
            success: false,
            message: "An unexpected error occurred."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createLead
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createLead, "601a2cc7d9f61798343f36276c7aeac1a0f93a8e52", null);
}),
"[project]/.next-internal/server/app/contact/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/leads.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$leads$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/leads.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/contact/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/leads.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "601a2cc7d9f61798343f36276c7aeac1a0f93a8e52",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$leads$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLead"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$contact$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$leads$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/contact/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/leads.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$leads$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/leads.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_bb8c5414._.js.map