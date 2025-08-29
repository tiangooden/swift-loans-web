export interface Employment {
    id?: string;
    employer_name: string;
    employer_phone_number?: string;
    job_title: string;
    date_of_employment?: Date;
    gross_salary?: number;
    payday_day: number;
    pay_cycle?: string;
    total_expenses_per_cycle?: number;
}