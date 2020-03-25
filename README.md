<p>
<img alt="npm" src="https://img.shields.io/npm/v/soidjs?style=for-the-badge">
</p>
# SOID
a Scripted and object-oriented interface development languag

<img src="http://lc-3dc7Ciuo.cn-n1.lcfile.com/bb72e31100ab2b2c1c64/soidJS.png" width="280px"></img>
# Usage
```
npm install soidjs
```

### Soid Render Flow Chart
view 是界面的最小单位里面由生命周期方法和一个 HtmlDivElement 实体组合而成。Fragment为一个组合单位，里面由多个View 或 多个 Fragment联合构成。
Fragment 由自己的生命周期，这里借鉴了 Android Fragment 的一些设计思路来进行实现。
所有的Fragment 会在  App 这个类内组装。在编译环节一次性生成所有的 Layout 和 Paint 代码并加载都一个 DocumentFragment 后，再装载进 Document.body。

<img src="http://lc-3dc7Ciuo.cn-n1.lcfile.com/67b9bdbec9181e62ec7c/SoidLogic.jpg"></img>