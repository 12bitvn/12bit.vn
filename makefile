include .env.makefile
build:
	hugo  --gc --minify --buildFuture --cleanDestinationDir
	yarn run precache
	yarn algolia

deploy: build
	firebase deploy --token "${FIREBASE_TOKEN}"
