# ValandCo

1-Explaination

2-Start

3-Navigation


## 1 --------- EXPLAINATION --------- 

This application is for add, edit or delete "articles" on a same database.

In it, you can:
		-register a new user. 
		-log with a user who was register yet
		-send an ask for a forgot password by mail
		-navigate on home page
		-show a list of articles created by all users
		-select an article in the list and show this one
		-Edit or delete an article
		-send a mail to the administrator
		-log out


## 2 --------- START ---------


For this application to work you need to have install an IDE and MongoDB on your computer

IDE: Visual studio code: https://code.visualstudio.com/

MongoDB: https://www.mongodb.com/try/download/community
	

For start you should follow this steps:	
					```
					npm install
					```
					```
					npm start
					```
					-open your browser on http://localhost:3000/


## 3 --------- NAVIGATION---------


	1-Login
	2-Register
	3-Forgot password
	4-Home
	5-List
	6-Article
	7-Add article
	8-Edit article
	9-Mail
	10-Logout


	1-Login :

	In this page you can use your user log: Email and Password
	
	If you forgot your password, you can click on the link "Forgot password?"

	At least, for create your new user, click on the link "Register" at the top of the page on the header.




	2-Register :
	
	For register a new user, you can't have empty fields :
		
		- Name
		- Surname
		- Month of birth
		- Year of birth
		- Country
		- Email
		- Password (6 characters minimum)
		- Confirm password (6 characters minimum)

	Note your email and password for login in login page



	3-Forgot password :

	
	In case you forgot your password, you can send a mail with your name and your email.
	
	An administrator will send you a new password for login.



	4-Home
	
	Once you are login, you will get a header in same pages with some links for navigate to the others pages:
	
	-Home
	-List
	-Add article
	-Mail
	-Logout

	On page Home, you can navigate to an other page.




	5-List

	This page show you all article created by users.

	Click on one title for navigate to his information.

	
	6-Article
	
	This page show you information about an article choosed on list page.
	
	You can edit or delete this article.



	7-Add article

	For add a new article you must refer a title and information in body part.

	The name of author is your name refered when you did your register, you can't change it.



	8-Edit article
	
	On edit article you will find information of this one and edit title and/or body.
	
	Empty fields are forbidden.

	The name of author will be replace by your own name.

	The name of author is your name refered when you did your register, you can't change it.

	
	
	9-Mail
	
	The mail page can permit you to send an email.

	Your email adress refered on register page will be put on field "from", you can't change it.
	
	Empty fields are forbidden.





	10-Logout

	You can logout for connect with an other user.



