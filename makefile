preview:
	rm -rf public && hugo && netlify deploy

deploy:
	rm -rf public && hugo && netlify deploy --prod
