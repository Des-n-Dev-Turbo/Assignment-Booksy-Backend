# Booksy App

---

This is the backend Application using Node.Js, Express.JS, MongoDB ODM Mongoose, ElasticSearch, Mongoosastic - The Mongoose driver for ElasticSearch.

This is a RESTful API which has the following routes as mentioned below-

```
GET    - /books
GET    - /book/:id
POST   - /book/new
PATCH  - /book/:id
DELETE - /book/:id
GET    - /search?searchTerm=someSearchTerm
```

---

- This backend allows users to retrieve all the books in the paginated form.
- Add new book.
- Edit existing book and delete the existing book too.
- It also used elasticSearch based searching and allows users to get the books by keywords.

## Getting Started

First, install all the dependencies and make sure you create a .env file which should contain the following env variables

```bash
MONGODB_USER_NAME=*******
MONGODB_PASSWORD=********
ELASTICSEARCH_NODE=*******
ELASTICSEARCH_API_KEY=********
```

Make sure your have properly set up the MongoDB Atlas cluster and ElasticSearch Cloud, and is running.

### Setting up MongoDB Atlas and ElasticSearch Cloud

- Login using Google or other Auth Providers in [MongoDB](https://www.mongodb.com/)
- Click on New Project
- Give the Project a name - "Booksy App"
- Next and click on Create Project
- Click on Create a Deployment
- Select the free Tier cluster
- Give it a cluster name ex. booksy-app and it will ask you to set for Username and Password
- **!Important** for connecting later.
- The same username and password will be used in the env Variables

- Similary go to elasticSearch and Login using Google or other Auth Providers in [ElasticSearch](https://cloud.elastic.co/registration)
- Create a deployment and make sure to create an Index in the ElasticSearch and it should have the name search-books since we will be using the same name search-books for mongodb collection name.
- Create an API Key and make sure to note down the search Node
- Once all this is completed. You are set to go.

Now start using start command to run the backend in localhost:8080.

```bash
npm start || npm run start
```

Open [http://localhost:8080](http://localhost:8080) with your browser using Frontend App or Postman Tool to see the result.

## Learn More

For Frontend code please refer the below given repository and follow the instructions.

[Frontend Code Repository](https://github.com/Des-n-Dev-Turbo/Assignment-Booksy-Frontend)

---
