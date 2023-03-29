export default function mustache(string, data = {}) {
  return Object.entries(data).reduce((res, [key, value]) => {
    // lookbehind expression, only replaces if mustache was not preceded by a backslash
    const mainRe = new RegExp(`(?<!\\\\){{\\s*${key}\\s*}}`, "g");
    // this regex is actually (?<!\\){{\s*<key>\s*}} but because of escaping it looks like that...
    const escapeRe = new RegExp(`\\\\({{\\s*${key}\\s*}})`, "g");
    // the second regex now handles the cases that were skipped in the first case.
    return res.replace(mainRe, value.toString()).replace(escapeRe, "$1");
  }, string);
}
