import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {ActionType} from "./redux/actions";

import AppPage from './components/pages/LyricsChecker';


const AppRouter = (props) => {
    const {site, location} = props;

    return (
        <React.Fragment>
            <TransitionGroup component={null}>
                <CSSTransition key={location.pathname} classNames={site.anime.className} timeout={site.anime.timeout}>
                    <Switch location={props.location}>
                        <Route exact path="/" render={() => <AppPage location={props.location}/>}/>
                        <Route exact path="/callback" render={() => <AppPage location={props.location}/>}/>
                        <Route exact path="/geniuscallback" render={() => <AppPage location={props.location}/>}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </React.Fragment>
    )
};


const mapStateToProps = (state) => {
    return {
        site: state.app.site
    };
};

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppRouter));