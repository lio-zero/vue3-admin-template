<div align="center">
  <a href="https://github.com/lio-zero/vue3-admin-template"> <img alt="Admin Logo" width="200" height="200" src="http://img.test.liozhou.xyz/asset/pitao.png"> </a> <br /> <br />

  <p>
    <a href="https://github.com/lio-zero/vue3-admin-template/blob/master/LICENSE" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/github/license/lio-zero/vue3-admin-template" />
    </a>
  </p>
  <h1 align="center">Vue3 Admin Template ๐</h1>
</div>

## ็ฎไป

ๅ่ [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)๏ผไฝฟ็จไบๆๆฐ็ Vue3 + Vite2 + Element-plus ็ญไธปๆตๆๆฏๆญๅปบ็็ฎๆ็ๅๅฐๆจกๆฟใ

## ็นๆง

- ๆๆฐๆๆฏๆ ๏ผไฝฟ็จ Vue3/vite2 ็ญๅ็ซฏๅๆฒฟๆๆฏๅผๅ
- TypeScript: ๅบ็จ็จๅบ็บง JavaScript ็่ฏญ่จ
- Mock ๆฐๆฎ ๅ็ฝฎ Mock ๆฐๆฎๆนๆก

## ็ฎๅฝ็ปๆ

ไปฅไธๆฏ็ณป็ป็็ฎๅฝ็ปๆ

```txt
โโโ mock                 // mock ๆฐๆฎ
โโโ .husky               // ๆไบค้็ฝฎ
โโโ .vscode              // VS Code ้็ฝฎๆไปถ
โโโ build
โ   โโโ vite             // vite ้็ฝฎ
|   โโโ constant         // ็ณป็ปๅธธ้
โโโ src
โ    โโโ api             // api ่ฏทๆฑ
โ    โโโ assets          // ้ๆๆไปถ
โ    โโโ components      // ไธๅก้็จ็ปไปถ
โ    โโโ directives      // ๆไปค
โ    โโโ hooks           // hooks
โ    โโโ layout          // ๆดไฝๅธๅฑ
โ    โโโ router          // ่ทฏ็ฑๆไปถ
โ    โโโ store           // ็ถๆ็ฎก็
โ    โโโ styles          // ๆ ทๅผ
โ    โโโ utils           // ๅทฅๅท็ฑป
โ    โโโ App.vue         // vue ๆจกๆฟๅฅๅฃ
โ    โโโ main.ts         // ไธปๆไปถ
โ    โโโ views           // ไธๅก้กต้ข
โโโ types                // ็ฑปๅๅฎไน
โโโ windicss.config.ts   // windicss ๅจๅฑ้็ฝฎ
โโโ tsconfig.json        // ts ้็ฝฎ
โโโ vite.config.ts       // vite ๅจๅฑ้็ฝฎ
```

## ๅๅค

- [Node](http://nodejs.org/) ๅ [Git](https://git-scm.com/) โ ้กน็ฎๅผๅ็ฏๅข
- [Vite](https://vitejs.dev/) โ ็ๆ Vite ็นๆง
- [Vue3](https://v3.vuejs.org/) โ ็ๆ Vue ๅบ็ก่ฏญๆณ
- [TypeScript](https://www.typescriptlang.org/) โ ็ๆ TypeScript ๅบๆฌ่ฏญๆณ
- [ES6+](http://es6.ruanyifeng.com/) โ ็ๆ ES6 ๅบๆฌ่ฏญๆณ
- [Vue Router](https://router.vuejs.org/) โ ็ๆ vue-router ๅบๆฌไฝฟ็จ
- [Element-Plus](https://element-plus.org/zh-CN/) โ UI ๅบๆฌไฝฟ็จ
- [Mock.js](https://github.com/nuysoft/Mock) โ mockjs ๅบๆฌ่ฏญๆณ

## ๅฎ่ฃไฝฟ็จ

- ่ทๅ้กน็ฎไปฃ็ 

```sh
git clone git@github.com:lio-zero/vue3-admin-template.git
```

- ๅฎ่ฃไพ่ต

```sh
cd vue3-admin-template

pnpm install
```

- ่ฟ่ก

```sh
pnpm serve
```

- ๆๅ

```sh
pnpm build
```

## ้กน็ฎๅฐๅ

[vue3-admin-template](https://lio-zero.github.io/vue3-admin-template/)

## Author

๐ค **lio**

- Github: [@lio-zero](https://github.com/lio-zero)

## ๅฆไฝ่ดก็ฎ

้ๅธธๆฌข่ฟไฝ ็ๅ ๅฅ๏ผ[ๆไธไธช Issue](https://github.com/lio-zero/vue3-admin-template/issues) ๆ่ๆไบคไธไธช Pull Requestใ

**Pull Request:**

1. Fork ไปฃ็ !
2. ๅๅปบ่ชๅทฑ็ๅๆฏ: `git checkout -b feat/xxx`
3. ๆไบคไฝ ็ไฟฎๆน: `git commit -am 'feat(function): add xxx'`
4. ๆจ้ๆจ็ๅๆฏ: `git push origin feat/xxx`
5. ๆไบค`pull request`

## Git ่ดก็ฎๆไบค่ง่

ๅ่ [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) ่ง่ ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` ๅขๅ ๆฐๅ่ฝ
- `fix` ไฟฎๅค้ฎ้ข/BUG
- `style` ไปฃ็ ้ฃๆ ผ็ธๅณๆ ๅฝฑๅ่ฟ่ก็ปๆ็
- `perf` ไผๅ/ๆง่ฝๆๅ
- `refactor` ้ๆ
- `revert` ๆค้ไฟฎๆน
- `test` ๆต่ฏ็ธๅณ
- `docs` ๆๆกฃ/ๆณจ้
- `chore` ไพ่ตๆดๆฐ/่ๆๆถ้็ฝฎไฟฎๆน็ญ
- `workflow` ๅทฅไฝๆตๆน่ฟ
- `ci` ๆ็ปญ้ๆ
- `types` ็ฑปๅๅฎไนๆไปถๆดๆน
- `wip` ๅผๅไธญ

## ๆฏๆ

ๅฆๆ่ฟไธช้กน็ฎๅฏนๆจๆๅธฎๅฉ๏ผ่ฏท็ปไธไธช Star โญ๏ธ ๆฏๆไปฅไธ!

## ๐ License

Copyright ยฉ 2022 [lio-zero](https://github.com/lio-zero).<br /> This project is [MIT](https://github.com/lio-zero/vue3-admin-template/blob/master/LICENSE) licensed.
