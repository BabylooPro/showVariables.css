# showVariables.css



https://user-images.githubusercontent.com/35376790/235320870-e6fd0205-1503-42fd-b9a2-ffb384ff9136.mov



## CSS Variable-based Card Creation Project

This repository contains a JavaScript for creating HTML cards with information extracted from CSS variables `:root`.

### Features

*   Creating HTML cards from CSS variables
*   Handling various categories of CSS variables (color, font-family, font-weight, font-size, border, shadow)
*   Adapting text and styles according to CSS variables
*   Displaying cards within an HTML container

### How to use

1.  Clone the repository
2.  Open the `index.html` file in your browser
3.  Cards with the information from the CSS variables will be generated automatically
4.  Add your `:root` palette in [root.css](root.css) & modify [root.json](root.json)

### Main code

The main file of this project is [script.js](script.js). Here's an overview of what each function does in this file:

*   `createCard(variable)`: Creates an HTML card with information extracted from a CSS variable.
*   `colorIsLight(color)`: Checks if a color is light or dark.
*   `fetch("root.json")`: Fetches JSON data containing categories and CSS variables from an external file.

### Example JSON data

The `root.json` file contains information about categories and CSS variables. Here's an example structure for this file:

```
{
  "categories": [
    {
      "title": "Colors",
      "variables": [
        { "name": "--primary-color", "type": "color" }
      ]
    }
  ]
}
```
