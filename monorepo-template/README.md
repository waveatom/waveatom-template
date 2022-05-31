# wavetom

## 1. 如何启动
```shell
  # 安装依赖
  npm run init
  lerna bootstrap

  # 启动客户端
  npm run start

  # 启动服务端
  npm run dev
```

# wavetom进展
总体进度 49.78%

### 1. 支持开放式组件库, 支持多框架的组件

可以结合脚手架， 几乎零成本的将一个现有项目的组件发布到物料仓库， 结合平台使用

支持react和vue等多种框架的组件。

现有项目基于react, 那么演示一下vue组件的发布

使用流程：

```powershell
#安装脚手架
sudo npm install @waveatoms/waveatom-cli -g
# 初始化组件的配置文件
waveatom component init --source ./Helloworld.vue
# 发布组件到平台
waveatom component publish --yml ./helloworld.yml
```

### 2. 支持多种布局方式(进度50%)

支持flex布局， 百分比布局， 纵列布局， 横向布局等。

可以同时开发pc端和移动端的项目

### 3. 低码系统升级

1. 支持在线编程
2. 支持模块化开发和ts开发。
3. 在线编译，即时生效
4. 支持多人协作

### 4. 交互系统升级

1. 多个模型之间互相解耦
2. 组件只关心内部逻辑， 不会耦合业务逻辑， 所有业务逻辑和交互都通过平台绑定了page模型上。
   做到了通用化
3. 更规范的模型设计。 页面模型， node模型。 所有的逻辑都绑定在页面模型上通过数据来描述

### 5. serverless

接口转发和数据注入的能力

动态注入服务路由， 数据处理和转发。 然后完成注入这一件事



## 备注，个人使用（不用关心）
```shell
  lerna add @monaco-editor/react packages/waveatom-ui
  lerna add eletron packages/waveatom-ui

```


 lerna publish --no-private