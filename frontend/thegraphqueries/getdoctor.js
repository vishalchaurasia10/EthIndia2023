import { gql } from "@apollo/client";

const GET_DOCTOR = gql`
  query GetDoctor($doctorWalletAddress: Bytes!) {
    doctorCreateds(where: { doctorWalletAddress: $doctorWalletAddress }) {
      id
    
      doctorWalletAddress
      name
      age
      gender
      specialization
      consultanceFee
      duration
    }
  }
`;

export default GET_DOCTOR;

