import { Node } from "unist";
import { Element, Literal, Root } from "hast";
import { visit } from "unist-util-visit";
import { slugify } from "@/lib/utils";

const isElement = (node: Node): node is Element => {
  return (node as Element).type === "element";
};

const isLiteral = (node: Node): node is Literal => {
  return (node as Literal).value !== undefined;
};

/** Mutate rehype AST to modify tags produced from markdown by rehype */
function mutateAST(tree: Root) {
  visit(tree, "element", (node: Node) => {
    // Adding IDs to h2 headings
    if (isElement(node) && node.tagName === "h2") {
      const firstChild = node.children[0];
      const text = isLiteral(firstChild) ? firstChild.value : "";
      if (text) {
        node.properties = { ...node.properties, id: slugify(text) };
      }
    }
  });
  return tree;
}

/** Custom plugin to integrate mutateAST into the unified pipeline */
export function rehypeMutateAST() {
  return (tree: Root) => {
    mutateAST(tree);
  };
}
