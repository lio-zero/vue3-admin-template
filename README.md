<div align="center">
  <a href="https://github.com/lio-zero/vue3-admin-template"> <img alt="Admin Logo" width="200" height="200" src="http://img.test.liozhou.xyz/asset/pitao.png"> </a> <br /> <br />

  <p>
    <a href="https://github.com/lio-zero/vue3-admin-template/blob/master/LICENSE" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/github/license/lio-zero/vue3-admin-template" />
    </a>
  </p>
  <h1 align="center">Vue3 Admin Template 👋</h1>
</div>

## 简介

参考 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)，使用了最新的 Vue3 + Vite2 + Element-plus 等主流技术搭建的简易版后台模板。

## 特性

- 最新技术栈：使用 Vue3/vite2 等前端前沿技术开发
- TypeScript: 应用程序级 JavaScript 的语言
- Mock 数据 内置 Mock 数据方案

## 目录结构

以下是系统的目录结构

```txt
├── mock                 // mock 数据
├── .husky               // 提交配置
├── .vscode              // VS Code 配置文件
├── build
│   ├── vite             // vite 配置
|   └── constant         // 系统常量
├── src
│    ├── api             // api 请求
│    ├── assets          // 静态文件
│    ├── components      // 业务通用组件
│    ├── directives      // 指令
│    ├── hooks           // hooks
│    ├── layout          // 整体布局
│    ├── router          // 路由文件
│    ├── store           // 状态管理
│    ├── styles          // 样式
│    ├── utils           // 工具类
│    ├── App.vue         // vue 模板入口
│    ├── main.ts         // 主文件
│    ├── views           // 业务页面
├── types                // 类型定义
├── windicss.config.ts   // windicss 全局配置
├── tsconfig.json        // ts 配置
└── vite.config.ts       // vite 全局配置
```

## 准备

- [Node](http://nodejs.org/) 和 [Git](https://git-scm.com/) — 项目开发环境
- [Vite](https://vitejs.dev/) — 熟悉 Vite 特性
- [Vue3](https://v3.vuejs.org/) — 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) — 熟悉 TypeScript 基本语法
- [ES6+](http://es6.ruanyifeng.com/) — 熟悉 ES6 基本语法
- [Vue Router](https://router.vuejs.org/) — 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.org/zh-CN/) — UI 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) — mockjs 基本语法

## 安装使用

- 获取项目代码

```sh
git clone git@github.com:lio-zero/vue3-admin-template.git
```

- 安装依赖

```sh
cd vue3-admin-template

pnpm install
```

- 运行

```sh
pnpm serve
```

- 打包

```sh
pnpm build
```

## 项目地址

[vue3-admin-template](https://lio-zero.github.io/vue3-admin-template/)

## Author

👤 **lio**

- Github: [@lio-zero](https://github.com/lio-zero)

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/lio-zero/vue3-admin-template/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxx'`
4. 推送您的分支: `git push origin feat/xxx`
5. 提交`pull request`

## Git 贡献提交规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## 支持

如果这个项目对您有帮助，请给一个 Star ⭐️ 支持以下!

## 📝 License

Copyright © 2022 [lio-zero](https://github.com/lio-zero).<br /> This project is [MIT](https://github.com/lio-zero/vue3-admin-template/blob/master/LICENSE) licensed.
