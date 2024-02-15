import { Post } from "src/post/entities/post.entity";
import { Entity, PrimaryGeneratedColumn,Column, OneToMany, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    email: string;
    @Column({select : false})
    password: string;
    @Column()
    profilePic: string;
    @OneToMany(() => Post, post => post.user)
    posts: Post[];
    @BeforeInsert()
    hashPassword(): void {
        this.password= bcrypt.hashSync(this.password, 10);
    }

}
