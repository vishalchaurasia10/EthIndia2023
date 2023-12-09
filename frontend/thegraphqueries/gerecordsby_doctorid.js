import { gql } from "@apollo/client";

const getPrescriptionByDoctorId = (address, doctorId) => {
	const GET_PRESCRIPTION = gql`
		{
			prescriptionAddeds(where: { patientAddress: "${address}", doctorId: "${doctorId}" }) {
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

export default getPrescriptionByDoctorId;