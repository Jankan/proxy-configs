#!/bin/zsh

set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "用法: $0 <app> <source_file> <repo_target>"
  echo "示例: $0 loon '/Users/name/path/Loon2602.lcf' apps/loon/Loon2602.lcf"
  exit 1
fi

app_name="$1"
source_file="$2"
repo_target="$3"

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
target_path="${repo_root}/${repo_target}"

if [[ ! -f "${source_file}" ]]; then
  echo "源文件不存在: ${source_file}"
  exit 1
fi

case "${app_name}" in
  loon|surge)
    ;;
  *)
    echo "暂不支持的 app: ${app_name}"
    echo "当前支持: loon, surge"
    exit 1
    ;;
esac

mkdir -p "$(dirname "${target_path}")"
cp "${source_file}" "${target_path}"

echo "已同步 ${app_name} 配置:"
echo "  源文件: ${source_file}"
echo "  目标: ${target_path}"
