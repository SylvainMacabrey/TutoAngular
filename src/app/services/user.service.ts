import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { StaticSymbolResolver } from '@angular/compiler';

export class UserService {

    private users: User[] = [
        {
            firstname: 'Sylvain',
            lastname: 'Macabrey',
            email: 'sylvain.macabrey@gmail.com',
            drinkPreference: 'Coca',
            hobbies: ['sport', 'jeux vidéo']
        }
    ];
    userSubject = new Subject<User[]>();

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUsers()
    }

}
