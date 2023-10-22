#!/bin/bash
#
# Export expo script

ACCOUNT_NAME="timivietnam"
PROJECT_NAME="metmoi"

# Clear before build
rm -rf ./dist

# Execute for build expo run files
expo export --public-url https://${ACCOUNT_NAME}.github.io/${PROJECT_NAME}

cp -r ./landing/* ./dist

cd ./dist

qrencode -s 10 -l L -v 1 -o ./img/android.png "exps://${ACCOUNT_NAME}.github.io/${PROJECT_NAME}/android-index.json" --foreground=007AFF
qrencode -s 10 -l L -v 1 -o ./img/ios.png "exps://${ACCOUNT_NAME}.github.io/${PROJECT_NAME}/ios-index.json" --foreground=353535


git init
git add -A
git commit -m "Deploy"
git remote add origin git@github.com:${ACCOUNT_NAME}/${PROJECT_NAME}.git
git push origin master --force
