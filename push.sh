#!/usr/bin/env sh

# 本脚本为自动部署的入口脚本，只需执行该脚本，即可实现 GitHub 的自动部署，以及 GitHub 的仓库同步到 Gitee 中，最后 Gitee 将仓库同步到到服务器

# GITHUB_REPO=git@github.com:gavin-james/gavin-james.github.io.git

# GITEE_REPO=git@gitee.com:gavin-james/gavin-james.git

comment=$1

if [[ -z $comment ]]; then
comment="更新内容 + Action 自动部署"
fi
echo 开始添加变更：git add -A
git add -A
echo;
echo 提交的commit信息:${comment}
git commit -m "${comment}"    # $1 是启动该脚本传来的参数，如 sh push.sh hello，其中 hello 就会插入到 $1 处，如果想两个参数，则加 $2
echo;
echo 将变更情况提交到远程自己分支：git push origin main
git push origin main
echo;
echo 执行完毕！
echo;
pause
# git push $GITHUB_REPO   

# git push $GITEE_REPO

# source ./deploy.sh

# 替换文件
# \[#\]\((#.*)\) 

# (https://www.pdai.tech/images/
# (https://www.pdai.tech/images/