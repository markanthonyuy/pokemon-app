import { PropsWithChildren, createContext, useContext, useState } from "react";

type GenerationContext = {
  generation: string;
  setGeneration: (generation: string) => void;
}

export const Generation = createContext<GenerationContext>({
  generation: '',
  setGeneration: (generation: string) => generation
})

export const GenerationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [generation, setGeneration] = useState('');
  return (
    <Generation.Provider value={{
      generation,
      setGeneration
    }}>
      {children}
    </Generation.Provider>
  )
}

// Should I move to hooks/useGeneration.ts?
export const useGenerationContext = () => useContext(Generation);