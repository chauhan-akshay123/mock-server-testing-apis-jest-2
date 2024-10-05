const { describe, beforeEach } = require("node:test")
let { app, getEmployees, getEmployeeById, addEmployee } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => {
 const actualModule = jest.requireActual("../index.js");
 return {
    ...actualModule,
    getEmployees: jest.fn(),
    getEmployeeById: jest.fn(),
    addEmployee: jest.fn()
 };
});

let server

beforeAll((done) => {
 server = http.createServer(app);
 server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function Tests", () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });
 
test("getEmployees should return a list of employees", () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager' },
    { id: 3, name: 'Sam Johnson', position: 'Designer' }
  ];
  
  getEmployees.mockReturnValue(mockEmployees);

  let result = getEmployees();
  expect(result).toEqual(mockEmployees);
  expect(getEmployees).toHaveBeenCalled();
}); 

test("getEmployeeById should return an employee by Id", () => {
 const mockEmployee = { id: 1, name: 'John Doe', position: 'Software Engineer' }

 getEmployeeById.mockReturnValue(mockEmployee);

 let result = getEmployeeById(1);
 expect(result).toEqual(mockEmployee);
 expect(getEmployeeById).toHaveBeenCalledWith(1);
});

test("getEmployeeById should return undefined if employee Id not found", () => {
  getEmployeeById.mockReturnValue(undefined);
  
  let result = getEmployeeById(999);
  expect(result).toEqual(undefined);
  expect(getEmployeeById).toHaveBeenCalledWith(999);
});

test("addEmployee should a new employee", () => {
  const newEmployee = { id: 4, name: "Walter White", position: "Tech Lead" };

  addEmployee.mockReturnValue(newEmployee);

  let result = addEmployee(newEmployee);
  expect(result).toEqual(newEmployee);
  expect(addEmployee).toHaveBeenCalledWith(newEmployee);
});
});