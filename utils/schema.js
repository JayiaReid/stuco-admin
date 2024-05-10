import {char, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const GRADES=mysqlTable('grades',{
    grade_id:int('grade_id'),
    grade: varchar('grade', {length:40}).primaryKey(),
    level_ID:int('level_ID').notNull()
});

export const LEVELS=mysqlTable('levels',{
    level_ID:int('level_ID').primaryKey().autoincrement(),
    level_name:varchar('level_name',{length:50}).unique()
})

export const STUDENT=mysqlTable('students',{
    stud_ID:int('stud_ID').primaryKey(),
    fname:varchar('fname', {length:50}).notNull(),
    lname:varchar('lname', {length:50}).notNull(),
    email:varchar('email', {length:100}).notNull().unique(),
    // user_ID:int('user_ID').notNull().unique(),
    sch_ID:int('sch_ID').primaryKey(),
    passwrd:varchar('passwrd',{length:20}).notNull(),
    grade:varchar('grade',{length: 40})
})

export const SCHOOL=mysqlTable('schools',{
    sch_ID:int('sch_ID').primaryKey().autoincrement(),
    sch_name:varchar('sch_name',{length:100}).notNull(),
    level_ID:int('level_ID').notNull(),
    region:char('region',{length:2}).notNull(),
    country:char('country',{length:3})
})