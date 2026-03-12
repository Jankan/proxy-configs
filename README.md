# Proxy Configs

统一维护多款代理 App 的配置仓库，当前先覆盖：

- `Loon`
- `Surge`

后续如果要扩展到 `Shadowrocket`、`Stash`、`Quantumult X`，直接在 `apps/` 下继续加目录即可。

## 目录结构

- `apps/loon/`：Loon 主配置、插件、片段
- `apps/surge/`：Surge 主配置、模块、片段
- `shared/rules/`：多 App 共用的规则集
- `shared/rewrite/`：多 App 共用的重写片段
- `shared/plugins/`：自维护插件或模块
- `scripts/`：本地同步、发布辅助脚本
- `docs/`：使用说明和约定

## 推荐维护方式

1. 把各 App 当前正在使用的主配置，按 App 分别放到 `apps/` 下
2. 通用的规则、重写、插件，尽量沉淀到 `shared/`
3. 对外给 App 订阅时，尽量引用仓库中的原始文件地址，而不是直接改本地 iCloud 文件

## GitHub 同步建议

当前仓库已在本地初始化 Git。下一步只需要：

```bash
cd /Users/jankan/proxy-configs
git add .
git commit -m "初始化多 App 代理配置仓库"
git branch -M main
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

如果你还没在 GitHub 上先建空仓库，可以先在网页上创建，再把远端地址填进来。

## 本地同步脚本

可用 `scripts/sync-from-local.sh` 把你本机已有配置复制进仓库，例如：

```bash
scripts/sync-from-local.sh loon "/path/to/Loon2602.lcf" apps/loon/Loon2602.lcf
scripts/sync-from-local.sh surge "/path/to/surge.conf" apps/surge/main.conf
```

脚本会自动创建目标目录，并保留源文件扩展名。
