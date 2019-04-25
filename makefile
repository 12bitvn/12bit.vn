build:
	rm -rf ./public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && yarn algolia

deploy: build
	firebase deploy
