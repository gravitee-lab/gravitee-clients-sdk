import * as tslib_1 from "tslib";
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../variables";
import * as i3 from "../configuration";
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    AuthenticationService.prototype.exchangeAuthorizationCode = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling exchangeAuthorizationCode.');
        }
        var PayloadInput = requestParameters.PayloadInput;
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/oauth2/" + encodeURIComponent(String(identity)), PayloadInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.login = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var Authorization = requestParameters.Authorization;
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling login.');
        }
        var headers = this.defaultHeaders;
        if (Authorization !== undefined && Authorization !== null) {
            headers = headers.set('Authorization', String(Authorization));
        }
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/login", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.logout = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/logout", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.tokenExchange = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling tokenExchange.');
        }
        var token = requestParameters.token;
        if (token === null || token === undefined) {
            throw new Error('Required parameter token was null or undefined when calling tokenExchange.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', token);
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/oauth2/" + encodeURIComponent(String(identity)) + "/_exchange", null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    AuthenticationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.BASE_PATH, 8), i0.ɵɵinject(i3.Configuration, 8)); }, token: AuthenticationService, providedIn: "root" });
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Optional()), tslib_1.__param(1, Inject(BASE_PATH)), tslib_1.__param(2, Optional())
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBvcnRhbC13ZWJjbGllbnQvIiwic291cmNlcyI6WyJhcGkvYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRztBQUNILHVEQUF1RDtBQUV2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBMkIsZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFDbkMsWUFBWSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFZLHNCQUFzQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUErQixZQUFZLENBQUM7QUFPL0UsT0FBTyxFQUFFLFNBQVMsRUFBc0IsTUFBMEIsY0FBYyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBMEMsa0JBQWtCLENBQUM7Ozs7O0FBcUJyRjtJQU9JLCtCQUFzQixVQUFzQixFQUFnQyxRQUFnQixFQUFjLGFBQTRCO1FBQWhILGVBQVUsR0FBVixVQUFVLENBQVk7UUFMbEMsYUFBUSxHQUFHLHdDQUF3QyxDQUFDO1FBQ3ZELG1CQUFjLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFJdkMsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDakQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NB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IjpbIi8qKlxuICogR3Jhdml0ZWUuaW8gUG9ydGFsIFJlc3QgQVBJXG4gKiBBUEkgZGVkaWNhdGVkIHRvIHRoZSBkZXZwb3J0YWwgcGFydCBvZiBHcmF2aXRlZVxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAzLjAuMFxuICogQ29udGFjdDogY29udGFjdEBncmF2aXRlZXNvdXJjZS5jb21cbiAqXG4gKiBOT1RFOiBUaGlzIGNsYXNzIGlzIGF1dG8gZ2VuZXJhdGVkIGJ5IE9wZW5BUEkgR2VuZXJhdG9yIChodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2gpLlxuICogaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoXG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBtZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgICAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCwgSHR0cFBhcmFtZXRlckNvZGVjIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ3VzdG9tSHR0cFBhcmFtZXRlckNvZGVjIH0gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL2VuY29kZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWwvZXJyb3JSZXNwb25zZSc7XG5pbXBvcnQgeyBQYXlsb2FkSW5wdXQgfSBmcm9tICcuLi9tb2RlbC9wYXlsb2FkSW5wdXQnO1xuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICcuLi9tb2RlbC90b2tlbic7XG5cbmltcG9ydCB7IEJBU0VfUEFUSCwgQ09MTEVDVElPTl9GT1JNQVRTIH0gICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi92YXJpYWJsZXMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL2NvbmZpZ3VyYXRpb24nO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXhjaGFuZ2VBdXRob3JpemF0aW9uQ29kZVJlcXVlc3RQYXJhbXMge1xuICAgIGlkZW50aXR5OiBzdHJpbmc7XG4gICAgUGF5bG9hZElucHV0PzogUGF5bG9hZElucHV0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luUmVxdWVzdFBhcmFtcyB7XG4gICAgQXV0aG9yaXphdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXhjaGFuZ2VSZXF1ZXN0UGFyYW1zIHtcbiAgICBpZGVudGl0eTogc3RyaW5nO1xuICAgIHRva2VuOiBzdHJpbmc7XG59XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25TZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBiYXNlUGF0aCA9ICdodHRwOi8vZGVtby5ncmF2aXRlZS5pby9wb3J0YWwvREVGQVVMVCc7XG4gICAgcHVibGljIGRlZmF1bHRIZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgcHVibGljIGNvbmZpZ3VyYXRpb24gPSBuZXcgQ29uZmlndXJhdGlvbigpO1xuICAgIHB1YmxpYyBlbmNvZGVyOiBIdHRwUGFyYW1ldGVyQ29kZWM7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cENsaWVudDogSHR0cENsaWVudCwgQE9wdGlvbmFsKClASW5qZWN0KEJBU0VfUEFUSCkgYmFzZVBhdGg6IHN0cmluZywgQE9wdGlvbmFsKCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbikge1xuICAgICAgICBpZiAoY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlndXJhdGlvbi5iYXNlUGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmFzZVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgYmFzZVBhdGggPSB0aGlzLmJhc2VQYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhc2VQYXRoID0gYmFzZVBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmNvZGVyID0gdGhpcy5jb25maWd1cmF0aW9uLmVuY29kZXIgfHwgbmV3IEN1c3RvbUh0dHBQYXJhbWV0ZXJDb2RlYygpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGdldCBhIGdyYXZpdGVlIHRva2VuIGZyb20gYW4gQXV0aG9yaXphdGlvbiBjb2RlIChQYXlsb2FkSW5wdXQuY29kZSkuIFBvcnRhbCBBUEkgYXV0aGVudGljYXRlcyB0aGUgdXNlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURQICh7aWRlbnRpdHl9IHBhdGggcGFyYW0pLiBcbiAgICAgKiBAcGFyYW0gcmVxdWVzdFBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZSBzZXQgd2hldGhlciBvciBub3QgdG8gcmV0dXJuIHRoZSBkYXRhIE9ic2VydmFibGUgYXMgdGhlIGJvZHksIHJlc3BvbnNlIG9yIGV2ZW50cy4gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIHRoZSBib2R5LlxuICAgICAqIEBwYXJhbSByZXBvcnRQcm9ncmVzcyBmbGFnIHRvIHJlcG9ydCByZXF1ZXN0IGFuZCByZXNwb25zZSBwcm9ncmVzcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZXhjaGFuZ2VBdXRob3JpemF0aW9uQ29kZShyZXF1ZXN0UGFyYW1ldGVyczogRXhjaGFuZ2VBdXRob3JpemF0aW9uQ29kZVJlcXVlc3RQYXJhbXMsIG9ic2VydmU/OiAnYm9keScsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8VG9rZW4+O1xuICAgIHB1YmxpYyBleGNoYW5nZUF1dGhvcml6YXRpb25Db2RlKHJlcXVlc3RQYXJhbWV0ZXJzOiBFeGNoYW5nZUF1dGhvcml6YXRpb25Db2RlUmVxdWVzdFBhcmFtcywgb2JzZXJ2ZT86ICdyZXNwb25zZScsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPFRva2VuPj47XG4gICAgcHVibGljIGV4Y2hhbmdlQXV0aG9yaXphdGlvbkNvZGUocmVxdWVzdFBhcmFtZXRlcnM6IEV4Y2hhbmdlQXV0aG9yaXphdGlvbkNvZGVSZXF1ZXN0UGFyYW1zLCBvYnNlcnZlPzogJ2V2ZW50cycsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cEV2ZW50PFRva2VuPj47XG4gICAgcHVibGljIGV4Y2hhbmdlQXV0aG9yaXphdGlvbkNvZGUocmVxdWVzdFBhcmFtZXRlcnM6IEV4Y2hhbmdlQXV0aG9yaXphdGlvbkNvZGVSZXF1ZXN0UGFyYW1zLCBvYnNlcnZlOiBhbnkgPSAnYm9keScsIHJlcG9ydFByb2dyZXNzOiBib29sZWFuID0gZmFsc2UgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgaWRlbnRpdHkgPSByZXF1ZXN0UGFyYW1ldGVycy5pZGVudGl0eTtcbiAgICAgICAgaWYgKGlkZW50aXR5ID09PSBudWxsIHx8IGlkZW50aXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgcGFyYW1ldGVyIGlkZW50aXR5IHdhcyBudWxsIG9yIHVuZGVmaW5lZCB3aGVuIGNhbGxpbmcgZXhjaGFuZ2VBdXRob3JpemF0aW9uQ29kZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBQYXlsb2FkSW5wdXQgPSByZXF1ZXN0UGFyYW1ldGVycy5QYXlsb2FkSW5wdXQ7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmRlZmF1bHRIZWFkZXJzO1xuXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgQWNjZXB0IGhlYWRlclxuICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uc2VsZWN0SGVhZGVyQWNjZXB0KGh0dHBIZWFkZXJBY2NlcHRzKTtcbiAgICAgICAgaWYgKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgQ29udGVudC1UeXBlIGhlYWRlclxuICAgICAgICBjb25zdCBjb25zdW1lczogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgaHR0cENvbnRlbnRUeXBlU2VsZWN0ZWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuY29uZmlndXJhdGlvbi5zZWxlY3RIZWFkZXJDb250ZW50VHlwZShjb25zdW1lcyk7XG4gICAgICAgIGlmIChodHRwQ29udGVudFR5cGVTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIGh0dHBDb250ZW50VHlwZVNlbGVjdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxUb2tlbj4oYCR7dGhpcy5jb25maWd1cmF0aW9uLmJhc2VQYXRofS9hdXRoL29hdXRoMi8ke2VuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaWRlbnRpdHkpKX1gLFxuICAgICAgICAgICAgUGF5bG9hZElucHV0LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5jb25maWd1cmF0aW9uLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgICAgICAgIG9ic2VydmU6IG9ic2VydmUsXG4gICAgICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHJlcG9ydFByb2dyZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBnZXQgYSBHcmF2aXRlZSB0b2tlbi4gVGhpcyB0b2tlbiBpcyBtYW5kYXRvcnkgZm9yIGFsbCB0aGUgc2VjdXJlZCByZXNvdXJjZXMgb2YgdGhlIFBvcnRhbCBBUEkuIFxuICAgICAqIEBwYXJhbSByZXF1ZXN0UGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvYnNlcnZlIHNldCB3aGV0aGVyIG9yIG5vdCB0byByZXR1cm4gdGhlIGRhdGEgT2JzZXJ2YWJsZSBhcyB0aGUgYm9keSwgcmVzcG9uc2Ugb3IgZXZlbnRzLiBkZWZhdWx0cyB0byByZXR1cm5pbmcgdGhlIGJvZHkuXG4gICAgICogQHBhcmFtIHJlcG9ydFByb2dyZXNzIGZsYWcgdG8gcmVwb3J0IHJlcXVlc3QgYW5kIHJlc3BvbnNlIHByb2dyZXNzLlxuICAgICAqL1xuICAgIHB1YmxpYyBsb2dpbihyZXF1ZXN0UGFyYW1ldGVyczogTG9naW5SZXF1ZXN0UGFyYW1zLCBvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFRva2VuPjtcbiAgICBwdWJsaWMgbG9naW4ocmVxdWVzdFBhcmFtZXRlcnM6IExvZ2luUmVxdWVzdFBhcmFtcywgb2JzZXJ2ZT86ICdyZXNwb25zZScsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPFRva2VuPj47XG4gICAgcHVibGljIGxvZ2luKHJlcXVlc3RQYXJhbWV0ZXJzOiBMb2dpblJlcXVlc3RQYXJhbXMsIG9ic2VydmU/OiAnZXZlbnRzJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8VG9rZW4+PjtcbiAgICBwdWJsaWMgbG9naW4ocmVxdWVzdFBhcmFtZXRlcnM6IExvZ2luUmVxdWVzdFBhcmFtcywgb2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGNvbnN0IEF1dGhvcml6YXRpb24gPSByZXF1ZXN0UGFyYW1ldGVycy5BdXRob3JpemF0aW9uO1xuICAgICAgICBpZiAoQXV0aG9yaXphdGlvbiA9PT0gbnVsbCB8fCBBdXRob3JpemF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgcGFyYW1ldGVyIEF1dGhvcml6YXRpb24gd2FzIG51bGwgb3IgdW5kZWZpbmVkIHdoZW4gY2FsbGluZyBsb2dpbi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5kZWZhdWx0SGVhZGVycztcbiAgICAgICAgaWYgKEF1dGhvcml6YXRpb24gIT09IHVuZGVmaW5lZCAmJiBBdXRob3JpemF0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBTdHJpbmcoQXV0aG9yaXphdGlvbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXV0aGVudGljYXRpb24gKEJhc2ljQXV0aCkgcmVxdWlyZWRcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi51c2VybmFtZSB8fCB0aGlzLmNvbmZpZ3VyYXRpb24ucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYnRvYSh0aGlzLmNvbmZpZ3VyYXRpb24udXNlcm5hbWUgKyAnOicgKyB0aGlzLmNvbmZpZ3VyYXRpb24ucGFzc3dvcmQpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdXRoZW50aWNhdGlvbiAoQ29va2llQXV0aCkgcmVxdWlyZWRcbiAgICAgICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBBY2NlcHQgaGVhZGVyXG4gICAgICAgIGNvbnN0IGh0dHBIZWFkZXJBY2NlcHRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuY29uZmlndXJhdGlvbi5zZWxlY3RIZWFkZXJBY2NlcHQoaHR0cEhlYWRlckFjY2VwdHMpO1xuICAgICAgICBpZiAoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQWNjZXB0JywgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PFRva2VuPihgJHt0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGh9L2F1dGgvbG9naW5gLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMuY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICBvYnNlcnZlOiBvYnNlcnZlLFxuICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiByZXBvcnRQcm9ncmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZXIgbmVlZCB0byBiZSBhdXRoZW50aWNhdGVkIHRvIGxvZ291dC4gXG4gICAgICogQHBhcmFtIG9ic2VydmUgc2V0IHdoZXRoZXIgb3Igbm90IHRvIHJldHVybiB0aGUgZGF0YSBPYnNlcnZhYmxlIGFzIHRoZSBib2R5LCByZXNwb25zZSBvciBldmVudHMuIGRlZmF1bHRzIHRvIHJldHVybmluZyB0aGUgYm9keS5cbiAgICAgKiBAcGFyYW0gcmVwb3J0UHJvZ3Jlc3MgZmxhZyB0byByZXBvcnQgcmVxdWVzdCBhbmQgcmVzcG9uc2UgcHJvZ3Jlc3MuXG4gICAgICovXG4gICAgcHVibGljIGxvZ291dChvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPGFueT47XG4gICAgcHVibGljIGxvZ291dChvYnNlcnZlPzogJ3Jlc3BvbnNlJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj47XG4gICAgcHVibGljIGxvZ291dChvYnNlcnZlPzogJ2V2ZW50cycsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xuICAgIHB1YmxpYyBsb2dvdXQob2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlICk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmRlZmF1bHRIZWFkZXJzO1xuXG4gICAgICAgIC8vIGF1dGhlbnRpY2F0aW9uIChCYXNpY0F1dGgpIHJlcXVpcmVkXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24udXNlcm5hbWUgfHwgdGhpcy5jb25maWd1cmF0aW9uLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EodGhpcy5jb25maWd1cmF0aW9uLnVzZXJuYW1lICsgJzonICsgdGhpcy5jb25maWd1cmF0aW9uLnBhc3N3b3JkKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXV0aGVudGljYXRpb24gKENvb2tpZUF1dGgpIHJlcXVpcmVkXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgQWNjZXB0IGhlYWRlclxuICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uc2VsZWN0SGVhZGVyQWNjZXB0KGh0dHBIZWFkZXJBY2NlcHRzKTtcbiAgICAgICAgaWYgKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdDxhbnk+KGAke3RoaXMuY29uZmlndXJhdGlvbi5iYXNlUGF0aH0vYXV0aC9sb2dvdXRgLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMuY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICBvYnNlcnZlOiBvYnNlcnZlLFxuICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiByZXBvcnRQcm9ncmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZ2V0IGEgZ3Jhdml0ZWUgdG9rZW4gZnJvbSBhIElkZW50aXR5UHJvdmlkZXIgdG9rZW4uIFBvcnRhbCBBUEkgYXV0aGVudGljYXRlcyB0aGUgdXNlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURQICh7aWRlbnRpdHl9IHBhdGggcGFyYW0pLiBcbiAgICAgKiBAcGFyYW0gcmVxdWVzdFBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZSBzZXQgd2hldGhlciBvciBub3QgdG8gcmV0dXJuIHRoZSBkYXRhIE9ic2VydmFibGUgYXMgdGhlIGJvZHksIHJlc3BvbnNlIG9yIGV2ZW50cy4gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIHRoZSBib2R5LlxuICAgICAqIEBwYXJhbSByZXBvcnRQcm9ncmVzcyBmbGFnIHRvIHJlcG9ydCByZXF1ZXN0IGFuZCByZXNwb25zZSBwcm9ncmVzcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9rZW5FeGNoYW5nZShyZXF1ZXN0UGFyYW1ldGVyczogVG9rZW5FeGNoYW5nZVJlcXVlc3RQYXJhbXMsIG9ic2VydmU/OiAnYm9keScsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8VG9rZW4+O1xuICAgIHB1YmxpYyB0b2tlbkV4Y2hhbmdlKHJlcXVlc3RQYXJhbWV0ZXJzOiBUb2tlbkV4Y2hhbmdlUmVxdWVzdFBhcmFtcywgb2JzZXJ2ZT86ICdyZXNwb25zZScsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPFRva2VuPj47XG4gICAgcHVibGljIHRva2VuRXhjaGFuZ2UocmVxdWVzdFBhcmFtZXRlcnM6IFRva2VuRXhjaGFuZ2VSZXF1ZXN0UGFyYW1zLCBvYnNlcnZlPzogJ2V2ZW50cycsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbik6IE9ic2VydmFibGU8SHR0cEV2ZW50PFRva2VuPj47XG4gICAgcHVibGljIHRva2VuRXhjaGFuZ2UocmVxdWVzdFBhcmFtZXRlcnM6IFRva2VuRXhjaGFuZ2VSZXF1ZXN0UGFyYW1zLCBvYnNlcnZlOiBhbnkgPSAnYm9keScsIHJlcG9ydFByb2dyZXNzOiBib29sZWFuID0gZmFsc2UgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgaWRlbnRpdHkgPSByZXF1ZXN0UGFyYW1ldGVycy5pZGVudGl0eTtcbiAgICAgICAgaWYgKGlkZW50aXR5ID09PSBudWxsIHx8IGlkZW50aXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgcGFyYW1ldGVyIGlkZW50aXR5IHdhcyBudWxsIG9yIHVuZGVmaW5lZCB3aGVuIGNhbGxpbmcgdG9rZW5FeGNoYW5nZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0b2tlbiA9IHJlcXVlc3RQYXJhbWV0ZXJzLnRva2VuO1xuICAgICAgICBpZiAodG9rZW4gPT09IG51bGwgfHwgdG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBwYXJhbWV0ZXIgdG9rZW4gd2FzIG51bGwgb3IgdW5kZWZpbmVkIHdoZW4gY2FsbGluZyB0b2tlbkV4Y2hhbmdlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHF1ZXJ5UGFyYW1ldGVycyA9IG5ldyBIdHRwUGFyYW1zKHtlbmNvZGVyOiB0aGlzLmVuY29kZXJ9KTtcbiAgICAgICAgaWYgKHRva2VuICE9PSB1bmRlZmluZWQgJiYgdG9rZW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHF1ZXJ5UGFyYW1ldGVycy5zZXQoJ3Rva2VuJywgPGFueT50b2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZGVmYXVsdEhlYWRlcnM7XG5cbiAgICAgICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBBY2NlcHQgaGVhZGVyXG4gICAgICAgIGNvbnN0IGh0dHBIZWFkZXJBY2NlcHRzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICBdO1xuICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuY29uZmlndXJhdGlvbi5zZWxlY3RIZWFkZXJBY2NlcHQoaHR0cEhlYWRlckFjY2VwdHMpO1xuICAgICAgICBpZiAoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQWNjZXB0JywgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0PFRva2VuPihgJHt0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGh9L2F1dGgvb2F1dGgyLyR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhpZGVudGl0eSkpfS9fZXhjaGFuZ2VgLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHF1ZXJ5UGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMuY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICBvYnNlcnZlOiBvYnNlcnZlLFxuICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiByZXBvcnRQcm9ncmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19