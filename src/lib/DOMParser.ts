import jsdom from "jsdom";
const { JSDOM } = jsdom;

const dom = new JSDOM("");
const DOMParser = dom.window.DOMParser;
const parser = new DOMParser;

export default parser;