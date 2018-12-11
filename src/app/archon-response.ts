import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ArchonError } from './archon-error';

export class ArchonResponse extends HttpResponse<any> {
    error: ArchonError;
    headers: HttpHeaders;
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
}
