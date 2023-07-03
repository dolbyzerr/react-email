import * as ReactDomServer from "react-dom/server";
import { convert } from "html-to-text";
import pretty from "pretty";
import { stripDataAttributes } from "./utils/strip-data-attributes";

export interface Options {
  pretty?: boolean;
  plainText?: boolean;
  doctype?: boolean;
  includeDataAttributes?: boolean;
}
const defaultOptions: Options = {
  pretty: false,
  plainText: false,
  doctype: true,
  includeDataAttributes: true,
};
export const render = (
  component: React.ReactElement,
  options: Options = defaultOptions
) => {
  options = { ...defaultOptions, ...options };
  if (options.plainText) {
    return renderAsPlainText(component, options);
  }
  const markup = ReactDomServer.renderToStaticMarkup(component);

  let document = markup;
  if (options.includeDataAttributes === false) {
    document = stripDataAttributes(document);
  }
  if (options.doctype) {
    const doctype =
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
    document = `${doctype}${document}`;
  }

  if (options.pretty) {
    return pretty(document);
  }

  return document;
};

const renderAsPlainText = (
  component: React.ReactElement,
  _options?: Options
) => {
  return convert(ReactDomServer.renderToStaticMarkup(component), {
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "#__react-email-preview", format: "skip" },
    ],
  });
};
