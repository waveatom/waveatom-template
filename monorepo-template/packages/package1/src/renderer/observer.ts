import { BindData, Node } from "@waveatoms/waveatom-meta";
import BaseRenderer from "./base";
import { effect } from '@waveatoms/waveatom-store';

export class ObserverRenderer extends BaseRenderer {
  
  constructor(page: Array<Node>) {
    super(page);
  }

  public codegen(node: Node, callbacks?: any[]): Node {
    super.codegen(node, [this.setDynamicDataForComponent.bind(this)])

    return node
  }

  public setDynamicDataForComponent(node: Node) {
    const bindData = node.getBindData()
    if(!bindData) {
      return
    }
    bindData.forEach((_data: BindData) => {
      const _key = _data.key.replace(/(\[fn\]\.)|(\[data\]\.)/g, '')
      const _path = `window.globalIns.${_key}`
      
      let effectFn: (value: unknown) => void;
      if(_data.to.indexOf('[fn]') > -1) {
        effectFn = node.bridge.getFnStore(_data.to)!; 

        if(!effectFn) {
          return
        }
      }

      effect(() => {
        try {
          
          const _value = eval(_path);
          effectFn(_value)
        }catch(e) {
          console.log(e)
        }
      });
      
    })
  }
}

