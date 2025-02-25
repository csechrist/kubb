import client from "../../../../tanstack-query-client.ts";
import { useMutation } from "@tanstack/react-query";
import type { CreateUsersWithListInputMutationRequest, CreateUsersWithListInputMutationResponse, CreateUsersWithListInputError } from "../../../models/ts/userController/CreateUsersWithListInput";
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

type CreateUsersWithListInputClient = typeof client<CreateUsersWithListInputMutationResponse, CreateUsersWithListInputError, CreateUsersWithListInputMutationRequest>;
type CreateUsersWithListInput = {
    data: CreateUsersWithListInputMutationResponse;
    error: CreateUsersWithListInputError;
    request: CreateUsersWithListInputMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: Awaited<ReturnType<CreateUsersWithListInputClient>>;
    client: {
        parameters: Partial<Parameters<CreateUsersWithListInputClient>[0]>;
        return: Awaited<ReturnType<CreateUsersWithListInputClient>>;
    };
};
/**
     * @description Creates list of users with given input array
     * @summary Creates list of users with given input array
     * @link /user/createWithList */
export function useCreateUsersWithListInput(options: {
    mutation?: UseMutationOptions<CreateUsersWithListInput["response"], CreateUsersWithListInput["error"], CreateUsersWithListInput["request"]>;
    client?: CreateUsersWithListInput["client"]["parameters"];
} = {}): UseMutationResult<CreateUsersWithListInput["response"], CreateUsersWithListInput["error"], CreateUsersWithListInput["request"]> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<CreateUsersWithListInput["response"], CreateUsersWithListInput["error"], CreateUsersWithListInput["request"]>({
        mutationFn: async (data) => {
            const res = await client<CreateUsersWithListInput["data"], CreateUsersWithListInput["error"], CreateUsersWithListInput["request"]>({
                method: "post",
                url: `/user/createWithList`,
                data,
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}