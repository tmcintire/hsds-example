import React from 'react';
import {Link, IndexLink} from 'react-router';


var Nav = React.createClass({
	render: function() {
		return(
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu">
					<li className="menu-text">IT Inventory</li>
						<li>
							<IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Events</IndexLink>
						</li>
						<li>
							<Link to="/computers" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Placeholder</Link>
						</li>
					</ul>
				</div>
				<div className="top-bar-right">
					<form onSubmit={this.onSearch}>
						<ul className="menu">
							<li>	
								Account
							</li>
						</ul>
					</form>
				</div>
			</div>
				
			);
	}
});


module.exports = Nav;