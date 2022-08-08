type PollingResults = {
  totalVotes: number,
  votes: {
    title: string,
    votedCount: number,
    votedPercent: number
  }[]
};

const BACK_URL = `https://light-heron-37.deno.dev`

export const submitPolling = async (variant: string): Promise<PollingResults> => {
  const data = await fetch(BACK_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: variant
  }).then((res) => res.json()) as PollingResults;



  return data;
}
