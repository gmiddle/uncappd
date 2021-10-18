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

heroku run npm run sequelize db:migrate

heroku run npm run sequelize db:seed:all

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


db diagram code:
Table users {
  id int [PK]
  email string (256)
  hashedPassword string
  username string (30)
  profilePic string
  createdAt timestamp
  updatedAt timestamp
}

Table breweries {
  id int [PK]
  name string (80)
  city string (80)
  state string (2)
  breweryPic string
  createdAt timestamp
  updatedAt timestamp
}

Table beers {
  id int [PK]
  name string (80)
  description string (750)
  abv integer
  ibu integer
  beerImg string
  createdAt timestamp
  updatedAt timestamp
  breweryId int
}

// a brewery has many beers, but a beer has only one brewery
Ref: "breweries"."id" < "beers"."breweryId"


Table reviews {
  id int [PK]
  rating numeric (2, 1)
  review string (2000)
  createdAt timestamp
  updatedAt timestamp
  userId int
  beerId int
}

// a beer has many reviews, but a review can only have one beer
Ref: "beers"."id" < "reviews"."beerId"

// a user has many reviews, but a review only has one user
Ref: "users"."id" < "reviews"."userId"





