if ls dist > /dev/null; then
    npm start
else
    npm run buildProd
    npm start
fi