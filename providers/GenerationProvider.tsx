import { useRouter } from 'expo-router';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type GenerationContext = {
  generation: string;
  generationId?: number;
  setGeneration: (generation: string) => void;
  setGenerationId: (generation?: number) => void;
};

export const Generation = createContext<GenerationContext>({
  generation: '',
  generationId: undefined,
  setGeneration: (generation: string) => generation,
  setGenerationId: (generation?: number) => generation,
});

export const GenerationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [generation, setGeneration] = useState('');
  const [generationId, setGenerationId] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (!generationId) {
      router.push('/');
      return;
    }
  }, []);

  return (
    <Generation.Provider
      value={{
        generation,
        setGeneration,
        generationId,
        setGenerationId,
      }}
    >
      {children}
    </Generation.Provider>
  );
};

// Should I move to hooks/useGeneration.ts?
export const useGenerationContext = () => useContext(Generation);
