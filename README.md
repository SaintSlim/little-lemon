# Table of Contents

- [Table of Contents](#table-of-contents)
- [The Booking App](#the-booking-app)
- [Setup and Evaluation](#setup-and-evaluation)
- [Architecture](#architecture)
  - [Folder Structure](#folder-structure)
  - [Component Architecture](#component-architecture)
  - [Naming Conventions](#naming-conventions)
  - [Use of Dependencies](#use-of-dependencies)
  - [Data Fetching](#data-fetching)
  - [Unit Testing](#unit-testing)
- [Future Considerations](#future-considerations)
- [Honour Code](#honour-code)

---

# The Booking App

This Booking App was created as the final capstone project of the **Meta React-Native Certification**.

**Preview**: Little Lemon is a family-owned Mediterranean restaurant that blends traditional recipes with a modern twist. Our goal is to provide our customers with a unique dining experience that will take them on a culinary journey through the Mediterranean.

**Instructions Received**: To create a modern responsive mobile app for the Little Lemon restaurant with a food ordering and onboarding flow feature which they lack at present.

---

# Setup and Evaluation

```s
# Run in the Terminal
git clone https://github.com/jayantasamaddar/little-lemon-meta-frontend-capstone.git folder

# Install Dependencies
npm install

# Launch app in ios and or android emulator or expo go
npx expo start

# Run Tests
npm test


---

#Architecture

There were several considerations for the react-native architecture.

1. **Folder Structure** - How would the files be organized in the `src` folder.
2. **Component Architecture** - How best to write reusable components.
3. **Naming Conventions** - How and why StyleSheet styles structure, CSS Variables are named so.
4. **Use of Dependencies** - Choice on what dependencies to use.
5. **Data Fetching** - How we will manage the data used by the app.
6. **Unit Testing** - How to have good coverage in our unit tests.

---

## Folder Structure

Separate folders for:

- **components**: For individual components. Complex components have nested `components` folder. The component folder has 4 files usually (some components are auto-tested without having to create a separate test file. Thus a single folder inside the `components` folder is all inclusive as a single Unit having the Renderer, the stylesheet and the unit test.

  - `Component.js` (The Component)
  - `styles.js` (The stylesheet)
  - `index.js` (For exporting the component)
  - `Component.test.js` (Test file for the component)

- **pages**: Single Pages in the application that have a collection of these components laid out in different ways. The individual pages in the `pages` folder, may further optionally have a `components` (which represent sections, e.g. `Testimonials`) and optionally, a `pages` (for nested pages) folder in them.

- **context**: Contains Context Providers and basic hooks to access the Context data.
- **hooks**: Hooks unrelated to context. E.g. `useWindowResize` to track resizing the window.
- **actions**: Reducer function and initial states (and any hooks related to them)
- **utilities**: Utility functions. E.g. `validateEmail`.

**The directory tree** (only directories and excluding `node_modules` and `coverage`):

```s
    ├── assets
    ├── components
    │   ├── Avatar
    │   ├── CategoryItem
    │   ├── MenuItem
    │   ├── ProfileHeader
    ├── AuthProvider
    ├── hooks
    ├── screens
    │   ├── Onboarding
    |   ├── Home
    │   └── Profile
    ├── database
    └── utilities
        └── tests
```

---

## Component Architecture

There following Design Patterns have been followed:

- Most components are single units of functional code.
- In case of complex components that are comprised of components that can be used standalone, they were broken into separate components. The folder structure above explains where they reside.

- Where responsibility needed to be isolated, it was done: E.g. Table ([read more]('./src/components/../../../src/components/Table/README.md')).

- The **`Stack`** and **`Table`** elements, **OPTIONALLY** also have the **[Composite Components pattern](https://betterprogramming.pub/compound-component-design-pattern-in-react-34b50e32dea0)**. It allows some more flexibility as explained in the Table documentation above.

  **Example**:


---

## Naming Conventions

The naming convention followed are:


---

## Use of Dependencies

This project was developed with the expo and largely dependednt on many in-built expo dependencies that simplified the project  .

- react navigation.
- lodash.debounce
- expo/image-picker
- Font Awesome has been used for the icons.
- expo sqlite

---

## Data Fetching

A lot of data is retrieved from a dedicated endpoint provided by the course available.

---

## Unit Testing

Unit Testing has been done with the help of React Testing Library and Jest.

- The `setupTests.js` have been modified, so that we can interact with the window global object.
- Mocks for React hooks have been done throughout within the components itself. Mocks for `useContext`, `dispatch` function of the `useReducer` have all been covered.
- The unit tests can be found in each of the component and page folders.

---
## Future Considerations


# Honour Code

This demo project is solely done by me, Samuel Ilunga. You can contact me on **[GitHub](https://www.github.com/SaintSlim)** for interesting projects to work on.
