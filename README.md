# FullStackOverflow Developer

## About
In this app you can ask questions to other users answer it! You need to register to a valid class to ask or answer, for now it has the classes T1, T2, T3 and T4.

## Tools
This API was made using NodeJS and Postgres, with some libs like [express](https://www.npmjs.com/package/express) and [pg](https://www.npmjs.com/package/pg).

## Preparing
First, you need to have node, npm and postgres installed!\
\
Then, clone this repository to your computer: 
#### `git clone https://github.com/lfelipelizeu/fullstackoverflow-developer`
\
Now to install the dependencies, access the cloned folder by the terminal and use:
#### `npm i`
\
I've uploaded a dump file to this repository, use it to create the needed database to the app work.\
\
I've also uploaded a `.env.example` file, an environment example file, you need to replace the variables based on your postgres configurations, then rename the file for `.env`.

## Running
This server has 2 different scripts, you can run them based on which database you want to use.
- If you want to run at the production database, set the `.env` file with the production database credentials and use:
#### `npm run start`
- If you want to run at the development database, create a `.env.dev` file, based on the `.env.example` and fill with the development database credentials and use:
#### `npm run dev`
