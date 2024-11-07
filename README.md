To register new commands:
npm run register

To run app locally:
npm start

To rerun schema.sql:
npx wrangler d1 execute d1-main-db --local --file=./schema.sql
npx wrangler d1 execute d1-main-db --remote --file=./schema.sql

To check database:
npx wrangler d1 execute d1-main-db --local --command="SELECT _ FROM CharacterDetails"
npx wrangler d1 execute d1-main-db --remote --command="SELECT _ FROM CharacterDetails"

Testing can be done by opening a second terminal and running:
npm run ngrok
then setting the discord bots Interactions Endpoint URL to the Forwarding url

To deploy latest version to cloudflare:
npm run publish

Dont forget to set the interactions endpoint url to the workers url for the prod bot
