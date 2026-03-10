export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const res = await fetch(`https://fantasy.premierleague.com/api/entry/${id}/transfers/`, {
      next: { revalidate: 60 },
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
    return Response.json({ error: "Failed to fetch transfers data" }, { status: 500 });
  }
}
