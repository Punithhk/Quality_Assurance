const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({surname:'Colombo'})
        .end(function (err, res) {
           assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(
        res.body.name,
        'Cristoforo',
        'res.body.name should be "Christoforo"'
      );
      assert.equal(
        res.body.surname,
        'Colombo',
        'res.body.surname should be "Colombo"'
      );
          done();
        });
    }); 
    // #4
  test('send {surname: "da Verrazzano"}', function (done) {
      chai
    .request(server)
    .put('/travellers')
    .send({ surname: 'da Verrazzano', name:'Giovanni' })
    /** place your tests inside the callback **/
    .end(function(err, res) {
      assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(res.body.name, 'Giovanni');
      assert.equal(res.body.surname, 'da Verrazzano');

      done();
    });
  });
});
});


const Browser = require("zombie");
Browser.site="https://boilerplate-mochachai.punithh.repl.co";
//Browser.localhost('example.com', process.env.PORT || 3000);

suite("Functional Tests with Zombie.js", function () {

  const browser= new Browser();
  suiteSetup(function(done) {
  return browser.visit('/', done);
  });
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton("submit", function () {
      // assert that status is OK 200
    browser.assert.success();
    // assert that the text inside the element 'span#name' is 'Cristoforo'
    browser.assert.text('span#name', 'Cristoforo');
    // assert that the text inside the element 'span#surname' is 'Colombo'
    browser.assert.text('span#surname', 'Colombo');
    // assert that the element(s) 'span#dates' exist and their count is 1
    browser.assert.element('span#dates', 1);

        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
    browser.fill("surname","Vespucci").pressButton("submit",
    function(){
      browser.assert.success();
      browser.assert.text("span#name","Amerigo");
      browser.assert.text("span#surname","Vespucci");
      browser.assert.element("span#dates",1);

      done();
    });
    });
  });
});
