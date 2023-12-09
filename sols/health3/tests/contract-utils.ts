import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AppointmentCreated,
  DoctorCreated,
  PatientCreated,
  PrescriptionAdded
} from "../generated/Contract/Contract"

export function createAppointmentCreatedEvent(
  patientId: BigInt,
  doctorId: BigInt,
  patientAddress: Address,
  doctorAddress: Address,
  symptoms: string,
  pastMedHistory: string,
  appointmentDate: string,
  appointmentTime: string,
  urgencyLevel: string
): AppointmentCreated {
  let appointmentCreatedEvent = changetype<AppointmentCreated>(newMockEvent())

  appointmentCreatedEvent.parameters = new Array()

  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "patientId",
      ethereum.Value.fromUnsignedBigInt(patientId)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorId",
      ethereum.Value.fromUnsignedBigInt(doctorId)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "patientAddress",
      ethereum.Value.fromAddress(patientAddress)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorAddress",
      ethereum.Value.fromAddress(doctorAddress)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam("symptoms", ethereum.Value.fromString(symptoms))
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pastMedHistory",
      ethereum.Value.fromString(pastMedHistory)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "appointmentDate",
      ethereum.Value.fromString(appointmentDate)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "appointmentTime",
      ethereum.Value.fromString(appointmentTime)
    )
  )
  appointmentCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "urgencyLevel",
      ethereum.Value.fromString(urgencyLevel)
    )
  )

  return appointmentCreatedEvent
}

export function createDoctorCreatedEvent(
  doctorId: BigInt,
  doctorWalletAddress: Address,
  name: string,
  age: string,
  gender: string,
  doctorAddress: string,
  specialization: string,
  consultanceFee: string,
  duration: string
): DoctorCreated {
  let doctorCreatedEvent = changetype<DoctorCreated>(newMockEvent())

  doctorCreatedEvent.parameters = new Array()

  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorId",
      ethereum.Value.fromUnsignedBigInt(doctorId)
    )
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorWalletAddress",
      ethereum.Value.fromAddress(doctorWalletAddress)
    )
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam("age", ethereum.Value.fromString(age))
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam("gender", ethereum.Value.fromString(gender))
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorAddress",
      ethereum.Value.fromString(doctorAddress)
    )
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "specialization",
      ethereum.Value.fromString(specialization)
    )
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "consultanceFee",
      ethereum.Value.fromString(consultanceFee)
    )
  )
  doctorCreatedEvent.parameters.push(
    new ethereum.EventParam("duration", ethereum.Value.fromString(duration))
  )

  return doctorCreatedEvent
}

export function createPatientCreatedEvent(
  patientId: BigInt,
  patientWalletAddress: Address,
  name: string,
  age: string,
  dateOfBirth: string,
  gender: string,
  patientAddr: string
): PatientCreated {
  let patientCreatedEvent = changetype<PatientCreated>(newMockEvent())

  patientCreatedEvent.parameters = new Array()

  patientCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "patientId",
      ethereum.Value.fromUnsignedBigInt(patientId)
    )
  )
  patientCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "patientWalletAddress",
      ethereum.Value.fromAddress(patientWalletAddress)
    )
  )
  patientCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  patientCreatedEvent.parameters.push(
    new ethereum.EventParam("age", ethereum.Value.fromString(age))
  )
  patientCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "dateOfBirth",
      ethereum.Value.fromString(dateOfBirth)
    )
  )
  patientCreatedEvent.parameters.push(
    new ethereum.EventParam("gender", ethereum.Value.fromString(gender))
  )
  patientCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "patientAddr",
      ethereum.Value.fromString(patientAddr)
    )
  )

  return patientCreatedEvent
}

export function createPrescriptionAddedEvent(
  patientId: BigInt,
  doctorId: BigInt,
  doctorAddress: Address,
  patientAddress: Address,
  prescriptions: string,
  prescriptionDate: string
): PrescriptionAdded {
  let prescriptionAddedEvent = changetype<PrescriptionAdded>(newMockEvent())

  prescriptionAddedEvent.parameters = new Array()

  prescriptionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "patientId",
      ethereum.Value.fromUnsignedBigInt(patientId)
    )
  )
  prescriptionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorId",
      ethereum.Value.fromUnsignedBigInt(doctorId)
    )
  )
  prescriptionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "doctorAddress",
      ethereum.Value.fromAddress(doctorAddress)
    )
  )
  prescriptionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "patientAddress",
      ethereum.Value.fromAddress(patientAddress)
    )
  )
  prescriptionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "prescriptions",
      ethereum.Value.fromString(prescriptions)
    )
  )
  prescriptionAddedEvent.parameters.push(
    new ethereum.EventParam(
      "prescriptionDate",
      ethereum.Value.fromString(prescriptionDate)
    )
  )

  return prescriptionAddedEvent
}
