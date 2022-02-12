export function debounceArray<T>(dothing: (data: T[]) => void, step: number) {
  let isProcess = false;
  let pendingQueue: { v: T[] } = { v: [] };
  return function (data: T) {
    pendingQueue.v.push(data);
    if (!isProcess) {
      isProcess = true;
      setTimeout(() => {
        const processData = pendingQueue.v;
        isProcess = false;
        pendingQueue.v = [];
        dothing(processData);
      }, step);
    }
  };
}

export function debounceValue<T>(dothing: (data: T) => void, step: number) {
  let isProcess = false;
  let pendingValue: { v: T | null } = { v: null };
  return function (data: T) {
    pendingValue.v = data;
    if (!isProcess) {
      isProcess = true;
      setTimeout(() => {
        const processData = pendingValue.v;
        isProcess = false;
        pendingValue.v = null;
        dothing(processData as T);
      }, step);
    }
  };
}
