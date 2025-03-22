install:
	yarn install

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

test:
	yarn run lint
	yarn run test

init: install docker-up
	yarn run migrate

start:
	yarn run dev

deploy-local:
	serverless offline --stage development --debug

deploy-prod:
	serverless deploy --stage prod
