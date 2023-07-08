# Album API Project
For this project, I create an express API that users can use to log music albums from their own collection. This API uses express to access a user's Mongo database via routes for creating, updating, deleting, showing a specific / all, and logging in / out users. The API also accesses an album database through routes for creating, updating, deleting, and showing a specific / all albums within the database, according to the user. 

## Installation Guide

Welcome to the installation portion for the Album's API! Here, I give a step-by-step walkthrough on how to install and get the API running. If you're a seasoned software engineer or just starting out, this guide should be simple enough for you to follow along.

## Global Installation 
First things first, we must clone the repository from Github into an empty repository on your computer.

1. After confirming you're on the necessary Github repository page, navigate to the "Code" button at the top in green. Click on the button. You should be under the local tab, if not click on it. We'll only be dealing with the SSH link provided. Make sure you copy the link and open up your terminal. I use GitBash since i'm using a Windows OS. 
2. Now were at the terminal, make sure you either create then navigate to the newly created folder or just navigate to the folder you wish to clone the repository in.
3. Initialize the repository by typing the following in the command line:
    - git init
4. You should still have the copied SSH from Github, if not go back to the website and copy it. Once copied, write the following in the command line:
    - git clone git@github.com:user/sampleAPI.git






- Here we must install a couple of packages globally. This means you are allowed to use the code in the package on your local computer

## Development Mode
- To run the application in development mode, simply run this command on the command line or within the command line of your preferred code editor: 

npm run dev

This will run the API in development mode, which allows you to make changes within the code while the server is still running. The server will automatically refresh the changes that have been made. 

## API Requests via Postman
- 

## Testing
- For automatic testing, I used Jest & Supertest in conjunction with MongoDB-Memory-Server. 

## Starting the Application
- To start the application, run this command on the command line: npm start