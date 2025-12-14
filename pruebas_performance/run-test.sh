#!/bin/bash

# Cargar variables del archivo .env
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Ejecutar k6 con el archivo de test pasado como argumento
k6 run "$@"
