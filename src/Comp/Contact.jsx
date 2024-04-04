import React from "react";

export default function Contact() {
    var [contactMsg, setContactMsg] = React.useState('&nbsp;');

    var isValidEmail = function (arg) {
        var emailReg = /[\w\.=-]+@[\w\.-]+\.[a-z]{2,6}/;
        return emailReg.test(arg.toLowerCase());
    }

    var sendontactMsg = function () {
        var name = 'Guest';
        var email = document.getElementById('ctrlEmail').value;
        var subject = 'React.NEU';
        var msg = document.getElementById('ctrlContactMessage').value;
     
        var url = 'http://localhost/_webservices/react/service.svc/sendMsg';
        if (email.length == 0 || msg.length == 0 || !isValidEmail(email)) {
            setContactMsg('Please enter a valid email and a brief message');

            $('#lblMsgContact').stop(true, true).delay(3800).fadeOut(function () {
                setContactMsg('&nbsp;');
                $('#lblMsgContact').fadeIn();
            });
        }
        else {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, subject: subject, msg: msg })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (JSON.parse(data.sendMsgResult.error)) {
                        setContactMsg(data.sendMsgResult.errorDesc);
                        $('#lblMsgContact').stop(true, true).delay(3800).fadeOut(function () {
                            setContactMsg('&nbsp;');
                            $('#lblMsgContact').fadeIn();
                        });
                    }
                    else{
                        setContactMsg('Your message was sent successfully');
                        document.getElementById('ctrlEmail').value = '';
                        document.getElementById('ctrlContactMessage').value = '';
                        $('#lblMsgContact').stop(true, true).delay(3800).fadeOut(function () {
                            setContactMsg('&nbsp;');
                            $('#lblMsgContact').fadeIn();
                        });
                    }
                })
                .catch(function (error) {                  
                });
        }
    }

    return (
        <div className="layout-col special0">
            <div className="form-title block">Contact</div>
            <div className="form flex-vert">
                <div className="flex-horz">
                    <div className="form-left">Email: &nbsp;</div>
                    <div><input type="text" className="form-right" id="ctrlEmail" title="Email"/></div>
                </div>

                <div className="flex-horz">
                    <div className="form-left extra">Message: &nbsp;</div>
                    <div className="width-100"><textarea type="text" className="form-right width-100" id="ctrlContactMessage" title="Message"></textarea></div>
                </div>

                <div className="flex-horz">

                    <div className="form-left"> &nbsp;</div>
                    <div id="lblContactNote">Information provided will not be sold, shared or otherwise provided to anyone.</div>
                </div>

                <div className="flex-horz">
                    <div className="form-left"> &nbsp;</div>
                    <div><input type="button" value="  SEND  " id="ctrlSend" onClick={(e) => sendontactMsg()} /></div>
                </div>

                <div className="flex-horz" id="lblMsgContact" dangerouslySetInnerHTML={{ __html: contactMsg }} />

            </div>
        </div>
    )
}

