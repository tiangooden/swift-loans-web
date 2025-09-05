export function processValidationErrors(errors: { message: string; path: string[] }[]): Map<string, string> {
  const messageMap = new Map<string, string>();
  for (const e of errors) {
    const key = e.path.join(':');
    messageMap.set(key, e.message);
  }
  return messageMap;
}