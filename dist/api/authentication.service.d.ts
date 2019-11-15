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
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayloadInput } from '../model/payloadInput';
import { Token } from '../model/token';
import { Configuration } from '../configuration';
export interface ExchangeAuthorizationCodeRequestParams {
    identity: string;
    PayloadInput?: PayloadInput;
}
export interface LoginRequestParams {
    Authorization: string;
}
export interface TokenExchangeRequestParams {
    identity: string;
    token: string;
}
export declare class AuthenticationService {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string, configuration: Configuration);
    /**
     * Used to get a gravitee token from an Authorization code (PayloadInput.code). Portal API authenticates the user with the specified IDP ({identity} path param).
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Token>;
    exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Token>>;
    exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Token>>;
    /**
     * Used to get a Gravitee token. This token is mandatory for all the secured resources of the Portal API.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    login(requestParameters: LoginRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Token>;
    login(requestParameters: LoginRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Token>>;
    login(requestParameters: LoginRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Token>>;
    /**
     * User need to be authenticated to logout.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    logout(observe?: 'body', reportProgress?: boolean): Observable<any>;
    logout(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    logout(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    /**
     * Used to get a gravitee token from a IdentityProvider token. Portal API authenticates the user with the specified IDP ({identity} path param).
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    tokenExchange(requestParameters: TokenExchangeRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Token>;
    tokenExchange(requestParameters: TokenExchangeRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Token>>;
    tokenExchange(requestParameters: TokenExchangeRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Token>>;
}