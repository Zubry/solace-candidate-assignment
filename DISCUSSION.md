# Solace Application Recommended Improvements

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
   3. Create a "components" directory
      1. This will store generic, shared components such as the search bar
      2. Note that I'm not changing any functionality here. We don't have tests so we don't want to. If you don't have tests, goal #1 needs to be to make your code testable
   4. 
