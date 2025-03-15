import * as api from '../api'

//Action-sirf type and payload but not dispatch 
//Action Creator-Will directly dispatch it 

export const getPost=()=>async (dispatch)=>{
    try{
        const {data}=await api.fetchPosts();

        dispatch({type:'FETCH_ALL',payload:data});
    }catch(error){
        console.log(error.message);
        
    }
    
}
//Similar action creator to getPost with axios.post(url,post(payload))
export const createPost=(post)=>async (dispatch)=>{
    try{
        const {data}=await api.createPost(post);

        dispatch({type:'CREATE',payload:data});
    }catch(error){
        console.log(error.message);
        
    }
    
}


export const updatePost=(id,post)=>async (dispatch)=>{
    try{
        const {data}=await api.updatePost(id,post);
        console.log(data);
        

        dispatch({type:'UPDATE',payload:data});
    }catch(error){
        console.log(error.message);
        
    }
    
}


export const deletePost=(id)=>async (dispatch)=>{
    try{
        await api.deletePost(id);

        dispatch({type:'DELETE',payload:id});
    }catch(error){
        console.log(error);
        
    }
    
}

export const likePost=(id)=>async (dispatch)=>{
     try {
        const {data}=await api.likePost(id); //likeCount =2 ->3

        dispatch({type:'LIKE',payload:data});  
     } catch (error) {
        console.log(error);
     }
}