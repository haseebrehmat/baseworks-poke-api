# Pokémon Details App

This project is a Vue.js application that fetches and displays detailed information about Pokémon from the PokeAPI. It features Pokémon stats, types, images, and evolution chains, providing an interactive experience for users to explore the world of Pokémon.

## Features

- **Fetch Pokémon Data**: Retrieve data for individual Pokémon using their names.
- **Display Pokémon Details**: Show the name, image, stats, and types of each Pokémon.
- **Evolution Chain**: Display the evolution stages of Pokémon, including images and names.
- **Responsive Design**: The app is designed to be responsive and works well on both desktop and mobile devices.

## Technologies Used

- **Vue.js**: Frontend framework for building user interfaces.
- **Vue Router**: For routing between different Pokémon detail views.
- **TypeScript**: For static typing and better development experience.
- **PokeAPI**: Public API used to fetch Pokémon data.

## Installation & Project Setup

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/haseebrehmat/baseworks-poke-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd baseworks-poke-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   `sh
    npm run dev
    `
   Open your browser and go to http://localhost:8080.

## Project Structure

```csharp
pokemon-details-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Static assets (images, etc.)
│   ├── components/      # Vue components (e.g., EvolutionStage.vue)
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Vuex store (if applicable)
│   ├── views/           # Main views (e.g., PokemonDetails.vue)
│   ├── App.vue          # Main app component
│   ├── main.ts          # Entry point of the application
└── package.json
```

## Main Views

### 1. PokemonList

The **PokemonList** view serves as the entry point for users to explore the Pokémon available in the application. Key features include:

- **Display of Pokémon:** The view lists all available Pokémon, showcasing essential details such as their names, images, and types.
- **Routing to Details:** Each Pokémon item in the list acts as a link. When clicked, it navigates the user to the **PokemonDetails** view for more in-depth information about that specific Pokémon.

- **Data Fetching:** The view is responsible for fetching Pokémon data from an API (e.g., the PokéAPI) and rendering it dynamically using Vue's reactivity system.

- **Styling and Responsiveness:** The view is styled to ensure it is user-friendly and visually appealing, often utilizing CSS Flexbox or Grid for layout.

### 2. PokemonDetails

The **PokemonDetails** view provides comprehensive information about a specific Pokémon. It enhances the user's experience with detailed insights. Features include:

- **Pokémon Overview:** Displays the name and an image of the Pokémon, fetched based on its ID.

- **Stats:** Lists various stats for the Pokémon, such as attack, defense, and speed, which are crucial for users interested in competitive play.

- **Types:** Shows the types of the Pokémon, along with colored indicators for each type to provide a visual representation of their classification.

- **Evolution Chain:** Displays the evolution chain of the Pokémon, illustrating how it evolves into other forms. This includes images and names of evolved forms, enhancing the informational depth.

- **Loading State:** Includes a loading indicator while fetching details to improve user experience and provide feedback during data retrieval.

These views work together to create an engaging and informative experience for users exploring the world of Pokémon.

## Misc

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
