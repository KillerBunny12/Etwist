import React, {Component} from 'react';
import "./Footer.scss";

class Footer extends Component {
    constructor() {
        super();
    }


    render(){
        return(
            <div>
                <footer className="footer">
                    <div id="footer-div" >2020 &copy; ETWIST.INC desarrollado por: Brandon Castro, Sergio Méndez, David Vargas </div>
                </footer>
            </div>
        );
    }

}

export default Footer;