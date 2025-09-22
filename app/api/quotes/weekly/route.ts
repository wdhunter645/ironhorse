export async function GET() {
  const payload = {
    week: "2025-09-22",
    quotes: [
      { text: "I love to win, but I love to play the game more.", source: "Lou Gehrig" },
      { text: "When you have a lot to lose, you fight harder.", source: "Lou Gehrig" }
    ]
  };
  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" },
  });
}
