export async function handler(event, context) {
  const url = event.queryStringParameters.url;
  const key = "54f7305219284c56975ee130dadf0235";

  const api = `https://api.linkpreview.net/?key=${key}&q=${encodeURIComponent(url)}`;

  try {
    const res = await fetch(api);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Preview failed" })
    };
  }
}
