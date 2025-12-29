import { LoanPolicy } from "./LoanPolicy";

export class EmployeeLoanPolicy implements LoanPolicy{
    maxDays(): number {
        return 4;
    }

    maxBooks(): number {
        return 21;
    }
}