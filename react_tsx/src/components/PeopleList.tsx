import axios from 'axios';
import React, { useEffect, useState }  from 'react';
import { peopleState as Props} from '../interfaces/PeopleInterface';
 interface IProps{
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>,
    people:Props["people"]
}
const PeopleList: React.FC<IProps> =({setPeople, people}) => { 
    useEffect(() => {
         let isCancelled = false
         if(isCancelled == false){
            getPeopleData();
            isCancelled = true
         }

    }, []);
    
    async function getPeopleData() {
          try{
            const res = await axios.get("http://localhost:3333/getPeoples")
            if(res.status == 200){
                console.log(res.data)
                setPeople([
                    ...people,
                    {
                        id:res.data[0].id,
                        name: res.data[0].name,
                        email: res.data[0].email,
                        title: res.data[0].title,
                        image_url: res.data[0].image,
                    }
                ]);
            }
         }catch(error){
    
         }
     }
    async function storePeopleData() {
        try{
            const res = await axios.post("http://localhost:3333/storePeople", {...input})
            if(res.status == 200){
                console.log(res.data)
                setPeople([
                    ...people,
                    {
                        id:res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        title: res.data.title,
                        image_url: res.data.image,
                    }
                ]);
            }
         }catch(error){
    
         }
    }
    async function deleteItemFromBAck(index:number, id:number) {
        try{
            const res = await axios.post("http://localhost:3333/deletePeople", {id:id})
            if(res.status == 200){
                console.log(res.data)
                let arr = people;
                let ix = index;
                // let ix = arr.findIndex(id);
                const noOfRows = [...arr.slice(0, ix), ...arr.slice(ix+1)] ;
                setPeople( noOfRows );
            }
         }catch(error){
    
         }
    }
    async function  editItemOnBack(index:number, id:number) {
        // if(!input.name || !input.email || input.title ) return
        try{
            const res = await axios.post("http://localhost:3333/editPeople", {id:id, input})
            if(res.status == 200){
                console.log(res.data)
                // let arr = people;
                // let ix = index;
                // const noOfRows = [...arr.slice(0, ix), ...arr.slice(ix+1)] ;
                // setPeople( noOfRows );
                // setPeople([
                //     ...people,
                //     {
                //         id:res.data.id,
                //         name: res.data.name,
                //         email: res.data.email,
                //         title: res.data.title,
                //         image_url: res.data.image,
                //     }
                // ]);
            }
         }catch(error){
    
         }
    }
     const [input, setInput] = useState({
        name: "",
        email: "",
        title: "",
        image: ""
    }) 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = () => {
        console.log("hello9 from click")
        // if(!input.name || !input.email || input.title ) return
        storePeopleData()
        setInput({
            name: "",
            email: "",
            title: "",
            image: ""
        })
    }
    const deleteItem =( e:any,person:any, index:number) =>{
        console.log("delete on",e, index)
        var id = -1
        if(person.id) {id = person.id}
        deleteItemFromBAck(index, id )
    }
    const editItem =( e:any,person:any, index:number) =>{
        console.log("edit on",e, person, index)
        var id = -1
        if(person.id) {id = person.id}
        input.name = person.name
        input.email = person.email
        input.title = person.title
        input.image = person.image_url
        setInput({ ...input, name: person.name  })
        setInput({ ...input, email: person.email  })
        setInput({ ...input, title: person.title  })
        setInput({ ...input, image: person.image_url  })
        editItemOnBack(index, id )
    }
    const renderList =():JSX.Element[] =>{
        return people.map((person, index)=>{
            return (
                <div className="col-xl col-md col-sm col-12">
                    <div className="_react_card_content">
                        <div className="_react_card_content_inner">
                            <p>
                            <span className="cross_icon"  onClick={((e) => deleteItem(e, person, index))}   >X &nbsp; </span>
                            <a href="#_inputs"> 
                            <span  onClick={((e) => editItem(e, person, index))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M41.4853 13.4853L34.4142 6.41421C33.6332 5.63317 32.3668 5.63316 31.5858 6.41421L14.6153 23.3848L24.5147 33.2842L41.4853 16.3137C42.2663 15.5327 42.2663 14.2663 41.4853 13.4853ZM21.7995 34.8116L13.0879 26.1L9.66548 38.234L21.7995 34.8116Z" fill="black"/>
                                </svg>
                            </span>
                            </a>
                            </p>
                        
                        
                       
                        
                            <div className="_react_card_img_wrap">
                                <img src={person.image_url} alt="Image" className="_react_card_img"/>
                            </div>
                            <div className="_react_card_txt">
                                <h3 className="_react_card_name">{ person.name }</h3>
                                <p className="_react_card_email">{person.email}</p>
                                <h4 className="_react_card_title">{person.title}</h4>
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
            )
        })
    }
    return (
        <div>
            <div id="_inputs"  className="_react_form_wrapper">
                <div className="_react_form_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-7 col-md-12 col-sm-12 mx-auto">
                                <div className="_react_form_content">
                                    <div className="_react_form_content_inner" >
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="name"   
                                                onChange={handleChange}
                                                name="name"
                                                value={input.name}
                                                placeholder="Name"/>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="name" className="form-label">Email</label>
                                                <input type="text" className="form-control" id="email" onChange={handleChange}
                                                name="email" placeholder="Email"
                                                value={input.email} />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="name" className="form-label">Title</label>
                                                <input type="text" className="form-control" id="title" onChange={handleChange}
                                                name="title" placeholder="Title"
                                                value={input.title}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="name" className="form-label">Image Url</label>
                                                <input type="text" className="form-control" id="image" onChange={handleChange}
                                                name="image" placeholder="Image URL"
                                                value={input.image}/>
                                            </div>
                                            <div className="col-3 mx-auto">
                                                
                                                 <button  type="submit"  onClick={handleClick} className="btn btn-primary d-block w-100 py-2">Add +</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="_react_card_wrapper">
                <div className="_react_card_wrap">
                    <div className="container">
                        <div className="_react_card_content_wrap">
                             
                            <div className="row">
                            {renderList()}
                                <div className="col-xl col-md col-sm col-12">
                                    <div className="_react_card_content">
                                        <div className="_react_card_content_inner">
                                            <div className="_react_card_img_wrap">
                                                <img src="http://image4.photobiz.com/728/7_20200317225907_11115505_large.jpg" alt="Image" className="_react_card_img"/>
                                            </div>
                                            <div className="_react_card_txt">
                                               <h3 className="_react_card_name">Mitchel Clark</h3>
                                                <p className="_react_card_email">mclark@gmail.com</p>
                                                <h4 className="_react_card_title">Marketing</h4>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-xl col-md col-sm col-12">
                                    <div className="_react_card_content">
                                        <div className="_react_card_content_inner">
                                            <div className="_react_card_img_wrap">
                                                <img src="http://image4.photobiz.com/728/7_20200317225907_11115505_large.jpg" alt="Image" className="_react_card_img"/>
                                            </div>
                                            <div className="_react_card_txt">
                                               <h3 className="_react_card_name">Mitchel Clark</h3>
                                                <p className="_react_card_email">mclark@gmail.com</p>
                                                <h4 className="_react_card_title">Marketing</h4>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-xl col-md col-sm col-12">
                                    <div className="_react_card_content">
                                        <div className="_react_card_content_inner">
                                            <div className="_react_card_img_wrap">
                                                <img src="http://image4.photobiz.com/728/7_20200317225907_11115505_large.jpg" alt="Image" className="_react_card_img"/>
                                            </div>
                                            <div className="_react_card_txt">
                                               <h3 className="_react_card_name">Mitchel Clark</h3>
                                                <p className="_react_card_email">mclark@gmail.com</p>
                                                <h4 className="_react_card_title">Marketing</h4>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-xl col-md col-sm col-12">
                                    <div className="_react_card_content">
                                        <div className="_react_card_content_inner">
                                            <div className="_react_card_img_wrap">
                                                <img src="http://image4.photobiz.com/728/7_20200317225907_11115505_large.jpg" alt="Image" className="_react_card_img"/>
                                            </div>
                                            <div className="_react_card_txt">
                                               <h3 className="_react_card_name">Mitchel Clark</h3>
                                                <p className="_react_card_email">mclark@gmail.com</p>
                                                <h4 className="_react_card_title">Marketing</h4>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>      
    )

}
export default PeopleList