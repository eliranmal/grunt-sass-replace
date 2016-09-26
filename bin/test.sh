#!/usr/bin/env bash


big_echo() {
    echo -e "\n\n> > > $1\n"
}

big_echo "cleaning test files"
grunt clean

big_echo "running the sass-replace task with the 'force' flag"
grunt sass-replace --force

big_echo "running nodeunit"
grunt nodeunit

