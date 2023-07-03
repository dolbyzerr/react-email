export function stripDataAttributes(domString: string) {
  const regex = /<([a-z][a-z0-9]*)\s([^>]*?)(\/?)>/gi;

  let result = domString.replace(regex, (_, tagName, attributes, closed) => {
    const attrs = attributes
      .split(" ")
      .filter((attribute: string) => !attribute.startsWith("data-"))
      .join(" ");
    return `<${tagName}${attrs ? " " + attrs : ""}${closed}>`;
  });

  return result;
}
