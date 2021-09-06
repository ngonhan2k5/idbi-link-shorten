if [ -d dist ]; then
    npm start
else
    npm run buildProd
    npm start
fi