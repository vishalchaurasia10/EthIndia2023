import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AppointmentCreated } from "../generated/schema"
import { AppointmentCreated as AppointmentCreatedEvent } from "../generated/Contract/Contract"
import { handleAppointmentCreated } from "../src/contract"
import { createAppointmentCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let patientId = BigInt.fromI32(234)
    let doctorId = BigInt.fromI32(234)
    let patientAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let doctorAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let symptoms = "Example string value"
    let pastMedHistory = "Example string value"
    let appointmentDate = "Example string value"
    let appointmentTime = "Example string value"
    let urgencyLevel = "Example string value"
    let newAppointmentCreatedEvent = createAppointmentCreatedEvent(
      patientId,
      doctorId,
      patientAddress,
      doctorAddress,
      symptoms,
      pastMedHistory,
      appointmentDate,
      appointmentTime,
      urgencyLevel
    )
    handleAppointmentCreated(newAppointmentCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AppointmentCreated created and stored", () => {
    assert.entityCount("AppointmentCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "patientId",
      "234"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "doctorId",
      "234"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "patientAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "doctorAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "symptoms",
      "Example string value"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pastMedHistory",
      "Example string value"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "appointmentDate",
      "Example string value"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "appointmentTime",
      "Example string value"
    )
    assert.fieldEquals(
      "AppointmentCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "urgencyLevel",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
