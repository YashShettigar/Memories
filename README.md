# Memories

Memories is a React-based web application that enables users to create, update, like and delete posts. Users can sign up or log in using custom credentials or their Google account. The app features a dynamic homepage that updates in real-time as users interact with the platform. Posts can include titles, messages, tags, and optional image uploads. Additionally, users have the ability to edit their existing posts during their session. Memories offers a seamless and interactive experience for sharing and managing personal memories.

## Installation

In the project directory, you can run:

### Server
___

This folder includes the Node server.\
Switch to your `server` folder first in your terminal and run:

```node
npm install
```
This will install all the dependencies. Next, run:
```node
npm run start
```

Runs the server and it starts listening to requests from client interface.\
Open [http://localhost:5000](http://localhost:5000) to verify if the server's running.

### Python_Server
___

This folder includes the Django server.\
If you want to serve your web `client` using this server, you will have to make some changes to the `client` folder.\
To know more, follow the instructions provided in the [Usage](#usage) section.

### Client
----

Next, switch to your `client` folder in another terminal and run:

```node
npm install
```
This will install all the project dependencies. Next run:
```node
npm run start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

The `main` branch of this repository includes the project files which runs on a Node server.\
If you want to serve using this server, you can run it following the [Installation](#installtion) guidelines.

To make it run on a Django server, do the following:
1. Install `pipenv` using command-line as:
   
   ```bash
   pip install pipenv
   ```
   or follow the link [https://pypi.org/project/pipenv/](https://pypi.org/project/pipenv/) .
2. Switch to your `python_server` directory and create your `pipenv` environment following the instructions in the link mentioned in instruction 1.\
   Then, activate your `pipenv shell` and run the command:

   ```bash
   pipenv install
   ```
   This will install all the dependecies. Next, run:
   ```bash
   py manage.py runserver
   ```
   Runs the Django server serving at [http://localhost:8000](http://localhost:8000) .
3. Before running your `client`, migrate the `api` folder and `index.js` from the `pyserver` branch into your `client/src` folder.\
   Now, you may start running the `client` folder as usual from the CLI.
4. If you want to enable Google Authentication, remember to replace the text `"Your Google OAuth2.0 Client ID"` in `client/src/index.js` with your `Google OAuth Client ID`. Also, do the same for your `.env` file in `Node` server that you are runnning.

