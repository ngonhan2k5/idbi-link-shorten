#!/bin/bash
APP=blog

start(){
    nohup npm start > $APP.log 2>&1 &
    echo $! > pid.txt
}

build(){
    npm run buildProd
}

stop(){
    kill -9 `cat pid.txt`
    rm pid.txt
}

case "$1" in
  install)
    install $2
    ;;
  build)
    build
    ;;
  start)
    start
    ;;
  stop)
    stop
    ;;
  uninstall)
    uninstall
    ;;
  retart)
    stop
    start
    ;;
  *)
    if "$1"; then
      echo "Success $1"
    else
      echo "Usage: $0 {start|stop|restart|uninstall}"
    fi
esac
