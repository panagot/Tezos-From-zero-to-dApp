/**
 * Basic Tezos address format validation.
 * tz1, tz2, tz3 = implicit accounts (36 chars); KT1 = contracts (36 chars).
 * Does not verify checksum; avoids unnecessary RPC calls for clearly invalid input.
 */
export function isValidTezosAddress(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < 35 || trimmed.length > 37) return false;
  return /^(tz1|tz2|tz3|KT1)[1-9A-HJ-NP-Za-km-z]{33}$/.test(trimmed);
}

export function getAddressError(value) {
  if (!value || !value.trim()) return 'Enter an address.';
  if (!isValidTezosAddress(value)) return 'Invalid address format. Use tz1, tz2, tz3, or KT1 (36 characters).';
  return null;
}

/** For contract fields (Read storage, Call contract): address must be KT1. */
export function getContractAddressError(value) {
  const err = getAddressError(value);
  if (err) return err;
  if (!value.trim().startsWith('KT1')) return 'Contract address must start with KT1.';
  return null;
}
