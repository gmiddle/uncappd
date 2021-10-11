- npx dotenv sequelize db:migrate:undo
- npx dotenv sequelize db:migrate


- npx dotenv sequelize db:seed:undo:all
- npx dotenv sequelize db:seed:all


npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,hashedPassword:string,userName:string,profilePic:text

npx sequelize-cli model:generate --name Brewery --attributes name:string,city:string,state:string,breweryPic:text

npx sequelize-cli model:generate --name Beer --attributes name:string,description:string,abv:integer,ibu:integer,beerImg:text,breweryId:integer

npx sequelize-cli model:generate --name Review --attributes rating:numeric,review:text,userId:integer,beerId:integer