import type { AutocompleteProps, SetState } from './types';

export const onAutocompleteLoad = (
  autocompleteInstance: AutocompleteProps,
  setAutocomplete: SetState<AutocompleteProps | null>
) => {
  if (!autocompleteInstance) return;
  setAutocomplete(autocompleteInstance);
};
