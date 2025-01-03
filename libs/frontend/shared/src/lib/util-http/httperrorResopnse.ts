import { HttpEventType, HttpHeaders, HttpResponseBase } from "@angular/common/http";

class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name: string = "HttpErrorResponse";
  readonly message: string = "";
  readonly error: any;
  override readonly ok = false as const;
  override readonly headers: HttpHeaders = new HttpHeaders();
  override readonly status: number = 0;
  override readonly statusText: string = '';
  override readonly url: string | null = null;
  override readonly type: HttpEventType.ResponseHeader | HttpEventType.Response = HttpEventType.Response;
}
