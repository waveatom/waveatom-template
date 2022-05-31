import { Node } from "@waveatoms/waveatom-meta";
import BaseRenderer from "./base";

export class StaticRenderer extends BaseRenderer {
  constructor(page: Array<Node>) {
    super(page);
  }
}

