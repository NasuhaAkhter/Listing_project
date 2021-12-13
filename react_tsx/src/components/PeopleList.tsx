import axios from 'axios';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { SyntheticEvent, useEffect, useState }  from 'react';
import { peopleState as Props} from '../interfaces/PeopleInterface';
import { validateFileSize } from '../service/fileValidatorService'
import { info } from 'console';
import ReactDOM from 'react-dom';

 interface IProps{
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>,
    people:Props["people"],
 
 }
const PeopleList: React.FC<IProps> =({setPeople, people}) => { 
    // var [isEdit ,setIsEdit] = useState<Boolean>(false)
    var isEdit = false

    const [input, setInput] = useState({
         id:-1,
        index:-1,
        name: "",
        email: "",
        title: "",
        image: ""
    })
    const [fileList, setFileList] = useState< {
        response: any,
        status: string,
        name: string,
    }[] >([{
        response: null,
        status: '',
        name: '',
    }]) 
    const props = {
        name: 'file',
        action: 'http://localhost:3333/uploadFile',
        headers: {
            authorization: 'authorization-text',
        }
    };
    const onInputChange = (info: { file: { status: string; name: any; response:{} }; fileList: any; }) => {
        console.log(info, "info")
        if(info.file && info.file.status == "done"){
            let ob ={
                response:info.file.response,
                status: info.file.status,
                name: info.file.name
            }
            console.log(ob, "Object")
            setFileList( [ ...fileList ,ob]);
            console.log("fileList1",fileList[1] )
        }

    };
    const [uploadFormError , setUploadFormError] = useState<string>('')
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
                let ob = {
                            id:res.data.id,
                            name: res.data.name,
                            email: res.data.email,
                            title: res.data.title,
                            image_url: res.data.image,
                        }
                 setPeople( [ob,...people] )
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
        
        try{
            const res = await axios.post("http://localhost:3333/editPeople", {id:id, input})
            if(res.status == 200){
                console.log(res.data)
                let prev = people[index]
                prev.name = input.name
                prev.title = input.title
                prev.email = input.email
                prev.image_url = input.image
                let arr = people 
                const updatedData = [...arr.slice(0, index), Object.assign({}, arr[index], prev), ...arr.slice(index + 1)]
                setPeople(updatedData)
            }
         }catch(error){
    
         }
         
    }
      
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
             id:-1,
            index:-1,
            name: "",
            email: "",
            title: "",
            image: ""
        })
    }
    const updateItem = () => {
    }
    const deleteItem =( e:any,person:any, index:number) =>{
        console.log("delete on",e, index)
        var id = -1
        if(person.id) {id = person.id}
        deleteItemFromBAck(index, id )
    }
    const editItem =( e:any,person:any, index:number) =>{
        isEdit = true
        let prev = people[index]
        prev.isEdit = 1
        let arr = people 
        const updatedData = [...arr.slice(0, index), Object.assign({}, arr[index], prev), ...arr.slice(index + 1)]
        setPeople(updatedData)
        console.log(prev , "updated data" , ...people)
       
        var id = -1
        if(person.id) {id = person.id}
         input.id = person.id
        input.index = index
        input.name = person.name
        input.email = person.email
        input.title = person.title
        input.image = person.image_url
        setInput({ ...input, id: person.id  })
        setInput({ ...input, name: person.name  })
         setInput({ ...input, index: index  })
        setInput({ ...input, email: person.email  })
        setInput({ ...input, title: person.title  })
        setInput({ ...input, image: person.image_url  })
         
    }
    const uploadFile= async (element:HTMLInputElement)=>{
        console.log(element.files)
        let  file = element.files
        if(file === null) return
        const validFileSize = await validateFileSize(file[0].size)
        if( !validFileSize.isValid){
            setUploadFormError(validFileSize.errorMessage)
        }
    }
    const renderList =():JSX.Element[] =>{
        return people.map((person, index)=>{
            return (
                <div className="col-xl col-md col-sm col-12">
                    <div className="_react_card_content">
                        <div className="_react_card_content_inner">
                            <p>
                            <span className="cross_icon"  onClick={((e) => deleteItem(e, person, index))}   >X &nbsp; </span>
                            
                            <span  onClick={((e) => editItem(e, person, index))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M41.4853 13.4853L34.4142 6.41421C33.6332 5.63317 32.3668 5.63316 31.5858 6.41421L14.6153 23.3848L24.5147 33.2842L41.4853 16.3137C42.2663 15.5327 42.2663 14.2663 41.4853 13.4853ZM21.7995 34.8116L13.0879 26.1L9.66548 38.234L21.7995 34.8116Z" fill="black"/>
                                </svg>
                            </span>
                            
                            </p>                        
                            <div className="_react_card_img_wrap">
                                <img src={person.image_url} alt="Image" className="_react_card_img"/>
                            </div>
                            {/* <div className="_react_card_txt"  >
                                { input.index == index && person.isEdit && person.isEdit == 1  ? renderInput : renderPerson}
                            </div> */}

                            { person.isEdit && person.isEdit == 1 ? 
                            <div className="_react_card_txt" >
                                <input placeholder="Name" onChange={handleChange}  value={person.name} type="text"/>
                                <input placeholder="Title" onChange={handleChange} value={person.email} type="text"/>
                                <input placeholder="Email" onChange={handleChange} value={person.title} type="text"/>
                                <Upload   {...props} onChange={(e:any)=>onInputChange(e)} >
                                    <Button   icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                                <button  type="submit"   onClick={((e) => editItemOnBack( index, person.id))}    className="btn btn-success d-block w-100 py-2">update</button>
                            </div> 
                            :
                            <div className="_react_card_txt">
                                
                                <p> edit: {person.isEdit }</p>
                                <h3 className="_react_card_name">{person.name}</h3>
                                <p className="_react_card_email">{person.email}</p>
                                <h4 className="_react_card_title">{ person.title}</h4>
                            </div>
                            }
                        </div>
                        
                    </div>
                    
                </div>
            )
        })
    }
     
    var renderPerson = {} 
    var renderInput = {}
         renderPerson = 
         <div className="_react_card_txt">
            <h3 className="_react_card_name">{people[input.index] ? people[input.index].name :''}</h3>
            <p className="_react_card_email">{people[input.index]?  people[input.index].email :''}</p>
            <h4 className="_react_card_title">{ people[input.index] ? people[input.index].title :''}</h4>
        </div>
        renderInput =
        <div>
            <input placeholder="Name" type="text"/>
            <input placeholder="Title" type="text"/>
            <input placeholder="Email" type="text"/>
            <Upload   {...props} onChange={(e:any)=>onInputChange(e)} >
                <Button   icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
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
                                                {/* {
                                                 uploadFormError &&
                                                 <p> {uploadFormError}</p>
                                                
                                                } */}
                                                <label htmlFor="name" className="form-label">Upload Image</label>
                                                {/* <input type="text" className="form-control" id="image" onChange={handleChange}
                                                name="image" placeholder="Image URL"
                                                value={input.image}/> */}
                                                {/* <input type="file" className="form-control"  name="image" placeholder="Image URL" id="image" onChange={(e:SyntheticEvent )=>uploadFile(e.currentTarget as HTMLInputElement)}/> */}
                                            </div>
                                            <Upload   {...props} onChange={(e:any)=>onInputChange(e)} >
                                                <Button   icon={<UploadOutlined />}>Click to Upload</Button>
                                            </Upload>
                                            

                                            <div className="col-3 mx-auto">
                                                 
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
                                  </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>      
    )

}
export default PeopleList