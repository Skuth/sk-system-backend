import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity("lanches")
export default class Lanche {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  image: string

  @Column()
  category_id: number

}
