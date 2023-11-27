import { prisma } from "../index";
import { User, UserStats } from "../models/types";
import UserRepoInterface from "./userRepo.interface";
import bcrypt from 'bcrypt';

class UserRepo implements UserRepoInterface{
    saveUser = async(
        username: string,
        password: string,
        role: string,
        Name?: string,
        LastName?: string,
        ): Promise<User | undefined> => {
        try{
            const hashedPassword = await bcrypt.hash(password,10);
            const user = await prisma.user.create({
                data:{
                    username,
                    password:hashedPassword,
                    role,
                    Name,
                    LastName,
                }
            });
            return user;
        }catch(err){
            console.error(err);
            return;
        }
    }

    verifyPassword = async(password: string, hashedPassword: string): Promise<boolean> =>{
        try {
          // Utiliza bcrypt.compare para verificar si la contraseña es válida
          const validPassword: boolean = await bcrypt.compare(password, hashedPassword);
          return validPassword;
        } catch (error) {
          // Manejo de errores, por ejemplo, puedes registrar el error o lanzar una excepción
          console.error('Error verifying the password', error);
          throw error;
        }
      }

    getUserById = async(id: number): Promise<User | null | undefined> => {
        try{
            const user = await prisma.user.findUnique({where:{id}});
            return user;
        } catch (err){
            console.error(err);
            return;
        }
    }

    getUserByUsername = async (username: string): Promise<User | null | undefined> =>{
        try{
            const user = await prisma.user.findUnique({where: {username}});
            return user;
        }catch(err){
            console.error(err);
            return;
        }
    }

    getUserStats = async(): Promise<UserStats[] | undefined> => {
        try{
            const users= await prisma.user.findMany({
                where:{
                    emailQuota: { gt: 0},
                    lastQuotaEmail: {equals: new Date().toLocaleDateString()},
                },
                select:{
                    id: true,
                    username: true,
                    emailQuota: true,
                    lastQuotaEmail: true,
                },
            });
            return users;
        } catch(err){
            console.error(err);
            return;
        }
    }

    emailQuotaUpdate = async(id: number, newQuota: number): Promise<User | null | undefined> =>{
        try{
            const user = await prisma.user.update({
                where:{id},
                data:{
                    lastQuotaEmail: new Date().toLocaleDateString(),
                    emailQuota: newQuota,
                },
            });
            return user;
        }catch(err){
            console.error(err);
            return;
        }
    };



}

export default UserRepo;
