import React , {useState} from 'react';
export interface peopleState{
    people:{
      id:number
      name:string
      email:string
      title:string
      image_url:string
    }[],
    apiUrl:'http://localhost:3333/'
  }
 