# Переменные объявленные с "?=" можно перекрыть через переменные
# окружения при запуске make.

# Имя сервиса, как правило это имя репозитория. Имя может включать
# группу репозитоерив, например "platform"
APP_NAME?=$(notdir $(shell pwd))

# Далее вычисляемые переменные, их лучше не трогать.
GIT_HASH:=$(shell git log -1 --pretty=format:"%H")
GIT_SHASH:=$(shell git log -1 --pretty=format:"%h")
GIT_BRANCH:=$(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD)
BUILD_AT:=$(shell date +"%Y-%m-%dT%H:%M:%S%z")
VERSION:=$(shell git describe --tags --exact-match 2>/dev/null || echo $(GIT_SHASH)-$(GIT_BRANCH))

# CI related
DOCKER_IMAGE?=family-tale/client/$(APP_NAME)
DOCKER_REGISTRY?=registry.tech.simplytica.com
DOCKER_USER?=$(shell whoami)
DOCKER_PASSWORD?=


all: build-dev push-dev

build:
	@echo Build for $(TARGETENV) target environment.
	@docker build \
	--build-arg APP_NAME=$(APP_NAME) \
	--build-arg GIT_HASH=$(GIT_HASH) \
	--build-arg VERSION=$(VERSION) \
	--build-arg TARGETENV=$(TARGETENV) \
	--build-arg GRAFANA_API_KEY=$(GRAFANA_API_KEY) \
	-f Dockerfile -t $(DOCKER_IMAGE)/$(TARGETENV):$(VERSION) .
	@docker tag $(DOCKER_IMAGE)/$(TARGETENV):$(VERSION) $(DOCKER_IMAGE)/$(TARGETENV)

build-dev: TARGETENV=dev
build-dev: build

build-test: TARGETENV=test
build-test: build

build-prod: TARGETENV=prod
build-prod: build

push:
	@echo "$(DOCKER_PASSWORD)" | docker login $(DOCKER_REGISTRY) -u $(DOCKER_USER) --password-stdin
	@docker push $(DOCKER_IMAGE)/$(TARGETENV):$(VERSION)
	@docker push $(DOCKER_IMAGE)/$(TARGETENV)
	@docker rmi $(DOCKER_IMAGE)/$(TARGETENV):$(VERSION)
	@docker rmi $(DOCKER_IMAGE)/$(TARGETENV)

push-dev: TARGETENV=dev
push-dev: push

push-test: TARGETENV=test
push-test: push

push-prod: TARGETENV=prod
push-prod: push

.PHONY: all build build-dev build-test build-prod push push-dev push-test push-prod
