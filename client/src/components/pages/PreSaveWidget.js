/* eslint-disable */
import React, {Component} from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import '../../scss/PreSave.scss';

import commonUtil from '../../utils/common';
import axios from "axios";


class PreSaveWidget extends Component {

    constructor(props) {
        super(props);

        this.clickAction = this.clickAction.bind(this);

        this.state = {
            id:null,
            date:null,
            type: null,
            mode:"expired" //  expired, ready, saved
        }
    }

    componentDidMount() {
        const {base_url} = this.props;
        const params = commonUtil.c_checkURlParams();

        this.setState({...params});

        commonUtil.c_accessToken((access_token) => {

            if (access_token) {
                this.setState({mode: 'ready'});
                const headers = {headers: {'Authorization': 'Bearer ' +  access_token}};
                axios.get(`${base_url}/spotify/me/albums/contains?ids=${params.id}`, headers).then(res =>{
                        if(res.data[0]){
                            this.setState({mode:"saved"})
                        }
                    }).catch(err=>{
                        this.setState({mode:"expired"})
                });
                return;
            }
            this.setState({mode: 'expired'});
        })
    }

    clickAction(action) {
        const {id,type,date} = this.state;

        const refresh_token = localStorage.getItem('refresh_token');

        switch (action) {
            case 'login':
                alert("準備中です")
                break;
            case 'presave':
                alert("準備中です")
                break;
            case 'saved':
                window.open(`https://open.spotify.com/${type}/${id}`,"_blank")
                break;
                default:
                    alert("other")
                    break;
        }

    }

    render() {
        const {id,type,date,mode} = this.state;

        return (
            <div className="presave_btn">


                {
                    mode === 'expired' && (
                        <Button className='btn expired' onClick={() => this.clickAction('login')}>LOGIN</Button>)
                }

                {
                    mode ===  'ready' && (
                        <Button className='btn ready' onClick={() => this.clickAction('presave')}>
                            <i className="fa fa-clock-o" aria-hidden="true"/>
                            PreSave</Button>)
                }
                {
                    mode ===  'saved' && (
                        <Button className='btn saved' onClick={()=> this.clickAction('saved')}>
                            <i className="fa fa-spotify" aria-hidden="true"/>You have it!
                    </Button>)
                }
            </div>
        )
    }
}





const mapStateToProps = (state) => {

    return {
        headerTitle: state.app.uiReducer.title,
        base_url:state.app.site.base_url
    };

};

export default connect(mapStateToProps)(PreSaveWidget);
