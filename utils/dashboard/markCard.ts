async function _markAsWatched(type: string, traktId: number) {
  await fetch(
    "/api/trakt/watched?" +
      new URLSearchParams({ type, id: traktId.toString() })
  );
  const res = await fetch("/api/trakt/recommendations?type=" + type);
  return await res.json();
}

export async function markAsWatched(
  type: any,
  traktId: any,
  mutate: any,
  data: any
) {
  console.log("/api/trakt/recommendations?type=" + type);
  await mutate(
    "/api/trakt/recommendations?type=" + type,
    _markAsWatched(type, traktId),
    {
      optimisticData: {
        success: true,
        results: data.results.filter(
          (result: any) => result.ids.trakt !== traktId
        ),
      },
    }
  );
}

async function _markAsHidden(type: string, traktId: number) {
  const response = await fetch(
    "/api/trakt/hide?" + new URLSearchParams({ type, id: traktId.toString() })
  );
  console.log("mark as hidden response", response);
  const res = await fetch("/api/trakt/recommendations?type=" + type);
  return await res.json();
}

export async function markAsHidden(
  type: any,
  traktId: any,
  mutate: any,
  data: any
) {
  console.log("/api/trakt/recommendations?type=" + type);
  await mutate(
    "/api/trakt/recommendations?type=" + type,
    _markAsHidden(type, traktId),
    {
      optimisticData: {
        success: true,
        results: data.results.filter(
          (result: any) => result.ids.trakt !== traktId
        ),
      },
    }
  );
}
