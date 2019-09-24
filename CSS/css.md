### 超出部分隐藏
```css
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 6px;
```

### 超出部分隐藏(两行)
```css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
```
### 英文自动换行
```css
  word-wrap:break-word
```
### pre标签自动换行
```css
  white-space: pre-wrap;
  word-wrap: break-word;
```
### 首行空两格
```css
  text-indent: 2em;
```
### 内容垂直居中&水平居中
```html
  <div id="par">
    <div id="child"></div>
  </div>
```
```css
  #par {
    min-height: calc(100vh - 181px); // 高度自行修改
    display: flex;
    text-align: center;
    align-items: center;
  }
  #par #child {
    margin: 0 auto;
  }
```

### css禁用鼠标事件
```css
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }
```

### 渐变实现linear-gradient
```css
  .stripe-bg{
    padding: .5em;
    line-height: 1.5em;
    background: beige;
    background-size: auto 3em;
    background-origin: content-box;
    background-image: linear-gradient(rgba(0,0,0,.2) 50%, transparent 0);
  }
```

### css禁止用户选择
```css
  body{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
```

