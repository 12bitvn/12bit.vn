include .env.makefile
build:
	hugo  --gc --minify --buildFuture --cleanDestinationDir
	yarn run precache
	yarn algolia

deploy-dev: build
	firebase deploy --token "${FIREBASE_TOKEN}" --only hosting:dev

deploy: build
	firebase deploy --token "${FIREBASE_TOKEN}" --only hosting:production
