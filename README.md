Barnabé PILLIAUDIN B3_DEV_A Blog project

## Installation

Create a .env.local file

Have postgres installed and running
Create a database

Set the following env variables:

- DB\_\_CONNECTION (Set the database connection string example: `postgres://user:password@host:port/dbname`, the project use a postgres database)
- SECURITY\_\_HASH_PASSWORD_ITERATION (Set the password hash iteration example: `10`)
- SECURITY\_\_JWT\_\_JWT_SECRET (Set the jwt secret example: `mysecret`)
- NEXT_PUBLIC\_\_API_URL (Set the api url example: `http://localhost:3000/api` )

Run `npm i` to install the dependencies
Run `npm run dev` to start the development server

# Screenshots

- Here is the home page
  ![Image of the home page](doc/images/imageHP.png)

- Navigation bar (Create a post is only available when you are an auth and the dashboard is only available when you are an admin)
  ![Image of the navigation bar](doc/images/imageNB.png)

- Create post page
  ![Image of the create post page](doc/images/imageCP.png)

- My account page
  ![Image of the my account page](doc/images/imageMA.png)

- Admin dashboard
  ![Image of the admin dashboard page](doc/images/imageAD.png)

- Session expired page (Sessions expire after 24h, you can change the expiration time in the apiConfig)
  ![Image of the session expired page](doc/images/imageSE.png)

- Sign in and sign up page
  ![Image of the sign in and sign up page](doc/images/imageSI.png)
  ![Image of the sign in and sign up page](doc/images/imageSU.png)

- Post page
  ![Image of the post page](doc/images/imagePP.png)

# Advices for first start

- Create 2 users with the sign up page
- Sign in with one of the 2 users and give him admin and author permissions in the database (set the `is_admin` and `is_author` to `true` in the `users` table)
- Don't modify the permission of your admin user in the dashboard, you won't be able to access the dashboard anymore. And as the permissions of your token are not like the permissions in the database, your token won't be considered as valid so you will have to sign in again.
