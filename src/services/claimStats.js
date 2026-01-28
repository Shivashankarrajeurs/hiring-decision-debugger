export function computeClaimStats(validatedClaims) {
  let supported = 0;
  let vague = 0;
  let unverified = 0;

  for (const claim of validatedClaims) {
    if (claim.status === "SUPPORTED") supported++;
    else if (claim.status === "VAGUE") vague++;
    else if (claim.status === "UNVERIFIED") unverified++;
  }

  return { supported, vague, unverified };
}
