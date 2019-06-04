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
