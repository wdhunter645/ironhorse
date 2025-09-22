export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const urls = ["/","/member","/charities","/milestones","/qna","/news","/calendar","/privacy","/terms"];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${base}${u}</loc></url>`).join("")}
</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml" }});
}
