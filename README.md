# Project Overview
The project is a browser-based version of the classic arcade game Space Invaders, created using vanilla HTML, CSS, and JavaScript. The game involves a player controlling a spaceship at the bottom of the screen and shooting down waves of alien invaders who move progressively closer to the player's position. As the player progresses through levels of the game the invaders move and shoot faster.

Please find the full deployment of the app [here](https://wyndhams.github.io/ga-project-1/). 

# Brief

- Render a game in the browser
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

## Requirements:
- The game should be playable for one player
- The obstacles should be auto generated

## Suggested enhancements:
- Different difficulty levels
- Two player mode on the same computer: players take turns the first to lose more lives across the whole game loses.
- High score board with localStorage

# Getting Started

Clone the repo locally using the SSH Key contained within the Code button above, then follow the steps below in a local Terminal window:
```
code .
```
Install the node modules:
```
npm install
```
Start the game:
```
npm start
```
# Technologies Used

- HTML5
- CSS
- JavaScript
- Git
- GitHub
- Excalidraw

# Planning
The planning phase involved determining the game's essential features, including the game's mechanics, graphics, and audio. The planning phase also included developing a roadmap and timeline to guide the project's development. I also researched different implementations of Space Invaders and played various versions of the game to better understand its core mechanics and to get inspiration for my implementation. I also made sketches of the game's user interface and created a list of required assets, such as images and audio files.

<img src="./README_images/project-1-wireframe.png">

# Build Process
The build process involved developing the game's mechanics using JavaScript, including the player's and alien spaceship movement, shooting and explosions. Additionally, the graphics were created using HTML and CSS. To create the audio for the game, I used a combination of sound effects from Splice.

​​To create the game, I used object-oriented programming principles and structured the code into different modules for easier management and maintainability. I also implemented collision detection between the player's bullets and the enemy ships, as well as between the player's spaceship and the enemy bullets. Additionally, I used the HTML canvas element to draw and animate the game graphics.

# Challenges
One of the primary challenges of the project was achieving smooth and responsive movement for the player's spaceship and the alien invaders, while also maintaining consistent gameplay performance. Achieving this required careful optimisation of the game's animation and physics calculations, as well as utilising various techniques such as object pooling to reduce the number of expensive object creations and deletions.

Another challenge was making the game compatible with a wide range of browsers and devices. Since the game was developed using vanilla HTML, CSS, and JavaScript, it was important to ensure that it could run on as many platforms as possible. This required thorough testing and debugging across different browsers, including legacy browsers that may not support the latest web standards. It also required designing the game to be responsive and scalable across different screen sizes and resolutions.

A further challenge was creating the game's audio, as it required knowledge of digital audio editing and manipulation, as well as using the Web Audio API to handle playback and control of the audio in the game. Balancing the audio levels and creating the right sound effects for the game required careful attention to detail and iteration.

Finally, creating the high-score tracking system required understanding of how to save and retrieve data from the browser's local storage, as well as designing a simple and intuitive user interface to display the player's score and progress.

# Highlights
The highlights of the project include the successful implementation of the game's mechanics, graphics, and audio, resulting in a fully functional Space Invaders game. The game also includes a high-score tracking system and different difficulty levels.

One of the highlights of the project was creating the game's high-score tracking system, which involved saving and retrieving scores from the browser's local storage. I also implemented different difficulty levels, which adjusted the speed and behavior of the alien invaders to increase the game's challenge.

In addition to the highlights I previously mentioned, another significant highlight of the project was creating a responsive and intuitive user interface. The game's interface includes a start screen with instructions, a game screen with the player's score and remaining lives, and an end screen with the player's final score and an option to restart the game.

Another highlight was the development process itself. Working on the project allowed me to deepen my understanding of core programming concepts such as object-oriented programming, game mechanics, and algorithm optimisation. I also gained experience with project management and design, as well as working with external libraries and APIs.

# Future Development
Future development for the project could include adding additional features which could include:
- Optimisation to improve performance on a wider range of devices, including making the game mobile friendly with additional responsive design.
- Adding power-ups: Power-ups such as shields, extra lives, and weapon upgrades could be introduced to add variety and strategic depth to the game.
- Adding boss battles: Boss battles could be included as a climactic finale to each level, requiring the player to use different tactics and skills to defeat a tougher opponent.
- Expanding the game world: The game could be expanded to include more levels, enemy types, and environments, such as different planets or space stations.
- Improving graphics and audio: The game's graphics and audio could be improved to enhance the game's atmosphere and to make it more visually appealing and immersive. This could involve creating more detailed and animated sprites, and adding more varied and dynamic music and sound effects.


