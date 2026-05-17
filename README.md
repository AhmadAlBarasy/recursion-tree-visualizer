# About this project

This is a fully vibe-coded single-page application built using `React`. It allows you to select one of many well-known recursive algorithms, specify its input parameters, and then interactively simulate its recursive stack step-by-step by visualizing it using a dynamic tree structure built using `React Flow`.

When the simulation starts, the application pre-computes the simulation steps, where each step is represented by a `SimulationStepNode`, and inserts them into a doubly linked list structure, which allows you to either run the simulation automatically or navigate back and forth through the call stack manually using a playback controller.

Currently, it only supports three recursive algorithms: `fibonacci`, `factorial`, and `binarySearch`.

# Contributing to the Project

If you are interested in extending this project, all contributions are welcome! Here are some cool suggestions I would add if I had more time to work on this project, but I believe I've reached a point where I'm satisfied with what I built, and now it's time to work on something else :>

- **Return Value Animation:** Adding an animation on the edge between the about-to-be-deleted node and its parent, with the return value moving from the child to the parent
- **Custom User Code Visualizer:** Letting users paste their own custom JavaScript recursive functions into a text area, parsing the input string into an Abstract Syntax Tree (AST), and dynamically extracting the execution steps so they can visualize any recursive logic they write on the fly

# Getting Started
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`

The app is available to try on [GitHub Pages](https://ahmadalbarasy.github.io/recursion-tree-visualizer)
