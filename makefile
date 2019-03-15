preview:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && netlify deploy && yarn algolia

deploy:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && netlify deploy --prod && yarn algolia
