---
layout: post
title: "给Octopress添加新浪微博侧边栏"
date: 2012-08-18 15:35
comments: true
categories: 
---

### Step 1 - 获取微博秀代码

进入新浪微博的帐号设置里选择微博小工具中的微博秀，设置完成后赋值下面的嵌入代码

代码大致如下：

{% gist 3385130 %}

只需要记住这部分代码中的uid和verifier即可
<!--more-->
### Step 2 - 创建侧边栏网页

随便新建一个html文件，将下面的html代码拷进去，然后保存

{% gist 3385105 %}

保存的路径为source/_include/asides/

侧边栏的宽度是自适应的，高度为550px，这些可以直接修改上面的参数

### Step 3 - 修改‘_config.yml’文件

修改示例如下：

{% gist 3385132 %}

weibo_uid和weibo_verifier都是第一步获取的

接下来就编译你的Octopress看看效果吧