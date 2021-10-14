## Sequelize commands

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,hashedPassword:string,userName:string,profilePic:text

npx sequelize-cli model:generate --name Brewery --attributes name:string,city:string,state:string,breweryPic:text

npx sequelize-cli model:generate --name Beer --attributes name:string,description:string,abv:integer,ibu:integer,beerImg:text,breweryId:integer

npx sequelize-cli model:generate --name Review --attributes rating:numeric,review:text,userId:integer,beerId:integer

npx sequelize seed:generate --name seed_breweries

npx sequelize seed:generate --name seed_beers

npx sequelize seed:generate --name seed_reviews

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo:all

npx dotenv sequelize db:seed:all

npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:drop

npx dotenv sequelize db:create
```

## Combined Code for drop/migrate/seed

local reset only

```bash
npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
```

Heroku reset

```bash
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all

??????
heroku run npx sequelize-cli db:seed:undo:all
heroku run npx sequelize-cli db:migrate:undo:all
heroku run npx sequelize-cli db:migrate
heroku run npx sequelize-cli db:seed:all
```

Seed only reset

```bash
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:seed:all
```