import { HttpErrorResponse } from '@angular/common/http';

export class ArchonError extends HttpErrorResponse {
    errorMessage: string;
    httpStatus: number;
    success: boolean;
}
