ZIP_NAME ?= "monitoringEndpoint.zip"
PLUGIN_NAME = monitoring-endpoint

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

all: build zip ## build and zip

build: clean ## build plugin

	npm install flatted
	npm install https

	mkdir -p build
	mkdir -p build/$(PLUGIN_NAME)
	mkdir -p build/$(PLUGIN_NAME)/webfrontend
	mkdir -p build/$(PLUGIN_NAME)/l10n
	mkdir -p build/$(PLUGIN_NAME)/server
	mkdir -p build/$(PLUGIN_NAME)/server/extension

	cp src/server/extension/monitoring-endpoint.js build/$(PLUGIN_NAME)/server/extension/monitoring-endpoint.js

	cp l10n/monitoring-endpoint.csv build/$(PLUGIN_NAME)/l10n/monitoring-endpoint.csv # copy l10n

	cp -r node_modules build/$(PLUGIN_NAME)/

	cp manifest.master.yml build/$(PLUGIN_NAME)/manifest.yml # copy manifest

clean: ## clean
				rm -rf build

zip: build ## zip file
			cd build && zip ${ZIP_NAME} -r $(PLUGIN_NAME)/
