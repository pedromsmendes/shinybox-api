export const accessTokenExpiracy = () => new Date(new Date().getTime() + (60 * 60 * 1000));

export const refreshTokenExpiracy = () => new Date(new Date().getTime() + (60 * 24 * 7 * 60 * 1000));

// add extra minute to compensate for possible latency issues
export const validRefreshToken = (expiracy?: Date | null) => expiracy && expiracy.getTime() > (new Date().getTime() + (60 * 1000));

export const invalidateRefreshToken = () => new Date(new Date().getTime() - (60 * 60 * 1000));
