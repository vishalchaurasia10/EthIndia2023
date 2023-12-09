import { gql } from "@apollo/client";

const getDoctorList = () => {
	const GET_DOCTORLIST = gql`
		{
			doctorCreateds(orderBy: doctorId) {
				id
				
				doctorAddress
				name
				age
				gender
				specialization
				doctorwalletaddress
				consultanceFee
				duration
			}
		}
	`;
	return GET_DOCTORLIST;
};

export default getDoctorList;