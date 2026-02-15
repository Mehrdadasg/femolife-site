import { getHeader } from '@/service/getHeader';
import { useQuery } from '@tanstack/react-query';

export function useHeader() {
  return useQuery({
    queryKey: ['/home/Header'],
    queryFn: getHeader,
  });
}