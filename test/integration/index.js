var should = require('should'),
    Browser = require('zombie'),
    browser = new Browser(),
    baseUrl = 'http://localhost:8080/';
    
describe('Loads pages', function(){

  it('should load the front page', function(done){
    browser.visit(baseUrl, function () {
      browser.text('title').should.equal("It's Full of Stars!");
      done();
    });
  });

});

describe('Login', function(){

  it('should log a user in', function(done){
    browser.visit(baseUrl, function () {
      browser.
        fill('email', 'Keith').
        fill('password', 'secret').
        pressButton('Login', function(err, browser) {
          // Test goes here
          done();
        });  
    });
  });

});

describe('Admin', function(){
  console.log(baseUrl + 'admin')

  it('should log a user in', function(done){
    browser.visit(baseUrl + 'admin', function () {
      browser.text('table').should.include('System Name') 
      done();
    });
  });

});

    

// Load the page from localhost
// var zombie = new Zombie();

// Zombie.visit("http://localhost:8080/", function (err, browser) {
// 
//   // Make sure we have a title.
//   assert.equal(browser.text("title"), "It's Full of Stars!");
// 
//   // Make sure we have an element with the ID content.
//   // You can use any css3 selector to get the element
//   assert.ok(browser.query("#content"));
//   
//   // Make sure we have an element h1 within #content
//   assert.ok(browser.html("#content h1"));
//   
//   // Make sure the h1 element has the correct text
//   assert.equal(browser.text("#content h1"), "Planets");
//   
// });
// 
// 
// Zombie.visit("http://localhost:8080/", function (err, browser) {
// 
//   // Make sure the browser request is successful (200)
//   assert.ok(browser.success);
// 
//   // Make sure we have a title.
//   assert.equal(browser.text("title"), "It's Full of Stars!");
// 
//   // Make sure we have an element with the ID content.
//   // You can use any css3 selector to get the element
//   assert.ok(browser.query("#content"));
//   
//   // Make sure we have an element h1 within #content
//   assert.ok(browser.html("#content h1"));
//   
//   // Make sure the h1 element has the correct text
//   assert.equal(browser.text("#content h1"), "Planets");
//   
// });
// 
// // Make sure mars works
// Zombie.visit("http://localhost:8080/planets/hoth", function (err, browser) {
//   // Make sure the browser request is successful (200)
//   assert.ok(browser.success);
// 
//   // Make sure we have an element with the ID content.
//   assert.ok(browser.query("#content"));
//   
//   // Make sure we have an element h1 within #content
//   assert.ok(browser.html("#content h1"));
//   
//   // Make sure the h1 element has the correct text
//   assert.equal(browser.text("#content h1"), "Hoth");
//   
// });
// 
// // Make sure saturn works
// Zombie.visit("http://localhost:8080/planets/saturn", function (err, browser) {
// 
//   // Make sure the browser request is successful (200)
//   assert.ok(browser.success);
//   
//   // Make sure the h1 element has the correct text
//   assert.equal(browser.text("#content h1"), "saturn is not a planet.");
//   
// });

