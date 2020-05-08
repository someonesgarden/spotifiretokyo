import React,{Component} from 'react';
import { connect } from 'react-redux';
import {ActionType} from "../../../redux/actions";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./styles.scss";


class InfoModal extends Component {


   constructor(props){
       super(props);
       const {type,auth} = this.props;
       this.tryLogin = this.tryLogin.bind(this);

       let auth_info=JSON.parse(sessionStorage.getItem('auth_try'+type));
       const open = auth_info && auth_info.id===auth[type].id && auth_info.pw===auth[type].pw;

       this.state = {
           open:!open
       };

       if(sessionStorage.getItem('auth_try'+type)){
           let auth_info=JSON.parse(sessionStorage.getItem('auth_try'+type));
           console.log(auth_info);
            this.tryLogin(auth_info.id,auth_info.pw);
       }
   }

   tryLogin(id,pw){
       const {type,auth,tryAuth} = this.props;

       if(id!=="" && pw!==""){
           tryAuth(type,id,pw);

           setTimeout(()=> {

               if(auth[type].matched){
                   this.setState({open:false})
               }else{

               }
           },5)
       }
   }


    render(){
       const {auth,type} = this.props;
       const {open} = this.state;

       let id = "";
       let pw = "";

       return (
           <Modal
               className="loginModal"
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
               open={open}>
               <div className="paper">
                   <h1>LOGIN {auth[type].matched}</h1>
                   <p id="info">enter id and pass.</p>
                   <TextField label="ID" defaultValue="" onChange={(val)=> id = val.target.value}/>
                   <TextField label="PASS" type="password" defaultValue="" onChange={(val)=> pw = val.target.value}/>

                   <Button variant="contained" size='small' style={{marginTop:20}} onClick={()=>this.tryLogin(id,pw)}>
                       LOGIN
                   </Button>
               </div>
           </Modal>
       );
   }
}


const mapStateToProps = (state) => {
    return {
        //auth: state.
        auth:state.app.site.auth

    }
};


export const mapDispatchToProps = dispatch => ({
    tryAuth:(type,id,pw)=>dispatch({type:ActionType.APP_TRY_AUTH,value:{type,id,pw}}),
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal);
