var Browser = require("zombie");
var assert = require("assert");

// Load the page from localhost
// var browser = new Browser();

Browser.visit("http://localhost:8080/", function (e, browser) {

  // Make sure the browser request is successful (200)
  assert.ok(browser.success);

  // Make sure we have a title.
  assert.equal(browser.text("title"), "Welcome To Brains Depot");

  // Make sure we have an element with the ID content.
  assert.ok(browser.query("#content"));
  
  // Make sure we have an element with the ID content.
  assert.ok(browser.query("#content"));
  
  // Make sure we have an element h1 within #content
  assert.ok(browser.html("#content h1"));
  
  // Make sure the h1 element has the correct text
  assert.equal(browser.text("#content h1"), "Hello World!");
  
});

// Make sure mars works
Browser.visit("http://localhost:8080/planets/mars", function (e, browser) {

  // Make sure the browser request is successful (200)
  assert.ok(browser.success);

  // Make sure we have an element with the ID content.
  assert.ok(browser.query("#content"));
  
  // Make sure we have an element with the ID content.
  assert.ok(browser.query("#content"));
  
  // Make sure we have an element h1 within #content
  assert.ok(browser.html("#content h1"));
  
  // Make sure the h1 element has the correct text
  assert.equal(browser.text("#content h1"), "Hello mars");
  
});

// Make sure saturn works
Browser.visit("http://localhost:8080/planets/saturn", function (e, browser) {

  // Make sure the browser request is successful (200)
  assert.ok(browser.success);
  
  // Make sure the h1 element has the correct text
  assert.equal(browser.text("#content h1"), "Hello saturn");
  
});

