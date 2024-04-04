import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import Store from '../State/Store';

export default function Login() {
    var snap = useSnapshot(Store);
    var [msg, setMsg] = React.useState('&nbsp;');

    var checkUser = function () {
        var user = document.getElementById('ctrlUser').value;
        var pass = document.getElementById('ctrlPass').value;

        var url = 'http://localhost/_webservices/react/service.svc/checkUser';
        if (user.length == 0 || pass.length == 0) {
            setMsg('Please enter your username and password');

            $('#lblMsg').stop(true, true).delay(3800).fadeOut(function () {
                setMsg('&nbsp;');
                $('#lblMsg').fadeIn();
            });
        }
        else {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user, password: pass })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    if (JSON.parse(data.checkUserResult.error)) {
                        setMsg(data.checkUserResult.errorDesc);
                        $('#lblMsg').stop(true, true).delay(3800).fadeOut(function () {
                            setMsg('&nbsp;');
                            $('#lblMsg').fadeIn();
                        });
                    }
                })
                .catch(function (error) {                    
                });
        }
    }

    return (
        <>      
            <div className="layout-col special0">
                <div className="form-title block">PORTAL</div>
                <div className="form flex-vert">
                    <div className="flex-horz">
                        <div className="form-left">Username: &nbsp;</div>
                        <div> <input type="text" className="form-right" id="ctrlUser" title="Username" /></div>
                    </div>

                    <div className="flex-horz">
                        <div className="form-left">Password: &nbsp;</div>
                        <div><input type="password" className="form-right" id="ctrlPass" title="Password" /></div>
                    </div>

                    <div className="flex-horz">
                        <div className="form-left"> &nbsp;</div>
                        <div><input type="button" value="  LOGIN  " id="ctrlLogin" onClick={(e) => checkUser()} /></div>
                    </div>

                    <div className="flex-horz" id="lblMsg" dangerouslySetInnerHTML={{ __html: msg }} />

                </div>
            </div>
        </>
    )
}

