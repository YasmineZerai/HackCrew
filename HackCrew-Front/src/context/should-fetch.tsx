import { createContext, PropsWithChildren, useContext, useState } from "react";

type ShouldFetchStore = {
  shouldFetch: boolean;
  handleShouldFetch: (value: boolean) => void;
};

const ShouldFetchContext = createContext<ShouldFetchStore>({
  shouldFetch: false,
  handleShouldFetch(value) {
    throw new Error("handleShouldFetch is not implemented");
  },
});

export function useShouldFetch() {
  const context = useContext(ShouldFetchContext);
  if (!context)
    throw new Error(
      "ShouldFetchContext should be used inside ShouldFetchProvider"
    );

  return context;
}

export default function ShouldFetchProvider({ children }: PropsWithChildren) {
  const [shouldFetch, setShouldFetch] = useState(false);

  return (
    <ShouldFetchContext.Provider
      value={{
        shouldFetch,
        handleShouldFetch: (value) => setShouldFetch(value),
      }}
    >
      {children}
    </ShouldFetchContext.Provider>
  );
}
