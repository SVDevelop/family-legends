import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from "../services/app.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class QueryInterceptor implements HttpInterceptor {
  constructor(private appService: AppService){}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const nowTime:string = JSON.stringify(Date.now());
    const sToken = 'Bearer ' + this.appService.getToken();
    const sXid = this.appService.getXID();
    let cloneDefaultRequest = req.clone(
      {setParams: {'qts': nowTime} }
    );

    if(req.url.indexOf('/send-code') === -1
      && req.url.indexOf('/login') === -1
      && req.url.indexOf('/init') === -1){
      const cloneRequest = req.clone({
        setHeaders: {
          Authorization: sToken,
          'X-Group-Id': sXid
        }
        , setParams: {'qts': nowTime}
      });

      return  next.handle(cloneRequest);
    }
    if(req.url.indexOf('/init') >=0){
      const cloneRequestInit = req.clone({
        setHeaders: {
          Authorization: sToken,
        }
        , setParams: {'qts': nowTime}
      });

      return  next.handle(cloneRequestInit);
    }
    return  next.handle(cloneDefaultRequest);
    // return next.handle(req);
  }
}

