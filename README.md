# bitmap-generator

This bitmap generator is a tool designed to help students on parts b and c of the final project for COMP 541: Digital Logic

## Instructions for Use
1. Create new sprites on the homepage using the pixel art grid, and click "Add to saved sprites" to save the sprite/character.
2. Create as many sprites as you want/as you defined in your C demo. View, edit, delete, and/or reorder them on the My Sprites page. The sprite data is saved in your browser's localStorage, so it will persist on page reload and as long as you don't clear the site data. They probably won't stay forever though, and may not save if you close the tab, so don't forget to generate and save your bmem file when you are done.
3. When you are ready to generate your bmem.mem, click "generate bmem from sprites" on the sprites page. This will produce the concatenation of all of the sprites you've created, in the order that they are shown on the page.
4. If you want to change some of your sprites later (e.g., after viewing them on the emulator or the board), go to the My Sprites page and simply paste in your bmem file to render your sprites. You can edit them and then re-generate your bmem
5. That's it! I hope that this website makes it easier to create, manipulate, and work with your sprites for the final project. Good luck!

## Features
- Canvas and color picker for creating 16x16 pixel 'sprites', with ability to undo up to 20 strokes.
- Ability to generate a 256-line string of hexcodes for a sprite, which stores the hexcode for each pixel and represents it.
- Ability to load in a 256-line string of hexcodes and view/modify the corresponding sprite.
- Ability to save sprites created on the canvas, with persistence on page refresh (using JS localStorage).
- Ability to view, modify, and re-order all saved sprites.
- Ability to generate a ```bmem.mem``` of all saved sprites (a concatentation of each sprite's 256-line hexcode strings, ordered by index).
- Ability to load sprites into the 'saved sprites' page by pasting in a ```bmem.mem``` file.


## Credits
- Abraham Post, who developed the initial "Sprite Maker" website application for creating sprites for the COMP541 final project. Much of the logic in this application for creating individual sprites and saving them as hex code files (eg on the homepage) is based off of his work. View the original Sprite Maker here!

- Dr. Montek Singh, who gave me the idea to create this project after having the best time in his COMP 541 course (which I'd recommend to everyone!)
