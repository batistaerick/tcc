import 'swr';

declare module 'swr' {
  interface SWRInfiniteMutatorOptions<Data = any, MutationData = Data>
    extends Omit<MutatorOptions<Data, MutationData>, 'revalidate'> {
    revalidate?:
      | boolean
      | SWRInfiniteRevalidateFn<Data extends unknown[] ? Data[number] : never>;
  }
  interface SWRInfiniteRevalidateFn<Data = any> {
    (data: Data, key: Arguments): boolean;
  }
  type InfiniteKeyedMutator<Data> = <MutationData = Data>(
    data?: Data | Promise<Data | undefined> | MutatorCallback<Data>,
    opts?: boolean | SWRInfiniteMutatorOptions<Data, MutationData>
  ) => Promise<Data | MutationData | undefined>;
}
