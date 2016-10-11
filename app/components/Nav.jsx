import React from 'react';
import {Link, IndexLink} from 'react-router';


var Nav = React.createClass({
	render: function() {
		return(
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
					<li className="menu-text">HSDS</li>
						<li>
							<IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Events</IndexLink>
						</li>
						<li>
							<Link to="/new" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Add Event</Link>
						</li>
					</ul>
				</div>
			</div>

			);
	}
});


module.exports = Nav;
