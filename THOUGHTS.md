- In the future if we do implement share to certain user id's then we can have a middleware that first attaches the user object to res.locals and another universal middleware that fetches the upload object and attaches it to the res.locals and in the further middlewares we can check if the upload is a private upload and if it is then we can verify if the attached user object can access the file or not, (or) if the upload is not private then we can directly render the upload page (or) if it is private and the user is a wrong user we can display a page like google's saying that request access and we can handle the request access using the node mailer on the backend.

- multiple file uploads
	1. may be we need to have 2 different middlewares one for singleUpload and another for multipleUpload and then we can ask the user to select the one he needs, but that raises many conflicts in the database
	2. we can just have an array upload and we could just fallback to the previous idea of uploading the files to a folder so that now we can have multiple files in a single folder and we can display the download page with a list of multiple files

- user authentication
	1. have a global middleware '*' which just takes the token verifies it and attaches a user object to the res.locals (or) directly to res[.user]
		- we need to change the navbar.html and footer.html and remove the loader file and convert them into partials and there we can have conditions on the user