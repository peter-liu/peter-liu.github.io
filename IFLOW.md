# IFlow 仓库配置

## 仓库概述

这是 Peter Liu 的 GitHub Pages 主仓库，用于汇总和管理多个子项目的展示。

**重要说明**：本仓库是 GitHub Pages 的主仓库，顶层目录仅用于汇总和部署。各个子目录（如 tours、projects 等）都有自己独立的 IFlow.md 描述文件，定义其各自的技术栈、开发规范和注意事项。**请不要干预或修改子目录中的 IFlow.md 配置**。

## 技术栈

- **静态站点**: GitHub Pages
- **版本控制**: Git
- **部署平台**: GitHub (git@github.com:peter-liu/peter-liu.github.io.git)

## 项目结构

```
peter-liu.github.io/
├── IFlow.md              # 主仓库配置文件（本文件）
├── README.md             # 项目说明文档
├── index.html            # 主页入口
├── tours/                # 旅游相关资料（子项目，有自己的 IFlow.md）
└── ...                   # 其他子项目目录
```

## 开发规范

### 1. 子项目管理

- 每个子项目目录（如 `tours/`）都应该有自己的 `IFLOW.md` 文件
- 子项目的 `IFLOW.md` 应定义：
  - 该子项目的技术栈
  - 开发规范和注意事项
  - 构建和部署流程（如需要）
- **主仓库的 IFlow.md 不应覆盖或干预子项目的配置**

### 2. 文件组织

- 保持顶层目录简洁，主要用于汇总
- 子项目应该在各自的目录中独立管理
- 避免在顶层目录放置子项目相关的文件

### 3. Git 工作流

- 当前分支: `main`
- 远程仓库: `git@github.com:peter-liu/peter-liu.github.io.git`
- 提交前请确保：
  - 所有更改已通过测试
  - 符合项目的代码规范
  - 提交信息清晰简洁

## 部署说明

本仓库通过 GitHub Pages 自动部署，修改后推送到 `main` 分支即可自动更新站点。

## 注意事项

- ⚠️ **严禁修改子目录中的 IFlow.md 文件**：每个子项目都有自己独立的技术配置
- ⚠️ **保持主仓库配置的简洁性**：主仓库的 IFlow.md 仅定义汇总级别的信息
- ✅ **尊重子项目的独立性**：不同子项目可能使用不同的技术栈和开发规范
- ✅ **专注于汇总和部署**：主仓库主要负责任务的协调和最终的 GitHub Pages 部署

## 联系信息

- 仓库所有者: Peter Liu
- GitHub: @peter-liu