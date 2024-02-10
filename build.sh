#!/bin/bash

# deps: yq, npm

src_dir='react/kube-compatrix'
tools_dir='site/tools'

###

curr_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
build_dir="$src_dir"/dist

function build_react {
  cd "$curr_dir"/react/kube-compatrix
  npm run build
}

function yaml_to_json {
  yaml_src="${curr_dir}/${tools_dir}"
  json_dst="${curr_dir}/${build_dir}/data/tools"

  mkdir -p "$json_dst"
  for tool in $(yq '.[].name' "${yaml_src}/index.yaml"); do
    yq -o=json -I=0 '.' "${yaml_src}/${tool}/data.yaml" > "${json_dst}/${tool}.json"
  done
}

yaml_to_json
