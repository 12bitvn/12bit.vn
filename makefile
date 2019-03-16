build:
	rm -rf ./public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && yarn algolia

preview: build
	netlify deploy

deploy: build
	netlify deploy --prod
