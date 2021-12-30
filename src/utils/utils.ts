export function generateRandomNumber(min: number, max: number) {
  let result = {
    randomNumber: Infinity,
    error: '',
  };

  if (min <= max) {
    result.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    result.error = `max should be greater or equal than min`;
  }

  return result;
}

export async function fetchData(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to load data: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}
