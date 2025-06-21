# js-rpg-game

## Project Overview
This project is a simple JavaScript-based RPG game that allows players to engage in combat, complete missions, and manage their inventory. The game features an auto combat system and a loot generation mechanism.

## Project Structure
```
js-rpg-game
├── index.html          # Main HTML document for the game
├── style
│   └── main.css       # CSS styles for the game
├── js
│   ├── app.js         # Entry point, manages navigation and initialization
│   ├── ui.js          # Handles user interface and updates
│   ├── player.js      # Manages player stats, inventory, and experience
│   ├── combat.js      # Implements auto combat system
│   ├── loot.js        # Generates and manages loot
│   ├── missions.js    # Contains fixed and random missions
│   ├── save.js        # Handles saving/loading game data
│   └── dataLoader.js  # Asynchronously loads JSON files
├── data
│   ├── enemies.json   # List of base enemies
│   ├── items.json     # List of items and equipment
│   ├── missions.json   # Fixed missions for the game
│   └── rarities.json   # Defines item rarities
├── assets
│   ├── img            # Illustrations and sprites
│   └── icons          # Icons for loot and other elements
└── README.md          # Project information and guidelines
```

## Installation
1. Clone the repository to your local machine.
2. Open `index.html` in a web browser to start the game.

## Usage
- Navigate through the game using the user interface.
- Engage in combat with enemies and manage your player's inventory.
- Complete missions to progress in the game.
- Save your progress using the built-in localStorage functionality.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features you would like to add.