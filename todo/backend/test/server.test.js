//when using the test db
// process.env.NODE_ENV = "test";

//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// Test create todo
describe("/post   /", () => {
  it("Should get created todo", done => {
    chai
      .request(server)
      .post("/")

      //////////////////////
      .send({
        dueDate: new Date("2019-08-20T10:00:00Z"),
        todoText: "test todo-*-☠☠☠☠☠☠--*",
        byUserEmail: "user@gmail.com",
        assignee: "george@wdev247.com"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property("SEQUENCE");
        res.body.should.have.property("todoText");
        res.body.should.have.property("dueDate");
        res.body.should.have.property("urlId");
        res.body.should.have.property("lastUpdate");
        res.body.should.have.property("_id");
        res.body.should.have.property("byUserEmail");
        res.body.should.have.property("subToDos");
        res.body.should.have.property("comments");
        done();
      });
  });
});

// Test edit todo
describe("/put   /", () => {
  it("Should get edited todo", done => {
    chai
      .request(server)
      .put("/")

      //////////////////////
      .send({
        _id: "5d5935edf3edda4720a6ddc7",
        SEQUENCE: 2,
        dueDate: new Date("2019-08-20T10:00:00Z"),
        todoText: "test squence-*-❀❀❀❀--*",
        byUserEmail: "user@gmail.com",
        assignee: "george@wdev247.com",
        urlId: "1uPZoP5JZ",
        subToDos: [],
        comments: [],
        lastUpdate: new Date("2019-08-18T11:26:37.977Z")
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property("SEQUENCE");
        res.body.should.have.property("todoText");
        res.body.should.have.property("dueDate");
        res.body.should.have.property("urlId");
        res.body.should.have.property("lastUpdate");
        res.body.should.have.property("_id");
        res.body.should.have.property("byUserEmail");
        res.body.should.have.property("subToDos");
        res.body.should.have.property("comments");
        done();
      });
  });
});
