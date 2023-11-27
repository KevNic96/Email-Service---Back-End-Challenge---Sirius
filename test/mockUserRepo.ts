import { User,UserStats } from "../src/models/types";
import UserRepoInterface from "../src/repositories/userRepo.interface";

export const getMockUser =( username: string,
  password: string,
  role: string,
  Name: string,
  LastName: string) =>{
    const newUser: User = new User(1,role,username,password,Name,LastName, new Date("11/11/2023"), new Date("11/11/2023"), 0, "");
    return  newUser;
  }

class MockUserRepo implements UserRepoInterface {
  saveUser(
    username: string,
    password: string,
    role: string,
    Name: string,
    LastName: string
  ): Promise<User | undefined> {
    return Promise.resolve(getMockUser(username,password,role,Name,LastName));
  }
  /*

  verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try{
      const validPassword:boolean=await bcrypt.compare(password,hashedPassword);
      return validPassword;
    }catch(error){
      console.error('Error verifying the password', error);
      throw error;
    }
  }
  */

  getUserById(id: number): Promise<User | null | undefined> {
    if (id === 1) {
      const newUser: User = new User(1,"testRole","testUser","pass","TestName","LastNameTest", new Date(), new Date(), 0, "");
      return Promise.resolve(newUser);
    } else {
      return Promise.resolve(null);
    }
  }

  getUserByUsername(username: string): Promise<User | null | undefined> {
      if(username ==="Nicolas"){
        const newUser: User = new User(1,"admin",username,"password","TestName","LastNameTest", new Date(), new Date(), 0, "");
        return new Promise((resolve) =>{
            resolve(newUser)
        })
    }
    else return new Promise((resolve) =>{
      resolve(undefined);
    })
  }

  getUserStats(): Promise<UserStats[] | undefined> {
      const userStats: UserStats[] = [
        {
            id:1,
            username: "testUser1",
            emailQuota: 10,
            lastQuotaEmail: "lastEmail1@example.com",
        },
        {
            id: 2,
            username: "testUser2",
            emailQuota: 5,
            lastQuotaEmail: "lastEmail2@example.com",
        }
      ];

      return Promise.resolve(userStats);
  }

  emailQuotaUpdate(id: number, newQuota: number): Promise<User | null | undefined> {
      if( id===1){
        const existingUser: User = new User(
            1,
            "testRole",
            "testUser",
            "pass",
            "TestName",
            "LastNameTest",
            new Date(),
            new Date(),
            0,
            "",
        );

        existingUser.emailQuota=newQuota;

        return Promise.resolve(existingUser);
      }else{
        return Promise.resolve(null);
      }
  }

}

export default MockUserRepo;
