import React from 'react';
import { MDBFooter } from 'mdbreact';

const Footer = () => {
    return (
        <MDBFooter color="black" fixed="bottom"  className="text-center font-small darken-2">
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} ICP备案查询网(
                  <a href="http://www.beianbeian.com/beianxinxi/681c9b42-9976-4c1f-b898-42042f90c35d.html">www.beianbeian.com</a>)
                  <span>苏ICP备17077146号-1</span>
            </p>
        </MDBFooter>
    );
}

export default Footer;