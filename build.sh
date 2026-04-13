#!/bin/bash
set -e

HUGO_VERSION="0.160.1"
DART_SASS_VERSION="1.97.1"
GO_VERSION="1.25.5"

echo "==> Installing Go ${GO_VERSION}"
curl -sL "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" | tar -xz -C "$HOME"
export PATH="$HOME/go/bin:$PATH"
export GOPATH="$HOME/gopath"
export PATH="$GOPATH/bin:$PATH"
go version

echo "==> Installing Dart Sass ${DART_SASS_VERSION}"
curl -sLJO "https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
tar -xf "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
rm "dart-sass-${DART_SASS_VERSION}-linux-x64.tar.gz"
export PATH="$PWD/dart-sass:$PATH"
sass --version

echo "==> Installing Hugo Extended ${HUGO_VERSION}"
curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" | tar -xz hugo
export PATH="$PWD:$PATH"
hugo version

echo "==> Building site"
hugo --gc --minify
