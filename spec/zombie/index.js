var Zombie = require("zombie");
var assert = require("assert");

// Load the page from localhost
// var zombie = new Zombie();

Zombie.visit("http://localhost:8080/", function (e, browser) {

  // Make sure the browser request is successful (200)
  assert.ok(browser.success);

  // Make sure we have a title.
  assert.equal(browser.text("title"), "Welcome To Brains Depot");

  // Make sure we have an element with the ID content.
  // You can use any css3 selector to get the element
  assert.ok(browser.query("#content"));
  
  // Make sure we have an element h1 within #content
  assert.ok(browser.html("#content h1"));
  
  // Make sure the h1 element has the correct text
  assert.equal(browser.text("#content h1"), "Planets");
  
});

// Make sure mars works
Zombie.visit("http://localhost:8080/planets/hoth", function (e, browser) {

  // Make sure the browser request is successful (200)
  assert.ok(browser.success);

  // Make sure we have an element with the ID content.
  assert.ok(browser.query("#content"));
  
  // Make sure we have an element h1 within #content
  assert.ok(browser.html("#content h1"));
  
  // Make sure the h1 element has the correct text
  assert.equal(browser.text("#content h1"), "Hoth");
  
});

// Make sure saturn works
Zombie.visit("http://localhost:8080/planets/saturn", function (e, browser) {

  // Make sure the browser request is successful (200)
  assert.ok(browser.success);
  
  // Make sure the h1 element has the correct text
  assert.equal(browser.text("#content h1"), "saturn is not a planet.");
  
});

