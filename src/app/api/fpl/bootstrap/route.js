export async function GET() {
  try {
    const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return Response.json(
        { error: `FPL API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch bootstrap data" }, { status: 500 });
  }
}
