import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import type { UseMutationOptions } from '@tanstack/react-query'
import type { DeleteUserRequest, DeleteUserResponse } from '../models/ts/DeleteUser'

/**
 * @description This can only be done by the logged in user.
 * @summary Delete user
 * @link /user/{username}
 */
export const useDeleteUser = <TData = DeleteUserResponse, TVariables = DeleteUserRequest>(options?: {
  mutation?: UseMutationOptions<TData, unknown, TVariables>
}) => {
  const { mutation: mutationOptions } = options ?? {}

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data) => {
      return axios.delete('/user/{username}').then((res) => res.data)
    },
    ...mutationOptions,
  })
}
