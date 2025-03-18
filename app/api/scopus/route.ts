import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "articles";
  const apiKey = process.env.NEXT_PUBLIC_APIKEY;

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  let searchType = "scopus";
  console.log(type, "type");
  if (type === "author") searchType = "author";
  if (type === "affiliation") searchType = "affiliation";
  let searchValue = encodeURIComponent(query);
  if (type === "author") searchValue = `au-id(${query})`;
  if (type === "affiliation") searchValue = `AFFIL(${query})`;
  console.log(type, "---", searchValue);
  const apiUrl = `https://api.elsevier.com/content/search/${searchType}?query=${searchValue}`;
  console.log(apiUrl, "api url");

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-ELS-APIKey": apiKey,
        Accept: "application/json",
      },
    });
    console.log(response);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
