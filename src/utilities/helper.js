export function pascalToLabel(str) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

export function pascalToUrl(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}