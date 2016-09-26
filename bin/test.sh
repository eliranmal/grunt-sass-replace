#!/usr/bin/env bash

# tests are run as an npm run script, and not via the grunt 'test' multitask, to allow the sass-replace
# task to run separately with the 'force' flag.
# this is needed as the tests also cover cases where the sass-replace task exits unsuccessfully.

big_echo() {
    echo -e "\n\n> > > $1\n"
}

big_echo "cleaning test files"
grunt clean

big_echo "running the sass-replace task with the 'force' flag"
grunt sass-replace --force

big_echo "running nodeunit"
grunt nodeunit

