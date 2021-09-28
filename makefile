include .env.makefile

hugo-build-dev:
	HUGO_ENV=development hugo  --gc --minify --buildFuture --cleanDestinationDir

hugo-build-prod:
	HUGO_ENV=production hugo  --gc --minify --buildFuture --cleanDestinationDir

build-dev: hugo-build-dev
	yarn algolia

build-prod: hugo-build-prod
	yarn algolia

deploy-dev: build-dev
	firebase deploy --token "${FIREBASE_TOKEN}" --only hosting:dev

deploy: build-prod
	firebase deploy --token "${FIREBASE_TOKEN}" --only hosting:production
