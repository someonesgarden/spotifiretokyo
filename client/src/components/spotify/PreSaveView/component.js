/* eslint-disable */
import React from 'react';
import moment from 'moment';


function getDate(day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    return moment(date).format('YY/DD');
}

function getHour(hour) {
    var date = new Date();
    date.setHours(date.getHours()+hour);
    return moment(date).format('YY/DD HH:MM');
}


const PreSaveView = ({  }) => {
    const tomorrow   = getDate(1);
    const hourafter  = getHour(1);
    const hour2after = getHour(2);

    const presaves = [
        {
            type:'album',
            title:'怪物さん feat.あいみょん',
            desc:`クリックすると明日${tomorrow}（夜中０時）にLibraryに自動登録されます。`,
            img:'https://i.scdn.co/image/ab67616d0000b27353116a3953d985fdd744e049',
            id:'79M3wOiQWZZsTYXAJdMnlN',
            release:tomorrow,
            action:'cron'
        },
        {
            type:'album',
            title:'Exodus 40',
            desc:`クリックすると１時間後(${hourafter})以降にこのボタンのあるページを開いた時Libraryに自動登録されます。`,
            img:'https://i.scdn.co/image/ab67616d0000b2739fb7dd2aae3f1b15e5a37f64',
            id:'6NYyISRJeOlJ1IldQtNvMw',
            release:hourafter,
            action:'passive'
        },

        {
            type:'album',
            title:'Repetition (ChangesNowBowie Version)',
            desc:`クリックすると１時間後(${hourafter})以降にこのボタンのあるページを開いた時Libraryに自動登録されます。`,
            img:'https://i.scdn.co/image/ab67616d0000b2732bca3d4be0a4a06b1915b4d7',
            id:'3bUCQh1jNYqWZELOB8hZ44',
            release:hourafter,
            action:'passive'
        },

        {
            type:'album',
            title:'Tour De France (2009 Remastered Version)',
            desc:`クリックすると２時間後(${hour2after})以降にこのボタンのあるページを開いた時Libraryに自動登録されます。`,
            img:'https://i.scdn.co/image/ab67616d0000b2731e6789e2db014c888c3de97e',
            id:'3lxHj7xzLBkPpg98eJ7G8B',
            release:hour2after,
            action:'passive'
        }
    ];

    return (
        <div>
            <div className="section-title">
                {
                    presaves.map((item,index)=>{
                        return (
                            <div key={'presaveitem'+index}  className="playlist-title-container presave-item">
                                <div className="playlist-image-container">
                                    <img className="playlist-image" src={item.img}/>
                                </div>
                                <div className="playlist-info-container">
                                    <p className="playlist-text">{item.type}</p>
                                    <h3 className="header-title presave">{item.title}</h3>
                                    <p className="presave-desc">{item.desc}</p>
                                    <iframe src={`/presavewidget?id=${item.id}&type=${item.type}&date=${item.release}&action=${item.action}`} frameBorder="0" seamless="" width="250" height="50"/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
export default PreSaveView;
