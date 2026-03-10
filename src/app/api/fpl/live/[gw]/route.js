export async function GET(request, { params }) {
  const { gw } = await params;

  try {
    const res = await fetch(`https://fantasy.premierleague.com/api/event/${gw}/live/`, {
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
    return Response.json({ error: "Failed to fetch live GW data" }, { status: 500 });
  }
}
