export const handleFetchErrors = async (response: Response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let message = `HTTP ${response.status} ${response.statusText}`;

    if (contentType?.includes("application/json")) {
      const errorBody = await response.json();
      message += `: ${JSON.stringify(errorBody)}`;
    } else {
      const text = await response.text();
      message += `: ${text}`;
    }

    throw new Error(message);
  }

  return response;
};
