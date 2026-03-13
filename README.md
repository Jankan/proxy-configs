> [!NOTE]
> 这是我日常自用的代理配置仓库，主要整理 `Loon`、`Surge` 等 App 的公开模板、规则文件和插件，方便自己长期维护，也方便按需公开同步和分享。

## 当前已整理的客户端

当前已整理：

- `Loon`
- `Surge`

## 快速开始

> [!TIP]
> 如果你只是想快速上手，优先看 `apps/loon/loon-main.lcf` 和 `apps/surge/surge-main.conf` 这两份主配置模板。

如果你只是想直接参考现成模板，可以从这里进：

| 客户端 | 入口文件 | 说明 |
| --- | --- | --- |
| Loon | `apps/loon/loon-main.lcf` | 公开同步的主配置模板 |
| Surge | `apps/surge/surge-main.conf` | 公开同步的主配置模板 |

如果你只是想引用单独规则或插件，可以从这里进：

| 类型 | 文件 | 用途 |
| --- | --- | --- |
| Loon 规则 | `apps/loon/rules/tradingview.list` | `TradingView` 独立规则集 |
| Surge 规则 | `apps/surge/rules/tradingview.list` | `TradingView` 独立规则集 |

## 仓库结构

```text
proxy-configs/
├── README.md
├── assets/
│   └── icons/                # 图标资源目录
├── apps/
│   ├── loon/                 # Loon 相关配置
│   │   ├── loon-main.lcf     # Loon 主配置模板
│   │   ├── plugins/          # Loon 插件目录
│   │   └── rules/            # Loon 规则文件目录
│   └── surge/                # Surge 相关配置
│       ├── surge-main.conf   # Surge 主配置模板
│       └── rules/            # Surge 规则文件目录
```

## 已整理内容

### Loon

- 主配置模板：`apps/loon/loon-main.lcf`
- `TradingView` 独立规则：`apps/loon/rules/tradingview.list`

### Surge

- 主配置模板：`apps/surge/surge-main.conf`
- `TradingView` 独立规则：`apps/surge/rules/tradingview.list`

## 使用说明

### Loon

- 复制 `apps/loon/loon-main.lcf`
- 把占位订阅替换成你自己的真实订阅
- 按需引用仓库内的插件和规则

### Surge

- 复制 `apps/surge/surge-main.conf`
- 替换订阅入口和 `http-api` 密码
- 按需保留或扩展现有规则集

## 说明

> [!IMPORTANT]
> 配置文件里的规则、策略组和插件引用会随着上游项目更新而变化；使用前请结合自己的网络环境和客户端版本自行检查。

- `Surge macOS` 对策略组图标显示并不稳定，所以配置模板里默认不依赖这项功能
- 如果某项规则只对单一客户端有效，默认直接放在对应客户端目录下维护

## 感谢

这个仓库只是我对日常自用配置的整理和归档，很多规则、图标、插件和分流思路都参考或直接引用了其他作者和项目的公开成果，在这里一并致谢：

- [`blackmatrix7/ios_rule_script`](https://github.com/blackmatrix7/ios_rule_script)
- [`fmz200/wool_scripts`](https://github.com/fmz200/wool_scripts)
- [`kelee 插件中心`](https://hub.kelee.one)
- [`Koolson/Qure`](https://github.com/Koolson/Qure)
- [`luestr/ShuntRules`](https://github.com/luestr/ShuntRules)
- [`Orz-3/mini`](https://github.com/Orz-3/mini)

如果某份配置、规则或图标来源于其他作者，我也会尽量在对应文件中保留原始引用地址。

## 更多说明

- `apps/loon/README.md`
- `apps/surge/README.md`
