import { gql } from "@apollo/client";

const getPatient = (address) => {
	const GET_PATIENT = gql`
		{
			patientCreateds(first: 5 where: { patientAddress: "${address}" }) {
				
				patientId
                patientWalletAddress
		
				name
				age
                dateOfBirth
				gender
				patientAddr
			}
		}
	`;
	return GET_PATIENT;
};

export default getPatient;