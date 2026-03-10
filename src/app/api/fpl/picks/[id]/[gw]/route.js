export async function GET(request, { params }) {
  const { id, gw } = await params;

  try {
    const res = await fetch(
      `https://fantasy.premierleague.com/api/entry/${id}/event/${gw}/picks/`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return Response.json(
        { error: `FPL API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch picks data" }, { status: 500 });
  }
}
