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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SYSTEM SETTINGS
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
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
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================== INDEXES =====================

-- USERS
CREATE INDEX idx_users_identity ON users(identity);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_is_deleted ON users(is_deleted);

-- EMPLOYMENT DETAILS
CREATE INDEX idx_employment_details_employment_type ON employment_details(employment_type);
CREATE INDEX idx_employment_details_is_deleted ON employment_details(is_deleted);

-- BANK ACCOUNTS
CREATE INDEX idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX idx_bank_accounts_is_primary ON bank_accounts(is_primary);
CREATE INDEX idx_bank_accounts_user_id_is_primary ON bank_accounts(user_id, is_primary);
CREATE INDEX idx_bank_accounts_is_deleted ON bank_accounts(is_deleted);

-- LOAN APPLICATIONS
CREATE INDEX idx_loan_applications_user_id ON loan_applications(user_id);
CREATE INDEX idx_loan_applications_status ON loan_applications(status);
CREATE INDEX idx_loan_applications_submitted_at ON loan_applications(submitted_at);
CREATE INDEX idx_loan_applications_is_deleted ON loan_applications(is_deleted);

-- LOAN OFFERS
CREATE INDEX idx_loan_offers_application_id ON loan_offers(application_id);
CREATE INDEX idx_loan_offers_offer_status ON loan_offers(offer_status);
CREATE INDEX idx_loan_offers_is_deleted ON loan_offers(is_deleted);

-- LOANS
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_loans_loan_offer_id ON loans(loan_offer_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_due_date ON loans(due_date);
CREATE INDEX idx_loans_is_deleted ON loans(is_deleted);

-- REPAYMENTS
CREATE INDEX idx_repayments_loan_id ON repayments(loan_id);
CREATE INDEX idx_repayments_payment_date ON repayments(payment_date);
CREATE INDEX idx_repayments_transaction_reference ON repayments(transaction_reference);
CREATE INDEX idx_repayments_is_deleted ON repayments(is_deleted);

-- INTEREST AND FEES
CREATE INDEX idx_interest_and_fees_loan_id ON interest_and_fees(loan_id);
CREATE INDEX idx_interest_and_fees_type ON interest_and_fees(type);
CREATE INDEX idx_interest_and_fees_is_deleted ON interest_and_fees(is_deleted);

-- DOCUMENTS
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_document_type ON documents(document_type);
CREATE INDEX idx_documents_verified ON documents(verified);
CREATE INDEX idx_documents_is_deleted ON documents(is_deleted);

-- NOTIFICATIONS
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_is_deleted ON notifications(is_deleted);

-- SYSTEM SETTINGS
CREATE INDEX idx_system_settings_is_deleted ON system_settings(is_deleted);

-- CAPITAL
CREATE INDEX idx_capital_capital_type ON capital(capital_type);
CREATE INDEX idx_capital_currency ON capital(currency);
CREATE INDEX idx_capital_is_deleted ON capital(is_deleted);
