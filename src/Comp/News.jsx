
import React from "react";
import Feeds from "../../public/js/feedsMap"
import Store from "../State/Store";
import { proxy, useSnapshot } from 'valtio';

export default function News() {

    var getURLFroMap = function (id) {
        return Feeds.filter(function (item) {
            return item.id == id;
        });
    };

    var getFeed = function (arg) {
        var t = getURLFroMap(arg);
       
        var url1 = 'http://localhost/_webservices/react/service.svc/getRSSFeed';

        if (t.length > 0) {
            var url = t[0].url;
            fetch(url1 + '?rss=' + encodeURIComponent(url), {
                method: 'GET'
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {                   
                    Store.Feeds = data.getRSSFeedResult.all;
                })
                .catch(function (error) {                    
                    Store.Feeds = [];
                })
                .finally(function () {
                    var isMobile = ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent));
                    if (!isMobile) { $('[title]').customTooltip(); }
                })
        }
    }

    var feedsSnap = useSnapshot(Store);

    React.useEffect(() => {
        getFeed(4);
    }, []);

    return (
        <>
            <div className="layout-col special1">
                <div className="form-title block">Tech. News</div>
                <div className="form flex-vert" >
                    <div className="flex-horz">
                        <div className="form-left">Source: &nbsp;</div>
                        <div>
                            <select title="News source" className="form-right" onChange={(e) => getFeed(e.target.value)}>
                                {
                                    Feeds.map(function (item) {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <ul className="">
                        {
                            (() => {
                                return (
                                    feedsSnap.Feeds.map(function (item) {
                                        return (
                                            <li className="feed-item" key={item.title} title={item.title} ><a href={item.link} target="_blank" rel="noreferrer" >{item.description.replace('Read more...', '')} <b>&#62;</b></a></li>
                                        )
                                    })
                                )
                            })()
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}