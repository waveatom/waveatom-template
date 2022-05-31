import { Node, Page } from '@waveatoms/waveatom-meta';
import { StaticRenderer } from '../renderer/static';
import { ObserverRenderer } from '../renderer/observer';
import { Log } from '@waveatoms/waveatom-utils';

const log = new Log('Parser')

export class Parser {
  // 页面数据
  public page?: Page
  // 渲染节点
  public nodes: Array<Node> = []
  // 上一次的解析结果
  public alternate: { [key: string]: any } = {};
  // 渲染器
  private renderer?: StaticRenderer
  // 渲染函数
  private renderFn?: ( nodes: Array<Node> ) => any

  init(initParam: { renderFn: ( nodes: Array<Node> ) => any, page?: Page }) {
    if(!initParam.renderFn) {
      log.error('请传入渲染函数, 用于将处理好的数据还原成dom');
      return;
    }

    this.renderFn = initParam.renderFn;

    this.page = initParam.page || this.page;

    this.renderer = this.setRenderer(false);
  }

  setRenderer(isStatic: boolean) {
   const renderer = isStatic ? new StaticRenderer(this.nodes) : new ObserverRenderer(this.nodes);

   renderer.setRenderFn(this.renderFn!);

    return renderer
  }

  // 节点渲染
  render(nodes?: Array<Node>) { 
    if(!nodes && this.page!.getNodes().length === 0) {
      return null;
    }
    
    if(!this.page) {
      log.error('请调用parser的init函数完成解析引擎的初始化工作');
      return null;
    }

   this.renderer!.setAlternate(this.alternate)

    const renderNode = nodes || this.page.getNodes()

    const result = this.renderer!.render(renderNode)
    
    setTimeout(() => {
      traverAst(renderNode[0], [this.renderer!.codegen.bind(this.renderer!)])
    }, 0)
    
    return result
  }

  // 页面刷新
  reflesh() {}
}


export function traverAst(node?: Node, callbacks?: Array<(...args: any[]) => Node>) {
  const queue: Array<Node> = [];
  let _node = node

  while(_node != undefined) {
    let nodeInfo = _node!.data.toJSON()

    callbacks && callbacks.forEach(fn => {
      _node = fn(_node)
      return _node
    }) 

    if(nodeInfo.children && nodeInfo.children.length !== 0) {
      for (let child of nodeInfo.children) {
        queue.push(child)
      }
    }

    _node = queue.shift()

  }
} 