-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    identity VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(50),
    dob DATE,
    phone_number VARCHAR(20),
    trn VARCHAR(50),
    street_address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    status VARCHAR DEFAULT 'active',
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now()
);

CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_identity ON users(identity);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_is_deleted ON users(is_deleted);
CREATE INDEX idx_users_email ON users(email);

-- Bank Accounts
CREATE TABLE bank_accounts (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    bank_name VARCHAR(255),
    branch_name VARCHAR(255),
    account_name VARCHAR(50),
    account_number VARCHAR(50),
    account_type VARCHAR(50),
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_bank_accounts_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX idx_bank_accounts_user_id_is_deleted ON bank_accounts(user_id, is_deleted);
CREATE INDEX idx_bank_accounts_is_deleted ON bank_accounts(is_deleted);

-- Employments
CREATE TABLE employments (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    employer_name VARCHAR(255),
    job_title VARCHAR(100),
    monthly_income DECIMAL(12,2),
    payday_day INT,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_employments_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_employments_is_deleted ON employments(is_deleted);
CREATE INDEX idx_employments_user_id ON employments(user_id);

-- Documents
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INT,
    document_type VARCHAR(100),
    file_url TEXT,
    verified BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_documents_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_documents_document_type ON documents(document_type);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_verified ON documents(verified);
CREATE INDEX idx_documents_is_deleted ON documents(is_deleted);

-- Applications
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount_requested DECIMAL(12,2),
    term_in_days INT,
    purpose TEXT,
    status VARCHAR DEFAULT 'submitted',
    decision_reason TEXT,
    submitted_at TIMESTAMP(6) DEFAULT now(),
    decided_at TIMESTAMP(6),
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_applications_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_is_deleted ON applications(is_deleted);

-- Offers
CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    application_id INT,
    principal DECIMAL(12,2),
    interest_rate DECIMAL(5,2),
    term_in_days INT,
    status VARCHAR DEFAULT 'submitted',
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_offers_application FOREIGN KEY(application_id) REFERENCES applications(id)
);

CREATE INDEX idx_offers_application_id ON offers(application_id);
CREATE INDEX idx_offers_status ON offers(status);
CREATE INDEX idx_offers_is_deleted ON offers(is_deleted);

-- Loans
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    user_id INT,
    loan_offer_id INT,
    status VARCHAR DEFAULT 'active',
    disbursed_at TIMESTAMP(6),
    due_date DATE,
    total_amount DECIMAL(12,2),
    balance_remaining DECIMAL(12,2),
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_loans_offer FOREIGN KEY(loan_offer_id) REFERENCES offers(id),
    CONSTRAINT fk_loans_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_loans_due_date ON loans(due_date);
CREATE INDEX idx_loans_loan_offer_id ON loans(loan_offer_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_loans_is_deleted ON loans(is_deleted);

-- Interest
CREATE TABLE interest (
    id SERIAL PRIMARY KEY,
    loan_id INT,
    type VARCHAR(50),
    amount DECIMAL(12,2),
    description TEXT,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_interest_loan FOREIGN KEY(loan_id) REFERENCES loans(id)
);

CREATE INDEX idx_interest_loan_id ON interest(loan_id);
CREATE INDEX idx_interest_type ON interest(type);
CREATE INDEX idx_interest_is_deleted ON interest(is_deleted);

-- Repayments
CREATE TABLE repayments (
    id SERIAL PRIMARY KEY,
    loan_id INT,
    amount_paid DECIMAL(12,2),
    payment_date TIMESTAMP(6),
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(100),
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_repayments_loan FOREIGN KEY(loan_id) REFERENCES loans(id)
);

CREATE INDEX idx_repayments_loan_id ON repayments(loan_id);
CREATE INDEX idx_repayments_payment_date ON repayments(payment_date);
CREATE INDEX idx_repayments_transaction_reference ON repayments(transaction_reference);
CREATE INDEX idx_repayments_is_deleted ON repayments(is_deleted);

-- Notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    message TEXT,
    read BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now(),
    CONSTRAINT fk_notifications_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_deleted ON notifications(is_deleted);

-- Capital
CREATE TABLE capital (
    id SERIAL PRIMARY KEY,
    capital_type VARCHAR(100),
    amount DECIMAL(14,2),
    currency VARCHAR(10) DEFAULT 'JMD',
    description TEXT,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now()
);

CREATE INDEX idx_capital_capital_type ON capital(capital_type);
CREATE INDEX idx_capital_currency ON capital(currency);
CREATE INDEX idx_capital_is_deleted ON capital(is_deleted);

-- Settings
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP(6),
    created_at TIMESTAMP(6) DEFAULT now(),
    updated_at TIMESTAMP(6) DEFAULT now()
);

CREATE INDEX idx_settings_is_deleted ON settings(is_deleted);
