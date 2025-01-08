import { Injectable } from "@angular/core";
import { User } from "../../interfaces/User";


@Injectable({  providedIn: 'root'})
export class UserService {
    public async getUsers(): Promise<User[] | undefined> {
        let returnvalue: User[] | undefined = undefined;
        await fetch("http://localhost:3000/api/user").then( data => data.json())
        .then( (users) => {
            returnvalue = users;
        })
        return returnvalue;
    }
}
