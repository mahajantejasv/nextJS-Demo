import { Fragment } from 'react';
const meetUpDetails = (props) => {
	return (
		<Fragment>
			<img src={props.image} alt={props.title}  style={{width: 600}}/>
			<h2>{props.title}</h2>
			<p>{props.address}</p>
		</Fragment>
	);
};
export default meetUpDetails;
