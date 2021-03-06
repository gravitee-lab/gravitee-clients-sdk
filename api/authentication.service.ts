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

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { ErrorResponse } from '../model/errorResponse';
import { Token } from '../model/token';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface ExchangeAuthorizationCodeRequestParams {
    identity: string;
    client_id?: string;
    redirect_uri?: string;
    code?: string;
    grant_type?: string;
    code_verifier?: string;
    state?: string;
}

export interface LoginRequestParams {
    Authorization: string;
}

export interface TokenExchangeRequestParams {
    identity: string;
    token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    protected basePath = 'http://localhost:8083/portal/environments/DEFAULT';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Used to get a gravitee token from an Authorization code (PayloadInput.code). Portal API authenticates the user with the specified IDP ({identity} path param). 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Token>;
    public exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Token>>;
    public exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Token>>;
    public exchangeAuthorizationCode(requestParameters: ExchangeAuthorizationCodeRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling exchangeAuthorizationCode.');
        }
        const client_id = requestParameters.client_id;
        const redirect_uri = requestParameters.redirect_uri;
        const code = requestParameters.code;
        const grant_type = requestParameters.grant_type;
        const code_verifier = requestParameters.code_verifier;
        const state = requestParameters.state;

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: this.encoder});
        }

        if (client_id !== undefined) {
            formParams = formParams.append('client_id', <any>client_id) as any || formParams;
        }
        if (redirect_uri !== undefined) {
            formParams = formParams.append('redirect_uri', <any>redirect_uri) as any || formParams;
        }
        if (code !== undefined) {
            formParams = formParams.append('code', <any>code) as any || formParams;
        }
        if (grant_type !== undefined) {
            formParams = formParams.append('grant_type', <any>grant_type) as any || formParams;
        }
        if (code_verifier !== undefined) {
            formParams = formParams.append('code_verifier', <any>code_verifier) as any || formParams;
        }
        if (state !== undefined) {
            formParams = formParams.append('state', <any>state) as any || formParams;
        }

        return this.httpClient.post<Token>(`${this.configuration.basePath}/auth/oauth2/${encodeURIComponent(String(identity))}`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Used to get a Gravitee token. This token is mandatory for all the secured resources of the Portal API. 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public login(requestParameters: LoginRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Token>;
    public login(requestParameters: LoginRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Token>>;
    public login(requestParameters: LoginRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Token>>;
    public login(requestParameters: LoginRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const Authorization = requestParameters.Authorization;
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling login.');
        }

        let headers = this.defaultHeaders;
        if (Authorization !== undefined && Authorization !== null) {
            headers = headers.set('Authorization', String(Authorization));
        }

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<Token>(`${this.configuration.basePath}/auth/login`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * User need to be authenticated to logout. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public logout(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public logout(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public logout(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public logout(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/auth/logout`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Used to get a gravitee token from a IdentityProvider token. Portal API authenticates the user with the specified IDP ({identity} path param). 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public tokenExchange(requestParameters: TokenExchangeRequestParams, observe?: 'body', reportProgress?: boolean): Observable<Token>;
    public tokenExchange(requestParameters: TokenExchangeRequestParams, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Token>>;
    public tokenExchange(requestParameters: TokenExchangeRequestParams, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Token>>;
    public tokenExchange(requestParameters: TokenExchangeRequestParams, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        const identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling tokenExchange.');
        }
        const token = requestParameters.token;
        if (token === null || token === undefined) {
            throw new Error('Required parameter token was null or undefined when calling tokenExchange.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', <any>token);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<Token>(`${this.configuration.basePath}/auth/oauth2/${encodeURIComponent(String(identity))}/_exchange`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
