---
layout: post
title: "Octopress个人博客搭建笔记"
date: 2012-08-19 09:35
comments: true
categories: 
---
正如官网上所说的那样——“A blogging framework for hackers”，Octopress绝对是折腾控、装逼控搭建博客最<strike>不</strike>二的选择。  
Octopress的可定制性非常高，所有的显示效果都可以自己设定，也有很多主题可以下载。默认主题非常简洁，这是我选择的原因之一。

###step 1 - 准备工作

* 首先注册一个[GitHub](http://www.github.com)帐号。将要搭建的博客内容都是托管在GitHub上的。假设你注册了名为`username`的ID；  
* 然后本地配置Github。在Windows下最简单的方式就是安装一个“GitHub for Windows”，这是最不折腾的方式。这里有一个[GitHub入门](http://rogerdudler.github.com/git-guide/index.zh.html)；  
* 接下来安装[Ruby](http://rubyinstaller.org/)。注意下载的版本是1.92；  
* 安装[DevKit](http://115.156.191.66/download/372297/384990/4/exe/136/168/1344846989448_680/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)。注意解压安装的路径不能有空格。
* 添加UTF-8相关的环境变量。在环境变量中添加`LANG`和`LC_ALL`两个变量，参数都设置为`zh_cn.UTF-8`，**注意大小写**。
<!-- more -->
###step 2 - 生成博客模版

现在GitHub上创建一个项目(Repository)，命名为`username.github.com`  
* 打开Shell，用下面命令把GitHub上的Octopress项目克隆到本地
```
git clone git://github.com/imathis/octopress.git username.github.com
```

此时你的计算机上应该有一个名为`username.github.com`的文件夹，接下来要修改这个文件夹里面的内容  
* 把`.rvmrc`里面的文件内容修改为：
```
rvm use 1.9.2
```

* 修改`Gemfile`里的Source地址如下：
```
source "http://ruby.taobao.org"
```
原来的链接据说因为[GFW](http://zh.wikipedia.org/wiki/GFW)的原因不能用了，你懂的  

* 然后运行如下命令，安装相应的Gem：
```
bundle update
```

* 接下来生成博客模版：
```
rake install
```

这一步的搭建工作完成

###step 3 - 分发到GitHub上

运行下面命令
```
rake setup_github_pages
```
接下来会提示你输入Repository URL，URL格式如：`git@github.com:username/username.github.com.git`，具体内容因你的username和GitHub上的Repository名字而定，GitHub上能找到地址。

###step 4 - 配置你的个人博客
打开默认目录下面的`_config.yml`文件，文件有很详细的注释。修改里面的内容，把数据改成你自己的，下面就是我自己的部分配置
{% gist 3391394 %}
必须要强调的是，每个项目如果有值，**冒号后面必须先跟一个空格**，据说这是`YAML`的语法规定。  
更多个性化的配置可以参考[这里](http://zonyitoo.github.com/blog/2012/04/14/octopresszhu-ti-ji.markdown/)、[这里](http://chen.yanping.me/cn/blog/2012/01/07/theming-and-customization/)以及[这里](http://octopress.org/docs/)~

###step 5 - 写你的第一篇博客

* 创建文章的命令：
```
rake new_post['my-first-article']
```

然后进入`source/_posts`目录下，你会发先多了一个`.markdown`文件。随便用一个文本编辑器打开它，写下你的第一篇博客。  
这个.markdown文件要遵循Markdown的语法，如果出现语法错误的话，很可能导致你的博客不能成功生成。  
* 保存后用下面的命令编译你的博客：
```
rake generate
```

* 接下来预览：
```
rake preview
```
此时在你的浏览器里面输入`localhost:4000`即可查看你的博客。  
在预览状态下你可一对.markdown文件进行实时修改，修改完毕保存后直接刷新网页就能看到新的效果。`_config.yml`的某些修改也是可以直接刷新呈现的。  
预览效果满意的话接下来就可以同步到GitHub上：
```
rake deploy
```

如果没出什么问题的话就可以访问`username.github.com`访问你的博客了~

###step 6 - 备份你的博客数据

`source/_post`里面保存了你所有的博客内容，这是你最重要的数据。现在要新建一个Repository分支备份保存你的文章，具体操作如下：
```
cd source/_post/
git init
git add *
git commit -m '1st commit'
git remote add origin git@github.com:username/username.github.com.git
```

接下来创建并切换到名为`backup`的分支：
```
git checkout -b backup
```

然后运行下面命令把文章备份到GitHub上
```
git add *
git commit -m 'my backup'
git push origin backup
```

###结束
没用过Wordpress，没有比较的资格，不过Octopress确实很好用:-)

###本文参考
1. [Windows 8安装Octopress记录](http://hivan.me/octopress-install-to-windows8/);
2. [Ruby开源项目介绍(1)：octopress——像黑客一样写博客](http://www.yangzhiping.com/tech/octopress.html);
3. [Blog = GitHub + Octopress](http://mrzhang.me/blog/blog-equals-github-plus-octopress.html).

###如果因为你的文章里面插入了代码而无法生成博客，请参考
1. [在Octopress中使用代码高亮](http://netwjx.github.com/blog/2012/04/21/using-code-in-octopress/);
2. [修复octopress中代码无法高亮](http://linyi.herokuapp.com/blog/fix-syntax-highlighting.html);

