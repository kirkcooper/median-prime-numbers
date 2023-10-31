const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';

export class APIError extends Error {
  readonly details: Promise<ErrorDetails | undefined>;

  constructor(resp: Response) {
    super(resp.statusText);
    this.details = new Promise((resolve) => {
      resp
        .json()
        .then((data) => {
          // Convert message to alawys be an array
          const message = Array.isArray(data.message)
            ? data.message
            : [data.message];
          resolve({ ...data, message });
        })
        .catch(() => resolve(undefined));
    });
  }
}

export type ErrorDetails = {
  message: string[];
  error: string;
  statusCode: number;
};

export type MedianPrimesResp = [number, number] | [number];

export const findMedianPrimes = async (
  upperLimit: number,
): Promise<MedianPrimesResp> => {
  const url = new URL('/api/median-prime-numbers', API_URL);
  url.searchParams.set('n', upperLimit.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new APIError(response);
  }

  const medians: MedianPrimesResp = await response.json();
  return medians;
};
