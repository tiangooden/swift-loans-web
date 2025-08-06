-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    identity VARCHAR(255) UNIQUE NOT NULL, -- e.g. 'google|123456'
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    dob DATE,
    phone_number VARCHAR(20),
    trn VARCHAR(50), -- e.g. SSN/NIN/TRN
    street_address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    status TEXT DEFAULT 'active', -- e.g. 'active', 'inactive', 'suspended'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EMPLOYMENT DETAILS
CREATE TABLE employment_details (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    employer_name VARCHAR(255),
    job_title VARCHAR(100),
    employment_type VARCHAR(50), -- e.g. full_time, part_time
    monthly_income DECIMAL(12, 2),
    payday_day INT, -- e.g. 25 (for 25th of each month)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BANK ACCOUNTS
CREATE TABLE bank_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    bank_name VARCHAR(255),
    account_number VARCHAR(50),
    account_type VARCHAR(50),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOAN APPLICATIONS
CREATE TABLE loan_applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount_requested DECIMAL(12, 2),
    term_in_days INT,
    purpose TEXT,
    status TEXT DEFAULT 'pending', -- e.g. 'pending', 'approved', 'rejected', 'cancelled'
    decision_reason TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    decided_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOAN OFFERS
CREATE TABLE loan_offers (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES loan_applications(id),
    principal DECIMAL(12, 2),
    interest_rate DECIMAL(5, 2), -- e.g. 15.50
    fee_amount DECIMAL(12, 2),
    repayment_date DATE,
    total_due DECIMAL(12, 2),
    offer_status TEXT DEFAULT 'offered', -- e.g. 'offered', 'accepted', 'declined'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOANS
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    loan_offer_id INTEGER REFERENCES loan_offers(id),
    status TEXT DEFAULT 'active', -- e.g. 'active', 'repaid', 'overdue', 'defaulted'
    disbursed_at TIMESTAMP,
    due_date DATE,
    total_amount DECIMAL(12, 2),
    balance_remaining DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REPAYMENTS
CREATE TABLE repayments (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(id),
    amount_paid DECIMAL(12, 2),
    payment_date TIMESTAMP,
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INTEREST AND FEES
CREATE TABLE interest_and_fees (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER REFERENCES loans(id),
    type VARCHAR(50), -- e.g. 'interest', 'origination_fee', 'late_fee'
    amount DECIMAL(12, 2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DOCUMENTS
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    document_type VARCHAR(100), -- e.g. 'ID', 'Payslip', 'BankStatement'
    file_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    message TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SYSTEM SETTINGS
CREATE TABLE system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CAPITAL
CREATE TABLE capital (
    id SERIAL PRIMARY KEY,
    capital_type VARCHAR(100) NOT NULL, -- e.g. 'cash', 'bank_account', 'investment'
    amount DECIMAL(14, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
