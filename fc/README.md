<img height="200" alt="Flying Chinchillas Official Logo" src="public/flying-chinchillas-official-logo.png">

# Flying Chinchillas

### Languages and Tools

<p>
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" style="padding:5px"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" style="padding:5px"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" style="padding:5px"/>
<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" style="padding:5px"/>
<img src="https://img.shields.io/badge/SQLAlchemy-d62916.svg?&style=for-the-badge&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/pydantic-e72564?style=for-the-badge&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=OpenStreetMap&logoColor=white" style="padding:5px"/>
<img src="https://img.shields.io/badge/flagpedia-ac0414.svg?&style=for-the-badge&logoColor=white" style="padding:5px"/>
</p>

### a comprehensive, full-stack travel advisory reviews website

 This project is a fully functional travel review web application where users can create an account, log in, and write reviews for different countries. Each review includes a title, description, rating, and tags that represent different aspects of the travel experience. Users can also upvote, downvote, and reply to reviews as well as personally favoriting and marking the countries they want to visit or have visited, respectively. The application allows users to share their travel experiences and rate different countries based on their personal experiences. 
- Core features:
    - User authentication: Users need to create an account to access the site. Secure signup, login, and logout is implemented with dedicated pages for signup and login.
    - Dashboard page: The main page that displays all of the countries along with a working search functionality.
    - Country profile page: Each country has a 1 through 4 safety rating, fetched from the US government travel advisory API. Each country has their flag and location map as well as reviews.
    - User profile page: The reviews which the user created are displayed here. The left portion of the page has the user settings which include uploading a profile picture and resetting their email and password. A list of favorites and visited countries are shown on the left side.

## Packages to install before getting started

`npm install react react-dom react-router-dom firebase react-bootstrap bootstrap leaflet @fontsource/mochiy-pop-p-one @fontsource-variable/montserrat @fontsource/happy-monkey @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons`
`pip install uvicorn feedparser "fastapi[all]" fastapi-utils` \

You may install all of the following packages described in detail of its purpose in two lines as given above.
- `npm install react react-dom react-router-dom`\
Installs all the necessary packages for a React app.
- `npm install firebase`\
Installs the package for web applications, user authentication, and real-time database.
- `npm install react-bootstrap bootstrap`\
Installs the library that combines Bootstrap with React for UI components.
- `npm install leaflet`\
Installs open-source JavaScript library used to build web mapping applications.
- `npm install @fontsource/mochiy-pop-p-one`\
Loads one of the two main fonts on the app.
- `npm install @fontsource-variable/montserrat`\
Loads one of the two main fonts on the app.
- `npm install @fontsource/happy-monkey`\
Loads the font for user profile page.
- `npm install --save @fortawesome/react-fontawesome`\
Installs the Font Awesome's scalable vector icons library.
- `npm install --save @fortawesome/free-solid-svg-icons`\
Installs Font Awesome's solid icons.
- `npm install --save @fortawesome/free-regular-svg-icons`\
Installs Font Awesome's regular icons.
- `pip install uvicorn`\
Installs Python package for HTTP requests.
- `pip install feedparser`\
Installs Python library for reading and manipulating feeds.
- `pip install fastapi[all]`\
Installs web framework for building APIs with Python.
- `pip install fastapi-utils`\
Installs a set of utilities for FastAPI.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
