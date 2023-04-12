@echo off
title GIT一键提交
echo 开始添加变更：git add -A
git add -A
echo;
echo 提交的commit信息:%1
:: set /p declation=输入提交的commit信息:
git commit -m %1
echo;
echo 将变更情况提交到远程自己分支：git push origin main
git push origin main
echo;
:: echo 切换主分支：git checkout master
:: git checkout master
:: echo;
:: echo 本地主分支拉取远程主分支：git pull origin master
:: git pull origin master
:: echo;
:: echo 主分支合并分支：git merge hlt
:: git merge hlt
:: echo;
:: echo 将变更情况提交到远程主分支：git push origin master
:: git push origin master
:: echo;
:: echo 切换分支：git checkout hlt
:: git checkout hlt
:: echo;
:: echo 本地分支拉取远程主分支：git pull origin master
:: git pull origin master
:: echo;
echo 执行完毕！
echo;
pause