interface Values {
  [key: string]: {
    state: any
    reducers: {
      [reducer: string]: (state, payload) => any
    }
  }
}

type Dispatch<Slice> = ({ type, payload }: { type: keyof Slice['reducers'], payload: any }) => any

type Store<Slice> = [
  Slice['state'],
  Dispatch<Slice>,
]

export default function getStore<V extends Values, Key extends keyof V>(values: V)
  : <Subscribe extends boolean = true>(key: Key, subscribe?: Subscribe) => Subscribe extends true
    ? Store<V[Key]>
    : Dispatch<V[Key]>;
