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

