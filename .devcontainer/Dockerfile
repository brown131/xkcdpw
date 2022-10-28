# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.134.0/containers/javascript-node/.devcontainer/base.Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-14

# Install Haskell platform.
RUN echo deb http://downloads.haskell.org/debian buster main >> /etc/apt/sources.list \
    && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA3CBA3FFE22B574 \
    && apt-get update \
    && apt-get -y install ghc-8.6.5 cabal-install-3.2 libtinfo5 libtinfo-dev npm \
                          ca-certificates gnupg-agent software-properties-common \
    && update-alternatives --config opt-ghc \
    && update-alternatives --config opt-cabal
ENV PATH="/opt/ghc/bin:${PATH}"

# Install Stack
RUN wget -qO- https://get.haskellstack.org/ | sh

# Install global node modules
RUN sudo npm install -g npm
RUN sudo npm install -g purescript spago parcel-bundler esbuild --unsafe-perm=true
RUN sudo npm install -g bootstrap-icons

# Install Docker
RUN wget -O- https://download.docker.com/linux/debian/gpg | sudo apt-key add - \
    && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian buster stable" \
    && sudo apt-get update \
    && sudo apt-get -y install docker-ce docker-ce-cli containerd.io
