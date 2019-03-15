preview:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && yarn algolia && netlify deploy

deploy:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && yarn algolia && netlify deploy --prod
