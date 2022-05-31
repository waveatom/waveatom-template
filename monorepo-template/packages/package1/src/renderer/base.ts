import { Node } from '@waveatoms/waveatom-meta';
import { Log } from '@waveatoms/waveatom-utils';

const log = new Log('renderer')

export abstract class BaseRendererClass {
  abstract render(nodes:  Array<Node>): void
}

class BaseRenderer extends BaseRendererClass {
  public nodes: Array<Node>;

  public renderFn?: (nodes: Array<Node>) => unknown;

  // 上一次的解析结果
  public alternate: { [key: string]: any } = {};

  constructor(nodes: Array<Node>) {
    super()

    this.nodes = nodes;
  }

  setRenderFn(renderFn: (nodes: Array<Node>) => unknown) {
    this.renderFn = renderFn;
  }

  setAlternate(alternate: { [key: string]: any }) {
    this.alternate = alternate
  }

  codegen(node: Node, callbacks?: Array<any>): Node {
    // add test case
    // const name = node.getName();
    // const version = node.getVersion()
    // if(name === 'button' && version === 'v2') {
    //   node.setRuntimeData([
    //     {
    //       type: 0,
    //       key: '$data.form.name',
    //       to: '[fn].setText'
    //     }
    //   ])
    // }

    callbacks && callbacks.map(fn => fn(node))

    return node
  }

  render(nodes: Array<Node>) {
    if(!this.renderFn) {
      log.error('请调用register方法注册引擎解析函数');

      return 
    }
    
    return this.renderFn(nodes)
  }
}

export default BaseRenderer