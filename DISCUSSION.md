# Future improvements

While this project has come a long way in just a few hours, here are some improvements that I would recommend going forward:

## Backend

1. Authentication/Authorization -- This is the biggest thing that I left off of my work. To me, auth is a day 1 concern and needs to be implemented well from the start, even if we just sign in with Google and have admin/user roles. This would've brought us well over the scope of this project, but you really need to implement auth very early on in a project.
2. Improved error handling -- There isn't much error handling going on here because it is just a select from a database, but adding domain errors and mapping database errors to something the client can understand is very important
3. Improved user input handling -- I hacked this together with some vanilla JS to avoid crashes and logical errors, but we should setup Zod or something similar to validate our payloads. We should also create a concept of DTOs, or data transfer objects, to improve the coordination between backend and frontend.
4. Caching and delimiting -- It's important to project against malicious users or just people spamming buttons. Setting up delimiting in AWS and caching via Redis early on can save some big headaches later on. It really helps to do this stuff early since devs tend to "borrow" code from other places when implementing new features.
5. Improved search -- I've learned over the years that Postgres can struggle a bit with large searches like this one. I would love to copy data over to ElasticSearch and utilize their full text search + powerful query API to supercharge this application
6. Improved logging and monitoring -- Other than a couple console logs, this app does not have much logging. This isn't super useful during development because we use the debugger, but in prod, we won't have a debugger. Adding a logging library and connecting to a platform such as DataDog and setting up monitors and health checks is huge
7. Documentation -- We need to setup OpenAPI or some other way of documenting endpoints

## Frontend

1. Continue extracting logic from Page.jsx -- This got a little bloated as I got close to the deadline, but we can extract and test a ton of the code here. With a good 1 hour session, we could really clean this up and improve the quality of the app
2. CSS -- I left the CSS untouched since I wanted to focus on development patterns rather than just making it pretty, but this app desperately needs a touch of paint. Responsiveness is a big deal here as well.
3. General performance improvements -- Because this is a small app, there are no real performance issues, but nevertheless, we would ideally set the tone for future development. Some examples include: use an IntersectionObserver to launch the HTTP request when the component comes into view, use a virtual table to avoid rendering off-screen elements, and run the profiler to check for unnecessary renders
4. Documentation -- We should set up Storybook to document our components
5. Most importantly: we need to make the page accessible. If it is not accessible, then that means there are people who cannot use our app. Imagine if someone is using our platform to get help for a disability, but they can't because our app isn't accessible!

# Application improvement walkthrough

## 1. Fix basic errors in initial React app

First things first, let's fix up basic linting errors, TypeScript errors, and general bad practices in a React app. While these are often small issues that could be ignored, it's extremely important to set a good tone when scaffolding an app. Some examples of issues that should be fixed:

1. Let's avoid using DOM manipulation - There is a call to document.getElementById, let's use React for this
2. Let's make sure that we have a key any time we iterate over something -- Currently, the BE doesn't deliver a good key, but we can at least make a quick composite key. This isn't ideal and we will fix it later, but we don't want to risk missing a re-render because of key issues
3. Fix runtime typing errors - Currently, these are runtime errors instead of compile-time errors, which we will fix shortly, but it's important to make sure the app is functional after each PR
   1. yearsOfExperience is a number but we call includes on it
   2. We will convert this to a string for now, but you can see how this whole functionality is weird

## Reorganize & Utilize TypeScript on the frontend

1. Reorganize FE code to support modularization and separation of concerns -- Right now, React does everything (!!!). We want React to be the view layer, with everything else pulled out as much as possible
   1. Create a frontend directory to keep it separate from API
   2. Create an "advocates" feature directory
      1. This will store code specific to the advocates feature
      2. The first thing we did was separate out our request logic (hitting the advocates api) as well as our business logic (filtering)
      3. Next, we pulled out the table into its own component
   3. Create a "components" directory
      1. This will store generic, shared components such as the search bar
      2. Note that I'm not changing any functionality here. We don't have tests so we don't want to. If you don't have tests, goal #1 needs to be to make your code testable
2. Implement basic TS types
   1. Added an Advocate type to handle our domain object
   2. Added an AdvocateResponse type to handle the fact that we load this over a network

## Add testing

1. Far and away the biggest problems I see in frontend repositories is the lack of tests. Because the frontend is so visual, people tend to write off tests as unimportant, but the same rules apply to FE as they do to every other software project. If you don't have tests, you have bugs. If you can't write tests, your code isn't written properly
2. We will set up some testing using jest and react-testing-library, which are tools I've had a ton of success with

## Add basic features to improve user experience

1. User experience is important, but we also don't want to get carried away since this is supposed to be a small project. As a result, we will focus on low effort/high impact features. Some examples:
   1. Reset user input after searching
   2. Add loading and error states
2. Now that we are expanding functionality, we can update tests along the way and make sure it works

## Backend work (with FE integration)

1. Now that the frontend has been cleaned up, we will focus on improving the backend.
2. We did a great thing of having a working backend first, which allowed us to make a bunch of improvements to the FE without being blocked by backend work
3. The first improvement to make is pagination and limiting payloads...this is a huge deal and you never want to see an app without these. We will add pagination options and enforce a hard limit of 100 records per api request
4. Next, we split "route.js" into 3 more files: a controller (handles client communications), a service (handles business logic), and a repository (handles persistence)
5. This enabled us to test our app much more easily
   1. A common excuse for a lack of testing is "everything is so intertwined". Well, now it isn't. Even if we theoretically had difficult testing the database or API, we still have tests of our business logic in the service file. In this case, we don't do much except calculate the cursor (which could become middleware in the future) but business logic will balloon as the project becomes more mature
