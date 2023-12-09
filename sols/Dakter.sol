// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Counters.sol";

contract DClinic {
    using Counters for Counters.Counter;
    Counters.Counter private _patientIds;
    Counters.Counter private _doctorIds;

    event PatientCreated(
        uint256 patientId,
        address patientWalletAddress,
        string name,
        string age,
        string dateOfBirth,
        string gender,
        string patientAddr
    );

    event DoctorCreated(
        uint256 doctorId,
        address doctorWalletAddress,
        string name,
        string age,
        string gender,
        string doctorAddress,
        string specialization,
        string consultanceFee,
        string duration
    );

    event AppointmentCreated(
        uint256 patientId,
        uint256 doctorId,
        address patientAddress,
        address doctorAddress,
        string symptoms,
        string pastMedHistory,
        string appointmentDate,
        string appointmentTime,
        string urgencyLevel
    );

    event PrescriptionAdded(
        uint256 patientId,
        uint256 doctorId,
        address doctorAddress,
        address patientAddress,
        string prescriptions,
        string prescriptionDate
    );

    function createPatient(
        string memory name,
        string memory age,
        string memory dob,
        string memory gender,
        string memory patientAddress
    ) public {
        uint256 patientId = _patientIds.current();
        emit PatientCreated(patientId, msg.sender, name, age, dob, gender, patientAddress);
        _patientIds.increment();
    }

    function createDoctor(
        string memory name,
        string memory age,
        string memory gender,
        string memory doctorAddress,
        string memory specialization,
        string memory consultanceFee,
        string memory duration
    ) public {
        uint256 doctorId = _doctorIds.current();
        emit DoctorCreated(
            doctorId,
            msg.sender,
            name,
            age,
            gender,
            doctorAddress,
            specialization,
            consultanceFee,
            duration
        );
        _doctorIds.increment();
    }

    function createAppointment(
        uint256 patientId,
        uint256 doctorId,
        address doctorAddress,
        string memory symptoms,
        string memory pastMedHistory,
        string memory appointmentDate,
        string memory appointmentTime,
        string memory urgencyLevel
    ) public {
        emit AppointmentCreated(
            patientId,
            doctorId,
            msg.sender,
            doctorAddress,
            symptoms,
            pastMedHistory,
            appointmentDate,
            appointmentTime,
            urgencyLevel
        );
    }

    function addPrescription(
        uint256 patientId,
        uint256 doctorId,
        address patientAddress,
        string memory prescriptions,
        string memory prescriptionDate
    ) public {
        emit PrescriptionAdded(
            patientId,
            doctorId,
            msg.sender,
            patientAddress,
            prescriptions,
            prescriptionDate
        );
    }

    function getPatientCount() public view returns (uint256) {
        return _patientIds.current();
    }

    function getDoctorCount() public view returns (uint256) {
        return _doctorIds.current();
    }
}
