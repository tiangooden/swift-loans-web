export const APPLICATION_STATUS = {
    SUBMITTED: 'submitted',
    OFFERED: 'offered',
    APPROVED: 'approved',
    COUNTERED: 'countered',
    REJECTED: 'rejected',
    WITHDRAWN: 'withdrawn'
}

export const OFFER_STATUS = {
    SUBMITTED: 'submitted',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
}

export const LOAN_STATUS = {
    ACTIVE: 'active',
    REPAID: 'repaid',
    OVERDUE: 'overdue'
}

export const INTEREST_RATE: Record<string, number> = {
    '14': 25,
    '28': 30,
};

export const CACHE_KEY = {
    users: 'users',
    user: 'user',
    applications: 'applications',
    application: 'application',
    socialMedias: 'social-medias',
    references: 'references',
}

export const PAY_CYCLE = {
    WEEKLY: "weekly",
    FORTNIGHTLY: "fortnightly",
    MONTHLY: "monthly",
} as const;

export const BANK_ACCOUNT_TYPE = {
    SAVINGS: "savings",
    CHECKING: "checking",
} as const;

export const CACHE_TIME = {
    GENERAL: 60 * 60 * 24,
}
