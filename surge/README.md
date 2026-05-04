# Surge

这个目录用于存放 Surge 相关配置：

- 主配置：`*.conf`
- 模块：`*.sgmodule`
- Surge 专用脚本或重写片段

如果某项内容只适用于 Surge，通常会直接放在这个目录下维护。

## 目录说明

- `surge-main.conf`：公开同步的主配置模板
- `rules/`：按站点或功能拆开的规则文件

## 当前主配置里额外整理的场景

- `广告拦截`：单独控制广告规则，默认走 `REJECT`，临时需要放行时切到 `DIRECT` 即可
- `WebRTC 防泄露`：控制 `webrtc-stun-block.list`，默认走 `REJECT`，用于拦截常见 STUN/TURN UDP 端口
