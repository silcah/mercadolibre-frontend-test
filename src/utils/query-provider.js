import * as React from "react";

function QueryProvider(props) {
  const [query, setQuery] = React.useState("");
  const value = [query, setQuery];

  return (
    <QueryContext.Provider value={value} {...props}></QueryContext.Provider>
  );
}

function useQuery() {
  const context = React.useContext(QueryContext);
  if (context === undefined) {
    throw new Error(`useQuery must be used within a QueryContext`);
  }
  return context;
}

const QueryContext = React.createContext();

export { QueryProvider, useQuery };
