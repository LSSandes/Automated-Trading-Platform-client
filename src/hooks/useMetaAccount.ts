// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { metaApiService, type CreateAccountParams } from '../api/meta-api';

// export function useMetaAccounts() {
//   return useQuery({
//     queryKey: ['meta-accounts'],
//     queryFn: () => metaApiService.getAccounts('313902'), // Using demo account ID
//     staleTime: 30000,
//     enabled: false // Disable auto-fetching until login+
//   });
// }

// export function useCreateMetaAccount() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async (params: Omit<CreateAccountParams, 'userId'>) => {
//       return metaApiService.createAccount({
//         ...params,
//         userId: '313902' // Using demo account ID
//         ,
//         name: '',
//         login: '',
//         password: '',
//         server: '',
//         broker: ''
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['meta-accounts'] });
//     }
//   });
// }

// export function useDeleteMetaAccount() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (accountId: string) => metaApiService.deleteAccount(accountId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['meta-accounts'] });
//     }
//   });
// }

// export function useRefreshMetaAccount() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (accountId: string) => metaApiService.refreshAccount(accountId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['meta-accounts'] });
//     }
//   });
// }