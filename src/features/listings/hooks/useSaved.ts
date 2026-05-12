import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { api } from '../../../lib/api'

export function useSaved(): UseQueryResult<number[], Error> {
  return useQuery({
    queryKey: ['saved'],
    queryFn: () => api.get<number[]>('/saved'),
    initialData: [],
  })
}
