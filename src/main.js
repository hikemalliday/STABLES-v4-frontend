// READ ME:
// Incase I ever want to re-enable the JWT, I commented out the logic for the routes, and simply moved the 'next()''s to the top of the blocks

import { createApp } from "vue";
import Main from "./Main.vue";
import "./assets/tailwind.css";
import router from "./router";

const main = createApp(Main);

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("jwtToken");
  console.log(token);

  if (to.path === "/") {
    // next("/app");
    // Check if the token is valid or not
    console.log("path to / debug");
    if (token && (await isValidToken(token))) {
      console.log("first condition, next(app)");
      next("/app"); // Redirect to the '/app' route
    } else {
      console.log("first condition, next(login)");
      next("/login"); // Redirect to the '/login' route
    }
  } else if (to.path === "/app") {
    //next();
    // Check if the token is valid or not
    if (token && (await isValidToken(token))) {
      console.log("second condition, next ())");
      next(); // Proceed to the '/app' route
    } else {
      console.log("second condition, next(login");
      next("/login"); // Redirect to the '/login' route
    }
  } else if (to.path === "/login") {
    //next("/app");
    // Check if the token is already present
    if (token && (await isValidToken(token))) {
      console.log("test debug");
      next("/app"); // Redirect to the '/app' route
    } else {
      console.log("test second to last else");
      next(); // Proceed to the '/login' route
    }
  } else {
    console.log("test final else");
    next(); // Proceed to other routes
  }
});

async function isValidToken(token) {
  // Perform token validation logic here, e.g., make an API request to validate the token
  // Return a boolean indicating whether the token is valid or not
  try {
    const response = await fetch("http://localhost:8000/istokenvalid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("Token is valid");
      return true;
    } else {
      console.log("Token is invalid else statement inside func");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

main.use(router);
main.mount("#main");
// The tutorial has us cut this out:
// createApp(App).mount('#app')
