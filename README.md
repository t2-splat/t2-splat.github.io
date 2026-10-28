# T²-Splat 项目网页

用于 NeurIPS 2026 实名项目展示的静态网站，无需 Node.js、数据库或构建步骤。网站代码和科研代码分别维护。

## 当前状态：私有开发

组织 `t2-splat` 已创建。按当前要求，网页和科研代码均使用私有仓库，暂不公开发布网站。

| 用途 | 名称或地址 | 状态 |
|---|---|---|
| GitHub Organization | `t2-splat` | 已创建 |
| 网页仓库 | `t2-splat/t2-splat.github.io` | 已创建，Private，Pages 未启用 |
| 预留网站地址 | `https://t2-splat.github.io/` | 已配置元信息，尚未上线 |
| 科研代码仓库 | `t2-splat/T2Splat` | 已创建，Private |

预留网址不代表网站已经发布。未经维护者明确授权，不将仓库改为 Public，也不启用 Pages。

## 私有仓库维护

1. 将本目录的内容放到网页仓库根目录，确保 `index.html`、`assets/` 和 `.nojekyll` 都在根目录；不要额外嵌套一层 `t2-splat-site/`。
2. 确认仓库可见性保持 **Private**，通过组织成员或仓库协作者权限共享源码。
3. 日常修改提交到 `main`，在本地运行下面的预览命令检查页面。

`.nojekyll` 仅是静态站点配置文件，不会自行启用托管。在 Pages 未启用的当前状态下，推送源码不会发布网站。

如果之后明确决定上线，再核对组织套餐对私有仓库 Pages 的支持及网站访问权限。源码仓库私有并不自动意味着 Pages 网站也私有。获准部署后，可按实际托管方案配置；使用分支发布时，入口为 **Settings → Pages → Deploy from a branch → main → /(root)**。正式网址应以部署结果为准。

## 科研代码链接

科研代码单独保存在私有仓库 `t2-splat/T2Splat`。网页当前不将私有仓库作为公开代码入口。

在 `assets/js/site.js` 中保留：

```js
const publicCodeUrl = '';
```

此时网页显示代码尚待公开。只有维护者之后明确授权公开科研代码，并确认仓库可以匿名访问后，才填写公开地址：

```js
const publicCodeUrl = 'https://github.com/t2-splat/T2Splat';
```

脚本会自动更新首页 Code 按钮和 Resources 区域。在当前私有开发阶段保持空字符串即可。科研代码应单独维护，保留原项目、依赖和第三方组件的许可证及归属说明；不要将训练代码、数据集或检查点复制到网页仓库。

## 日常维护

- **论文：** 当前 `assets/papers/t2-splat.pdf` 来自 `T2Splat_NeurIPS2026-8.pdf`。最终版本可直接替换为同路径文件，现有链接无需改动。
- **作者、单位与联系信息：** 修改 `index.html` 中的 authors、affiliations、Resources、footer，同时同步顶部 `citation_author` 元信息和末尾 BibTeX。
- **代码入口：** `assets/js/site.js` 中的 `publicCodeUrl` 当前保持为空；公开代码后再更新。
- **指标与文案：** 平均结果和关键指标在 `index.html`；Garden 的 100% / 50% / 10% 数据及说明在 `assets/js/site.js` 的 `budgets` 对象。更新时同时核对论文及指标口径。
- **视频：** `assets/video/overview.mp4` 为原网页视频。已转换为浏览器兼容的 H.264 / yuv420p，启用 faststart；原始 HEVC 文件保存在工作目录。原视频约 22 秒的字幕仍写 RDT，更新视频时应与 Safe RDT 的方法命名同步。
- **实验图片：** 对比图为无损 WebP；不要用生成式工具修改实验结果。论文示意图来源和转换记录见 `assets/manifest.json`，替换素材时同步更新记录。
- **分享预览：** `og:image`、`og:url`、canonical 与论文链接元信息已配置为预留地址 `https://t2-splat.github.io/`。当前站点未上线，换域名时需同步更新。

目前 FPS 和文件大小特指 Garden 的烘焙顶点颜色 PLY，在 MacBook Air M3 上通过 OpenGL 渲染。不要将其改写为完整 SH + MipTex 模型的实时性能或存储大小。

## 本地预览与维护检查

在本目录运行：

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000`。结束预览按 `Ctrl+C`。无需安装其他依赖。

手动检查：

- 桌面和手机宽度下没有横向溢出，导航与论文链接可用。
- 对比滑块支持拖动和键盘方向键，筛选按钮切换正确。
- 三个 mesh budget 按钮的面数、PSNR、LPIPS、SSIM 与论文一致。
- BibTeX 可以复制，邮箱地址正确，未公开代码时显示待发布状态。
- 视频在目标浏览器中可以播放，图像、PDF 无 404。
- GitHub 上两个仓库均保持 Private，Pages 保持未启用。将来经授权公开部署后，再在未登录状态验证正式网页及公开资源。

## 文件结构

```text
index.html                 页面内容、作者与论文链接
.nojekyll                  GitHub Pages 静态发布标记
assets/css/site.css        页面样式
assets/js/site.js          对比滑块、筛选、指标切换和代码链接
assets/comparisons/        实验对比图
assets/images/             论文图片和视频封面
assets/papers/t2-splat.pdf  论文及补充材料
assets/video/overview.mp4   项目视频
assets/manifest.json        素材来源与转换记录
```
