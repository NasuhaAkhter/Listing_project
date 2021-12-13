import React , {useState} from 'react';
export interface peopleState{
    people:{
      id:number
      name:string
      email:string
      title:string
      image_url:string
      isEdit?:number 
    }[],
    apiUrl:'http://localhost:3333/'
  }
 