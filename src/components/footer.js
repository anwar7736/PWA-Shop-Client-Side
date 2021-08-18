import React, {Component,Fragment} from 'react';

class Footer extends Component {
    render() {
        return (
            <Fragment>
                        <div className="w-100 footer p-2">
                            <span className="text-warning">&copy;Copyright 2020-2021</span>
                            <p className="product-name text-white no-print">All Rights Reserved By Md Anwar Hossain</p>
                        </div>
            </Fragment>
        );
    }
}

export default Footer;