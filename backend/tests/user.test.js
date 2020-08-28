const app = require("../Routes/userRoutes")
const request = require("supertest")
let user
describe('Post Endpoints', () => {
    it('should create a new post', async () => {
      const resp = await request(app)
        .post('/user/register')
        .send({
            name: "mohit",
            email: "mohitdaswanii@gmail.com",
            password: "qwerty123",
            phoneNo:7974863618
        })
      expect(resp.statusCode).toEqual(201)
    })
})
// describe('Post Endpoints', () => {
//     it('should create a new post', async (done) => {
//         const response = await request(app)
//         .post("/user/login")
//         .set('Accept', 'application/json')
//         .send({
//             name: "mohit",
//             email: "mohitdaswanii@gmail.com",
//             password: "qwerty123",
//             phoneNo:7974863618
//         })
//         expect('Content-Type', /json/)
//         expect(201)
//         done()
//   })
//     test('should login', async (done) => {
//         const response = await request(app)
//         .post("/user/login")
//         .set('Accept', 'application/json')
//         .send({
//             email: "mohitdaswanii@gmail.com",
//             password: "qwerty123"
//         })
//         expect('Content-Type', /json/)
//         expect(201)
//         done()
//     })
//     test('should logout', async (done) => {
//         const response = await request(app)
//         .delete("/user/logout/:userToken")
//         .expect('Content-Type', /json/)
//         .expect(200)
//         done()
//     })
// })