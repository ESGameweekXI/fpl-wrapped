import fetchWrappedData from "@/data/fetchWrappedData";

export async function GET(request, { params }) {
  const { teamId } = await params;

  try {
    const data = await fetchWrappedData(teamId);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
