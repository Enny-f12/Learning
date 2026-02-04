

# Deployment Documentation: Monolith Approach

This guide covers deploying a full-stack application where the backend serves the frontend from a single server (Monolith).

1. The Monolith Strategy

In a monolithic deployment, the production build of the frontend is moved into the backend folder. The Express server is then configured to serve these static files.

 Backend Configuration

Add this middleware to `index.js` to tell Express to check the `dist` folder for static content:

```javascript
app.use(express.static('dist')) //


2. Preparing the Build (`dist`)

a.  Running `npm run build` in your frontend directory creates a `dist` folder containing optimized HTML, CSS, and JS.
b. This `dist` folder must be copied into the root of your backend directory so `app.use(express.static('dist'))` can find it.
c. You must move this folder to the backend. On Windows, we use xcopy to ensure all subdirectories and files are copied correctly

3. Automation: `npm run deploy:full`

To avoid manual copying, add a script to your backend `package.json`. This script automates the entire process:

```json
"scripts": {
  "build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend",
  "deploy:full": "npm run build:ui && git add . && git commit -m uideploy && git push"
}

```

`build:ui`: Deletes the old `dist`, builds the frontend, and copies the new `dist` to the backend.
`deploy:full`: Runs the build script and immediately pushes the changes to your repository to trigger a deployment.

4. Connecting to Render

a. Create Web Service: Connect your GitHub repository (containing both backend and the `dist` folder) to Render.
b. Environment Variables: Add your `MONGODB_URI` and `PORT` in the Render "Environment" tab.
c. Build Command: `npm install`
d. Start Command: `node index.js` (or `npm start`)

