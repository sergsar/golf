import create  from 'zustand';

type State = {
    enabled: boolean,
    setEnabled: (value: boolean) => void
}

export const useTerrainState = create<State>((set) => ({
    enabled: false,
    setEnabled: (value) => set((state) => ({ ...state, enabled: value }))
}))
