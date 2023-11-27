import userService from "../../src/services/userServices";
import MockUserRepo, { getMockUser } from "../mockUserRepo";

const repository = new MockUserRepo();
const UserServ = new userService(repository);

describe('registerService', () =>{
    test('It should register a new user (admin) successfully', async() =>{
        const reqBody = ({
            username: 'admin',
            password: 'admin',
            role: 'admin',
            Name: 'adminName',
            LastName: 'adminLastName',
        });

        const result = await UserServ.register(reqBody.username,reqBody.password,reqBody.role,reqBody.Name,reqBody.LastName);
        expect(result).toStrictEqual(getMockUser(reqBody.username,reqBody.password,reqBody.role,reqBody.Name,reqBody.LastName));
    })

    test('It should return "Already existing user" if the username is already taken', async() =>{
        const reqBody = ({
            username: 'Nicolas',
            password: 'admin',
            role: 'admin',
            Name: 'adminName',
            LastName: 'adminLastName',
        });

        const result = await UserServ.register(reqBody.username,reqBody.password,reqBody.role,reqBody.Name,reqBody.LastName);
        expect(result).toStrictEqual({error: 'Already existing user.'});
    })
});

describe('loginService',()=>{
    test('It should login a user succesfully', async()=>{
        const reqBody = {
            username: 'admin',
            password: 'admin',
        }

        const result = await UserServ.login(reqBody.username,reqBody.password);
        expect(result).toBeDefined();
    });

    test('It should return "User non existent" if the username does not exist', async()=>{
        const reqBody = {
            username: 'notuser',
            password: 'admin',
        }

        const result = await UserServ.login(reqBody.username,reqBody.password);
        expect(result).toStrictEqual({error: 'User non existent.'})
    });
})


