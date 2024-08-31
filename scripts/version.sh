#!/bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'No arguments passed.'
    exit 1
fi

if [[ -z "$2" ]]; then
    echo "Second argument required. (patch, minor, major)"
    exit 1
fi

# this will be the path to app.json
FILE="$1"
# major, minor, patch?
VERSION="$2"

if [[ ! -e "$FILE" ]]; then
    echo "File not found."
    exit 1
fi

get_semver_version_number() {
    local FILE
    local TYPE

    FILE="$1"
    TYPE="${2:-major}"

    case "$TYPE" in
        major)
            awk -F'[".]' '/"version"/ {print $4}' "$FILE"
            ;;
        minor)
            awk -F'[".]' '/"version"/ {print $5}' "$FILE"
            ;;
        patch)
            awk -F'[".]' '/"version"/ {print $6}' "$FILE"
            ;;
    esac

}

cur_major_version="$(get_semver_version_number "$FILE")";
cur_minor_version="$(get_semver_version_number "$FILE" "minor")";
cur_patch_version="$(get_semver_version_number "$FILE" "patch")";

case "$VERSION" in
    major)
        major_version="$((cur_major_version+1))"
        minor_version="$cur_minor_version"
        patch_version="$cur_patch_version"
        message="$VERSION version increased from $cur_major_version to $major_version"
        ;;
    minor)
        major_version="$cur_major_version"
        minor_version="$((cur_minor_version+1))"
        patch_version="$cur_patch_version"
        message="$VERSION version increased from $cur_minor_version to $minor_version"
        ;;
    patch)
        major_version="$cur_major_version"
        minor_version="$cur_minor_version"
        patch_version="$((cur_patch_version+1))"
        message="$VERSION version increased from $cur_patch_version to $patch_version"
        ;;
    *)
        echo "Please input the correct version to bump (patch, minor, major)"
        exit 1
        ;;
esac

if [[ $OSTYPE == 'darwin'* ]]; then
    sed -i '' -e "s/${cur_major_version}.${cur_minor_version}.${cur_patch_version}/${major_version}.${minor_version}.${patch_version}/" "$FILE"
else 
    sed -i -e "s/${cur_major_version}.${cur_minor_version}.${cur_patch_version}/${major_version}.${minor_version}.${patch_version}/" "$FILE"
fi

echo "$message"
