#!/bin/bash
curr_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
/usr/bin/env python3 -m http.server 9001 --bind 127.0.0.1 --directory "${curr_dir}/../site"
