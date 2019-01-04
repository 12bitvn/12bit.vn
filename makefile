preview:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && netlify deploy

deploy:
	rm -rf public && hugo  --gc --minify --buildFuture --enableGitInfo && netlify deploy --prod
