deploy:
	rm -rf public && hugo && netlify deploy --prod
