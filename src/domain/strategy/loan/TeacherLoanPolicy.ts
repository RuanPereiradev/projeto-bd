import { LoanPolicy } from "./LoanPolicy";

export class TeacherLoanPolicy implements LoanPolicy{
    maxBooks(): number {
        return 5
    }

    maxDays(): number {
        return 30;
    }
}