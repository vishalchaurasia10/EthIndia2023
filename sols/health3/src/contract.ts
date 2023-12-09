import {
  AppointmentCreated as AppointmentCreatedEvent,
  DoctorCreated as DoctorCreatedEvent,
  PatientCreated as PatientCreatedEvent,
  PrescriptionAdded as PrescriptionAddedEvent
} from "../generated/Contract/Contract"
import {
  AppointmentCreated,
  DoctorCreated,
  PatientCreated,
  PrescriptionAdded
} from "../generated/schema"

export function handleAppointmentCreated(event: AppointmentCreatedEvent): void {
  let entity = new AppointmentCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.patientId = event.params.patientId
  entity.doctorId = event.params.doctorId
  entity.patientAddress = event.params.patientAddress
  entity.doctorAddress = event.params.doctorAddress
  entity.symptoms = event.params.symptoms
  entity.pastMedHistory = event.params.pastMedHistory
  entity.appointmentDate = event.params.appointmentDate
  entity.appointmentTime = event.params.appointmentTime
  entity.urgencyLevel = event.params.urgencyLevel

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDoctorCreated(event: DoctorCreatedEvent): void {
  let entity = new DoctorCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.doctorId = event.params.doctorId
  entity.doctorWalletAddress = event.params.doctorWalletAddress
  entity.name = event.params.name
  entity.age = event.params.age
  entity.gender = event.params.gender
  entity.doctorAddress = event.params.doctorAddress
  entity.specialization = event.params.specialization
  entity.consultanceFee = event.params.consultanceFee
  entity.duration = event.params.duration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePatientCreated(event: PatientCreatedEvent): void {
  let entity = new PatientCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.patientId = event.params.patientId
  entity.patientWalletAddress = event.params.patientWalletAddress
  entity.name = event.params.name
  entity.age = event.params.age
  entity.dateOfBirth = event.params.dateOfBirth
  entity.gender = event.params.gender
  entity.patientAddr = event.params.patientAddr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePrescriptionAdded(event: PrescriptionAddedEvent): void {
  let entity = new PrescriptionAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.patientId = event.params.patientId
  entity.doctorId = event.params.doctorId
  entity.doctorAddress = event.params.doctorAddress
  entity.patientAddress = event.params.patientAddress
  entity.prescriptions = event.params.prescriptions
  entity.prescriptionDate = event.params.prescriptionDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
