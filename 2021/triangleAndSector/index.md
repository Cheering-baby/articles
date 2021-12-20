# CSS实现一个三角形和扇形(2021/12/01)

首先我们要知道通过设置width, height为0，给各个不同的边设置高度50px，为了显示效果更明显，设置每条边不同的颜色

```css
.sector {
    width: 0;
    height: 0;
    border-left: 50px solid #000;
    border-right: 50px solid rgb(82, 47, 47);
    border-top: 50px solid rgb(64, 145, 81);
    border-bottom: 50px solid rgb(119, 37, 108);
}
```

![Untitled](img/Untitled.png)

可以看到是四个三角形组成的正方体，所以为什么会产生这样的情况呢，我们可以按照平常的样式来推理出来

```css
.normal {
      width: 300px;
      height: 300px;
      border-left: 50px solid #000;
      border-right: 50px solid rgb(82, 47, 47);
      border-top: 50px solid rgb(64, 145, 81);
      border-bottom: 50px solid rgb(119, 37, 108);
}
```

![Untitled](img/Untitled%201.png)

可以看到实际上每一个边框是第一个梯形，当width和height不断趋于0的时候，就变成了三角形

通过这个特定，我们可以实现三角形，扇形这些特殊的形状

## 实现一个三角形

首先我们先把左边的宽度设置为0

```css
.sector {
      width: 0;
      height: 0;
      /* border-left: 30px solid #000; */
      border-right: 50px solid rgb(82, 47, 47);
      border-top: 50px solid rgb(64, 145, 81);
      border-bottom: 50px solid rgb(119, 37, 108);
}
```

![Untitled](img/Untitled%202.png)

然后我们把上下边框的颜色设置为`transparent`(透明)，就可以实现一个朝左的三角形

```css
.sector {
      width: 0;
      height: 0;
      /* border-left: 30px solid #000; */
      border-right: 50px solid rgb(82, 47, 47);
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
}
```

![Untitled](img/Untitled%203.png)

通过调整不同的边框我们就可以得到不同方向的三角形

![Untitled](img/Untitled%204.png)

![Untitled](img/Untitled%205.png)

![Untitled](img/Untitled%206.png)

这下肯定又想着，如何控制三条边的长度呢,就按照下面这个图形来改变

![Untitled](img/Untitled%202.png)

我们把`border-right`调整到`100px`看看

![Untitled](img/Untitled%207.png)

可以看到棕色的三角形的高变了，因为实际上边框的长度就是三个三角形的交点到对应边框的高，再把`border-bottom`调整到`100px`看看

![Untitled](img/Untitled%208.png)

可以看到棕色三角形的两条边变了，根据上面的调整，我们可以通过调整三条边框不同的长度，展示出不同的三角形效果

## 实现一个扇形

我们可以联想到平常的div可以通过border-radiu实现椭圆和圆形，那我们尝试下价格border-radius

```css
.sector {
      width: 0;
      height: 0;
      /* border-left: 50px solid #000; */
      border-right: 50px solid rgb(82, 47, 47);
      border-top: 50px solid rgb(64, 145, 81);
      border-bottom: 50px solid rgb(119, 37, 108);
      border-radius: 50%;
}
```

![Untitled](img/Untitled%209.png)

可以看到已经由扇形可以出现，只要把上下边框改为`transparent`就可以实现一个扇形了

![Untitled](img/Untitled%2010.png)

通过上面实现三角形改变半径只要改变对应边的宽度就行了