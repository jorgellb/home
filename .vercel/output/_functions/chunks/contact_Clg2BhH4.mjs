import 'resend';

const prerender = false;
const HONEYPOT_FIELD = "bot-field";
const POST = async ({ request, redirect }) => {
  let data;
  try {
    data = await request.formData();
  } catch {
    return new Response("Datos del formulario inválidos", { status: 400 });
  }
  if (data.get(HONEYPOT_FIELD)) {
    return redirect("/success/", 303);
  }
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  String(data.get("phone") || "").trim();
  String(data.get("company") || "").trim();
  String(data.get("service") || "").trim();
  String(data.get("budget") || "").trim();
  String(data.get("timing") || "").trim();
  const message = String(data.get("message") || "").trim();
  if (!name || !email || !message) {
    return new Response("Faltan campos obligatorios", { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response("Email no válido", { status: 400 });
  }
  {
    console.error("[contact] RESEND_API_KEY no configurada — el envío se ha omitido");
    return redirect("/success/", 303);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
