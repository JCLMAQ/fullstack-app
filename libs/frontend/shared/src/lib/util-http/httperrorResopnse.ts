import { HttpEventType, HttpHeaders, HttpResponseBase } from "@angular/common/http";

class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name: "HttpErrorResponse" | undefined;
  readonly message: string | undefined;
  readonly error: any;
  readonly ok: false;
  readonly override headers: HttpHeaders;
  readonly override status: number;
  readonly override statusText: string;
  readonly override url: string | null;
  readonly override type: HttpEventType.ResponseHeader | HttpEventType.Response;
}
