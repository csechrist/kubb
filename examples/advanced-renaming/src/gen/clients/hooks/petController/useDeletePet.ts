import client from "../../../../tanstack-query-client.ts";
import { useMutation } from "@tanstack/react-query";
import type { DeletePetMutationResponse, DeletePetPathParams, DeletePetHeaderParams, DeletePet400 } from "../../../models/ts/petController/DeletePet";
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

type DeletePetClient = typeof client<DeletePetMutationResponse, DeletePet400, never>;
type DeletePet = {
    data: DeletePetMutationResponse;
    error: DeletePet400;
    request: never;
    pathParams: DeletePetPathParams;
    queryParams: never;
    headerParams: DeletePetHeaderParams;
    response: Awaited<ReturnType<DeletePetClient>>;
    client: {
        parameters: Partial<Parameters<DeletePetClient>[0]>;
        return: Awaited<ReturnType<DeletePetClient>>;
    };
};
/**
     * @description delete a pet
     * @summary Deletes a pet
     * @link /pet/:petId */
export function useDeletePet(petId: DeletePetPathParams["petId"], headers?: DeletePet["headerParams"], options: {
    mutation?: UseMutationOptions<DeletePet["response"], DeletePet["error"], void>;
    client?: DeletePet["client"]["parameters"];
} = {}): UseMutationResult<DeletePet["response"], DeletePet["error"], void> {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation<DeletePet["response"], DeletePet["error"], void>({
        mutationFn: async () => {
            const res = await client<DeletePet["data"], DeletePet["error"], void>({
                method: "delete",
                url: `/pet/${petId}`,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res;
        },
        ...mutationOptions
    });
}