export function createMessageMap(errors: { message: string; path: string[] }[]): Map<string, string> {
  const messageMap = new Map<string, string>();
  errors.forEach(e => {
    const key = e.path.join(':');
    messageMap.set(key, e.message);
  });
  return messageMap;
}