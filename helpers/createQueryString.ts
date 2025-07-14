import { ReadonlyURLSearchParams } from "next/navigation";

type QueryUpdates = Record<string, string | undefined>;

const createQueryString = (
  currentSearchParams: ReadonlyURLSearchParams,
  newUpdates: QueryUpdates
): string => {
  // Crea una nueva instancia de URLSearchParams a partir de los parámetros existentes.
  // Esto nos permite manipularlos sin modificar el objeto original de useSearchParams.
  const params = new URLSearchParams(currentSearchParams.toString());

  // Itera sobre las nuevas actualizaciones para aplicarlas a los parámetros.
  for (const key in newUpdates) {
    const value = newUpdates[key];
    if (value !== undefined) {
      // Si el valor no es 'undefined', establece o actualiza el parámetro.
      // URLSearchParams.set() sobrescribe si ya existe, o lo añade si es nuevo.
      params.set(key, value);
    } else {
      // Si el valor es 'undefined', elimina el parámetro.
      params.delete(key);
    }
  }

  // Devuelve la cadena de consulta final.
  return params.toString();
};

export default createQueryString;
