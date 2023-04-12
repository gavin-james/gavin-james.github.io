#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 百度链接推送，百度提供
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://gavin-james.gitee.io&token=aABczTfCGemX0hH5"

curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://gavin-james.github.io&token=aABczTfCGemX0hH5"

rm -rf urls.txt # 删除文件
