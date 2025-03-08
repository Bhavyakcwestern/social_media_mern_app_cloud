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