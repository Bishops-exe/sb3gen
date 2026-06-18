let _counter = 0;

export function getUniqueId(): string {
  return (_counter++).toString();
}
