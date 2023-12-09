import { gql } from "@apollo/client";

const getRecords = (address) => {
	const GET_PRESCRIPTION = gql`
		{
			prescriptionAddeds(first: 5 where: { patientAddress: "${address}" }) {
                
                patientId
                doctorId
                doctorAddress
                patientAddress
                prescriptions
                prescriptionDate
			}
		}
	`;
	return GET_PRESCRIPTION;
};

export default getRecords;