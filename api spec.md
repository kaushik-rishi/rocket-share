**Regular routes**
- [ ] EJS setup templating engine
- [ ] Use footer and navbar partials
- [ ] `GET /` - render home page
- [ ] `GET /login` - render login page
- [ ] `GET /signup` - render signup page
- [ ] `GET /logout` - render logout page
- [ ] `GET /share` - render the share a file page
- [ ] `GET /file/:uuid` - render the download file page (The download button will make a **GET** request to the route that uses `res.download`)

**Middleware**
- [ ] Auth middleware
    - [ ] Some middleware function to append the user object to the res.locals 
    - [ ] Require Auth (For protected routes) - redirect to login if not authorized

**API end points**

**Auth Endpoints**
- [ ] `POST /login` - login the user and update the cookies accordingly
- [ ] `POST /signup` - signup the user and login the user
- [ ] `POST /logout` - logout the user and clear the respective cookies

- [ ] `POST /api/upload` - upload the file and return the uploaded file details
- [ ] `GET /download/:uuid` - inititate the file download

**Harsh Distinction**:
- Route `GET /file/:uuid`
```js
res.render('download'); // render the download page with the details of the passed in UUID
```
- Route `GET /download/:uuid`
```js
const file = getFileMetaData();
errorvalidation();
res.download(pathOfTheFile, file.originalname); // initiate the download
```

**Other features**
- Integrating user login and file sharing feature
- Integrating `node-mailer` feature to mail the download link of the file

**folder structure**
```
├── api spec.md
├── config
│   └── db.js
├── controllers
│   ├── authControllers.js
│   ├── fileHandlers.js
│   └── uploadControllers.js
├── middleware
│   ├── authMiddleware.js
│   └── uploadMulterMiddleware.js
├── models
│   ├── Relations.js
│   ├── Upload.js
│   └── User.js
├── multerFormat.json
├── package.json
├── package-lock.json
├── routes
│   ├── api
│   │   ├── authRoutes.js
│   │   └── uploadRoutes.js
│   ├── filehandlingRoutes.js
│   └── viewRoutes.js
├── server.js
├── testCode
│   └── testShortId.js
└── views
    ├── afterlogin
    │   └── index.html
    ├── auth
    │   ├── login.ejs
    │   ├── login.js
    │   ├── signup.ejs
    │   └── signup.js
    ├── auth_scripts
    │   └── getPayloads.js
    ├── components
    │   ├── footer.html
    │   ├── loader_scripts
    │   │   └── loadNavAndFooter.js
    │   └── navbar.html
    ├── favicon.png
    ├── forum
    │   └── index.ejs
    ├── index_css
    │   ├── normalize.css
    │   └── styles.css
    ├── index.ejs
    ├── rocket.svg
    └── share
        └── index.ejs
```

**For some more clarity and distinction**
- Download page (This is a page to display the metadata of the file and the download url)
- Download route (The file download will be initiated on accessing this route)
- Another route to get the details of a file of particular UUID ? Or should we have it in the download route itself ?

**Todo ASAP**
- change the cookies to http only and send them with the request
- change the jwt storage from cookies to localstorage + authbearertoken