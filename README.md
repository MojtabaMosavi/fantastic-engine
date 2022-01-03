# Frontend Mentor - Rock, Paper, Scissors, Lizard, Spock solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Maintain the state of the score after refreshing the browser
- Play Rock, Paper, Scissors, Lizard, Spock against the computer 

### Screenshot

![](./design/bonus/desktop-step-4-bonus.jpg)

### Links

- Solution URL: [https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH/hub/rock-paper-scissors-game-yjNd7FJNc/edit](https://your-solution-url.com)
- Live Site URL: [https://rock-paper-scissors-lizard-spock2.netlify.app/](https://rock-paper-scissors-lizard-spock2.netlify.app/)

## My process
- Initialize a git repository
- Configure webpack and create a a basic folder structure 
- Spend some time going trought design files and do some initial planning
- Write the markup for the component you working on
- Once you done writing the markup begin with styles 
- Only move to next component once you done with everthing related to the current one, mobile view, desktop view and js functionality etc
- Do commits regularly. 

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Webpack 
- Scss 
- BEM 

### What I learned

- Basic understading of how webpack works and how it's used. In this project I used a three different files for two configuration modes which are:
  * webpack.common.js, captures the common setting between the two different modes that webpack has to avoid redundancey (Dry code).
  * webpack.dev.js, development settings. 
  * webpack.prod.js  development setting whose main difference from production setting is a set of optimization like minification and uglyfing for efficiency.
- How important it is that all the movements of components in an UI mimice the movements in the natural world instead of sudden and spantaneous movements, for instance imagine some components that gradually comes into view rather than just appearing out of nowhere and in short span of time like nano seconds. 
- Developing a proper rutine for planning before starting writing code and trying to get good grasp on what are you building by asking a tons of qestions regarding each component.

### Continued development

- Creating a better commit history and deeeping my knowlege about branching, stashing and ohter git functionality.
- Better structure for writing js in a modular way and doing a through study of different design patterns and best practices.
