deploy:
	npm run build
	cd build && scp -P 53344 -r -o "StrictHostKeyChecking no" . anaxita@dc.kmsys.ru:/C:/Apache24/web/wvmc-dev