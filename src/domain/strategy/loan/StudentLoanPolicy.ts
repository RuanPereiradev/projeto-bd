import { LoanPolicy } from "./LoanPolicy";

export class StudentLoanPolicy implements LoanPolicy{
    maxBooks(): number {
        return 3
    }

    maxDays(): number {
        return 15;
    }
}