install:
	yarn install

start:
	docker-compose up -d

stop:
	docker-compose down

test:
	yarn run lint
	yarn run test
