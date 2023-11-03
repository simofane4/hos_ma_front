import { formatDate } from "@angular/common";
{
  "id": 1,
  "user": {
      "id": 2,
      "email": "apalmer@palmer.com",
      "password": "pbkdf2_sha256$320000$NSJruAkhXEVZWYr9BrwRE4$91T00UwyrwPRoAn7n1WeoPxJbsTs42uBg9/iE1Kx2MU=",
      "last_login": null,
      "is_superuser": false,
      "username": "apalmer",
      "first_name": "Amanda",
      "last_name": "Palmer",
      "is_staff": false,
      "is_active": true,
      "date_joined": "2023-10-29T12:47:01.981070Z",
      "role": "doctor",
      "groups": [],
      "user_permissions": []
  },
  "img": "/media/doctor/default.png",
  "inp": "82444291",
  "gender": "Female",
  "phone": "001-662-810-4269",
  "address": "3851 York Key Suite 334\nOrtegafurt, AS 50894",
  "cabinet": 1,
  "specialiste": 38
}


export class User {

  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;

  constructor(user){{
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.role = user.role;

  }}
  
}







export class Doctors {
  id: number;
  user: User;
  img: string;
  inp: string;
  gender: string;
  date: string;
  specialization: string;
  phone: string;
  department: string;
  degree: string;


  
  constructor(doctors) {
    {
      this.id = doctors.id || this.getRandomID();
      this.img = doctors.avatar || "assets/images/user/user1.jpg";
      this.inp = doctors.name || "";
      this.gender = doctors.email || "";
      this.date = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.specialization = doctors.specialization || "";
      this.phone = doctors.mobile || "";
      this.department = doctors.department || "";
      this.degree = doctors.degree || "";
    }
  }



  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
