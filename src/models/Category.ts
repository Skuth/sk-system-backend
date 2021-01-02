import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("categories")
export default class Categories {
  @PrimaryGeneratedColumn("increment")
  id: number
  
  @Column()
  name: string
}
