import OrderedTopLevelNodeBase from "./OrderedTopLevelNodeBase";
class ScenesNode extends OrderedTopLevelNodeBase {
  protected groupPrefix: string = "scene";

  constructor() {
    super();
  }

  public get loadPriorty(): number {
    return 5000;
  }
}

export default ScenesNode;
