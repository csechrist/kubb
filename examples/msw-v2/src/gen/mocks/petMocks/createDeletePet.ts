import { faker } from '@faker-js/faker'
import type { DeletePet400, DeletePetHeaderParams, DeletePetMutationResponse, DeletePetPathParams } from '../../models/DeletePet'

/**
 * @description Invalid pet value
 */

export function createDeletePet400(): NonNullable<DeletePet400> {
  faker.seed([220])
  return undefined
}

export function createDeletePetHeaderParams(): NonNullable<DeletePetHeaderParams> {
  faker.seed([220])
  return { 'api_key': faker.string.alpha() }
}

export function createDeletePetMutationResponse(): NonNullable<DeletePetMutationResponse> {
  faker.seed([220])
  return undefined
}

export function createDeletePetPathParams(): NonNullable<DeletePetPathParams> {
  faker.seed([220])
  return { 'petId': faker.number.float({}) }
}
