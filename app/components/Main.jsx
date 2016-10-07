import React from 'react';
import Nav from 'Nav';


var Main = (props) => {
		return(
				<div>
					<Nav />
					<div className="main-container">
						{props.children}
					</div>
				</div>
			);
		}

module.exports = Main;
