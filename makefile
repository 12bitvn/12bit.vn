preview: precache
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && netlify deploy

deploy:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && yarn run precache && netlify deploy --prod
