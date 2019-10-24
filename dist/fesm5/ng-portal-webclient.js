import { __decorate, __param } from 'tslib';
import { InjectionToken, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, SkipSelf, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
var CustomHttpParameterCodec = /** @class */ (function () {
    function CustomHttpParameterCodec() {
    }
    CustomHttpParameterCodec.prototype.encodeKey = function (k) {
        return encodeURIComponent(k);
    };
    CustomHttpParameterCodec.prototype.encodeValue = function (v) {
        return encodeURIComponent(v);
    };
    CustomHttpParameterCodec.prototype.decodeKey = function (k) {
        return decodeURIComponent(k);
    };
    CustomHttpParameterCodec.prototype.decodeValue = function (v) {
        return decodeURIComponent(v);
    };
    return CustomHttpParameterCodec;
}());

var BASE_PATH = new InjectionToken('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};

var Configuration = /** @class */ (function () {
    function Configuration(configurationParameters) {
        if (configurationParameters === void 0) { configurationParameters = {}; }
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
        this.encoder = configurationParameters.encoder;
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderContentType = function (contentTypes) {
        var _this = this;
        if (contentTypes.length === 0) {
            return undefined;
        }
        var type = contentTypes.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    };
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderAccept = function (accepts) {
        var _this = this;
        if (accepts.length === 0) {
            return undefined;
        }
        var type = accepts.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    };
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    Configuration.prototype.isJsonMime = function (mime) {
        var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    };
    return Configuration;
}());

var APIService = /** @class */ (function () {
    function APIService(httpClient, basePath, configuration) {
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
    APIService.prototype.createApiRatingForApi = function (apiId, ratingInput, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling createApiRatingForApi.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/ratings", ratingInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getApiByApiId = function (apiId, include, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiByApiId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (include) {
            include.forEach(function (element) {
                queryParameters = queryParameters.append('include', element);
            });
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getApiPlansByApiId = function (apiId, page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiPlansByApiId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/plans", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getApiRatingsByApiId = function (apiId, page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiRatingsByApiId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/ratings", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getApis = function (page, size, contextPath, label, version, name, view, cat, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (contextPath !== undefined && contextPath !== null) {
            queryParameters = queryParameters.set('context-path', contextPath);
        }
        if (label !== undefined && label !== null) {
            queryParameters = queryParameters.set('label', label);
        }
        if (version !== undefined && version !== null) {
            queryParameters = queryParameters.set('version', version);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', name);
        }
        if (view !== undefined && view !== null) {
            queryParameters = queryParameters.set('view', view);
        }
        if (cat !== undefined && cat !== null) {
            queryParameters = queryParameters.set('cat', cat);
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
        return this.httpClient.get(this.configuration.basePath + "/apis", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getPageByApiIdAndPageId = function (apiId, pageId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByApiIdAndPageId.');
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages/" + encodeURIComponent(String(pageId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getPagesByApiId = function (apiId, page, size, homepage, parent, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPagesByApiId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (homepage !== undefined && homepage !== null) {
            queryParameters = queryParameters.set('homepage', homepage);
        }
        if (parent !== undefined && parent !== null) {
            queryParameters = queryParameters.set('parent', parent);
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.prototype.getPictureByApiId = function (apiId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPictureByApiId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/picture", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    APIService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    APIService.ngInjectableDef = ɵɵdefineInjectable({ factory: function APIService_Factory() { return new APIService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: APIService, providedIn: "root" });
    APIService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], APIService);
    return APIService;
}());

var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(httpClient, basePath, configuration) {
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
    AnalyticsService.prototype.exportApplicationLogsByApplicationId = function (applicationId, page, size, from, to, query, field, order, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'text/plain',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/_export", null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.prototype.getApplicationAnalytics = function (applicationId, page, size, from, to, interval, query, field, type, range, aggs, order, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (interval !== undefined && interval !== null) {
            queryParameters = queryParameters.set('interval', interval);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', type);
        }
        if (range !== undefined && range !== null) {
            queryParameters = queryParameters.set('range', range);
        }
        if (aggs !== undefined && aggs !== null) {
            queryParameters = queryParameters.set('aggs', aggs);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/analytics", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.prototype.getApplicationLogByApplicationIdAndLogId = function (applicationId, logId, timestamp, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', timestamp);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/" + encodeURIComponent(String(logId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.prototype.getApplicationLogs = function (applicationId, page, size, from, to, query, field, order, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    AnalyticsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: AnalyticsService, providedIn: "root" });
    AnalyticsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], AnalyticsService);
    return AnalyticsService;
}());

var ApplicationsService = /** @class */ (function () {
    function ApplicationsService(httpClient, basePath, configuration) {
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
    ApplicationsService.prototype.createApplication = function (applicationInput, observe, reportProgress) {
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications", applicationInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.createApplicationMember = function (applicationId, memberInput, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling createApplicationMember.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members", memberInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.createApplicationNotification = function (applicationId, genericNotificationConfig, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling createApplicationNotification.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications", genericNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.deleteApplicationByApplicationId = function (applicationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationByApplicationId.');
        }
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
        return this.httpClient.delete(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.deleteApplicationMember = function (applicationId, memberId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationMember.');
        }
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling deleteApplicationMember.');
        }
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
        return this.httpClient.delete(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/" + encodeURIComponent(String(memberId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.deleteApplicationNotificationByNotificationId = function (applicationId, notificationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationNotificationByNotificationId.');
        }
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling deleteApplicationNotificationByNotificationId.');
        }
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
        return this.httpClient.delete(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications/" + encodeURIComponent(String(notificationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.exportApplicationLogsByApplicationId = function (applicationId, page, size, from, to, query, field, order, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'text/plain',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/_export", null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationAnalytics = function (applicationId, page, size, from, to, interval, query, field, type, range, aggs, order, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (interval !== undefined && interval !== null) {
            queryParameters = queryParameters.set('interval', interval);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', type);
        }
        if (range !== undefined && range !== null) {
            queryParameters = queryParameters.set('range', range);
        }
        if (aggs !== undefined && aggs !== null) {
            queryParameters = queryParameters.set('aggs', aggs);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/analytics", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationByApplicationId = function (applicationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationByApplicationId.');
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationLogByApplicationIdAndLogId = function (applicationId, logId, timestamp, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', timestamp);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/" + encodeURIComponent(String(logId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationLogs = function (applicationId, page, size, from, to, query, field, order, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationMemberByApplicationIdAndMemberId = function (applicationId, memberId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationMemberByApplicationIdAndMemberId.');
        }
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling getApplicationMemberByApplicationIdAndMemberId.');
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/" + encodeURIComponent(String(memberId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationPictureByApplicationId = function (applicationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationPictureByApplicationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/picture", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplications = function (page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getMembersByApplicationId = function (applicationId, page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getMembersByApplicationId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getNotificationsByApplicationId = function (applicationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getNotificationsByApplicationId.');
        }
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
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.renewApplicationSecret = function (applicationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling renewApplicationSecret.');
        }
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
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/_renew_secret", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.transferMemberOwnership = function (applicationId, transferOwnershipInput, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling transferMemberOwnership.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/_transfer_ownership", transferOwnershipInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updateApplicationByApplicationId = function (applicationId, application, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationByApplicationId.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)), application, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updateApplicationMemberByApplicationIdAndMemberId = function (applicationId, memberId, memberInput, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationMemberByApplicationIdAndMemberId.');
        }
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling updateApplicationMemberByApplicationIdAndMemberId.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/" + encodeURIComponent(String(memberId)), memberInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updateGenericApplicationNotification = function (applicationId, notificationId, genericNotificationConfig, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateGenericApplicationNotification.');
        }
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling updateGenericApplicationNotification.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications/" + encodeURIComponent(String(notificationId)), genericNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updatePortalApplicationNotification = function (applicationId, portalNotificationConfig, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updatePortalApplicationNotification.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications", portalNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    ApplicationsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ApplicationsService_Factory() { return new ApplicationsService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ApplicationsService, providedIn: "root" });
    ApplicationsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], ApplicationsService);
    return ApplicationsService;
}());

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
    AuthenticationService.prototype.exchangeAuthorizationCode = function (identity, payloadInput, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling exchangeAuthorizationCode.');
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/oauth2/" + encodeURIComponent(String(identity)), payloadInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.login = function (authorization, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling login.');
        }
        var headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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
    AuthenticationService.prototype.tokenExchange = function (identity, token, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling tokenExchange.');
        }
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
    AuthenticationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: AuthenticationService, providedIn: "root" });
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], AuthenticationService);
    return AuthenticationService;
}());

var DocumentationService = /** @class */ (function () {
    function DocumentationService(httpClient, basePath, configuration) {
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
    DocumentationService.prototype.getPageByApiIdAndPageId = function (apiId, pageId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByApiIdAndPageId.');
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages/" + encodeURIComponent(String(pageId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.prototype.getPageByPageId = function (pageId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByPageId.');
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
        return this.httpClient.get(this.configuration.basePath + "/pages/" + encodeURIComponent(String(pageId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.prototype.getPages = function (page, size, homepage, parent, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (homepage !== undefined && homepage !== null) {
            queryParameters = queryParameters.set('homepage', homepage);
        }
        if (parent !== undefined && parent !== null) {
            queryParameters = queryParameters.set('parent', parent);
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
        return this.httpClient.get(this.configuration.basePath + "/pages", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.prototype.getPagesByApiId = function (apiId, page, size, homepage, parent, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPagesByApiId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (homepage !== undefined && homepage !== null) {
            queryParameters = queryParameters.set('homepage', homepage);
        }
        if (parent !== undefined && parent !== null) {
            queryParameters = queryParameters.set('parent', parent);
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
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    DocumentationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DocumentationService_Factory() { return new DocumentationService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: DocumentationService, providedIn: "root" });
    DocumentationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], DocumentationService);
    return DocumentationService;
}());

var PortalService = /** @class */ (function () {
    function PortalService(httpClient, basePath, configuration) {
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
    PortalService.prototype.configurationGet = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/configuration", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.configurationIdentitiesGet = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/configuration/identities", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.createTicket = function (ticketInput, observe, reportProgress) {
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/tickets", ticketInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getPictureByViewId = function (viewId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (viewId === null || viewId === undefined) {
            throw new Error('Required parameter viewId was null or undefined when calling getPictureByViewId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/views/" + encodeURIComponent(String(viewId)) + "/picture", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getViewByViewId = function (viewId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (viewId === null || viewId === undefined) {
            throw new Error('Required parameter viewId was null or undefined when calling getViewByViewId.');
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
        return this.httpClient.get(this.configuration.basePath + "/views/" + encodeURIComponent(String(viewId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getViews = function (page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
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
        return this.httpClient.get(this.configuration.basePath + "/views", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.infoGet = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/info", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    PortalService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: PortalService, providedIn: "root" });
    PortalService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], PortalService);
    return PortalService;
}());

var SubscriptionService = /** @class */ (function () {
    function SubscriptionService(httpClient, basePath, configuration) {
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
    SubscriptionService.prototype.closeSubscription = function (subscriptionId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling closeSubscription.');
        }
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
        return this.httpClient.post(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)) + "/_close", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.createSubscription = function (subscriptionInput, observe, reportProgress) {
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/subscriptions", subscriptionInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.getSubscriptionBuySubscriptionId = function (subscriptionId, include, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling getSubscriptionBuySubscriptionId.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (include) {
            include.forEach(function (element) {
                queryParameters = queryParameters.append('include', element);
            });
        }
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
        return this.httpClient.get(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.getSubscriptions = function (apiId, applicationId, page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (apiId !== undefined && apiId !== null) {
            queryParameters = queryParameters.set('apiId', apiId);
        }
        if (applicationId !== undefined && applicationId !== null) {
            queryParameters = queryParameters.set('applicationId', applicationId);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/subscriptions", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.renewKeySubscription = function (subscriptionId, requestBody, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling renewKeySubscription.');
        }
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)) + "/keys/_renew", requestBody, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.revokeKeySubscription = function (subscriptionId, keyId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling revokeKeySubscription.');
        }
        if (keyId === null || keyId === undefined) {
            throw new Error('Required parameter keyId was null or undefined when calling revokeKeySubscription.');
        }
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
        return this.httpClient.post(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)) + "/keys/" + encodeURIComponent(String(keyId)) + "/_revoke", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    SubscriptionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SubscriptionService_Factory() { return new SubscriptionService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: SubscriptionService, providedIn: "root" });
    SubscriptionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], SubscriptionService);
    return SubscriptionService;
}());

var UserService = /** @class */ (function () {
    function UserService(httpClient, basePath, configuration) {
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
    UserService.prototype.deleteAllCurrentUserNotifications = function (observe, reportProgress) {
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
        return this.httpClient.delete(this.configuration.basePath + "/user/notifications", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.deleteCurrentUserNotificationByNotificationId = function (notificationId, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling deleteCurrentUserNotificationByNotificationId.');
        }
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
        return this.httpClient.delete(this.configuration.basePath + "/user/notifications/" + encodeURIComponent(String(notificationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.getCurrentUser = function (observe, reportProgress) {
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
        return this.httpClient.get(this.configuration.basePath + "/user", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.getCurrentUserAvatar = function (observe, reportProgress) {
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
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/user/avatar", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.getCurrentUserNotifications = function (page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/user/notifications", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.updateCurrentUser = function (user, observe, reportProgress) {
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
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/user", user, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    UserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UserService_Factory() { return new UserService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: UserService, providedIn: "root" });
    UserService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], UserService);
    return UserService;
}());

var UsersService = /** @class */ (function () {
    function UsersService(httpClient, basePath, configuration) {
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
    UsersService.prototype.getUsers = function (page, size, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
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
        return this.httpClient.get(this.configuration.basePath + "/users", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UsersService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    UsersService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UsersService_Factory() { return new UsersService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: UsersService, providedIn: "root" });
    UsersService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], UsersService);
    return UsersService;
}());

var APIS = [APIService, AnalyticsService, ApplicationsService, AuthenticationService, DocumentationService, PortalService, SubscriptionService, UserService, UsersService];

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
var CategoryApiQuery = {
    FEATURED: 'FEATURED',
    MINE: 'MINE',
    STARRED: 'STARRED',
    TRENDINGS: 'TRENDINGS'
};

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
var HttpMethod = {
    CONNECT: 'CONNECT',
    DELETE: 'DELETE',
    GET: 'GET',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT',
    TRACE: 'TRACE',
    OTHER: 'OTHER'
};

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
var IdentityProviderType = {
    GOOGLE: 'GOOGLE',
    GITHUB: 'GITHUB',
    GRAVITEEIOAM: 'GRAVITEEIO_AM',
    OIDC: 'OIDC'
};

var Page;
(function (Page) {
    Page.TypeEnum = {
        SWAGGER: 'SWAGGER',
        MARKDOWN: 'MARKDOWN',
        FOLDER: 'FOLDER',
        ROOT: 'ROOT'
    };
})(Page || (Page = {}));

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
var Plan;
(function (Plan) {
    Plan.SecurityEnum = {
        APIKEY: 'API_KEY',
        KEYLESS: 'KEY_LESS',
        JWT: 'JWT',
        OAUTH2: 'OAUTH2'
    };
    Plan.ValidationEnum = {
        AUTO: 'AUTO',
        MANUAL: 'MANUAL'
    };
})(Plan || (Plan = {}));

var Subscription;
(function (Subscription) {
    Subscription.StatusEnum = {
        PENDING: 'PENDING',
        ACCEPTED: 'ACCEPTED',
        REJECTED: 'REJECTED'
    };
})(Subscription || (Subscription = {}));

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
var Token;
(function (Token) {
    Token.TokenTypeEnum = {
        BEARER: 'BEARER'
    };
})(Token || (Token = {}));

var ApiModule = /** @class */ (function () {
    function ApiModule(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    ApiModule_1 = ApiModule;
    ApiModule.forRoot = function (configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    var ApiModule_1;
    ApiModule.ctorParameters = function () { return [
        { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: HttpClient, decorators: [{ type: Optional }] }
    ]; };
    ApiModule = ApiModule_1 = __decorate([
        NgModule({
            imports: [],
            declarations: [],
            exports: [],
            providers: [
                APIService,
                AnalyticsService,
                ApplicationsService,
                AuthenticationService,
                DocumentationService,
                PortalService,
                SubscriptionService,
                UserService,
                UsersService
            ]
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __param(1, Optional())
    ], ApiModule);
    return ApiModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { APIS, APIService, AnalyticsService, ApiModule, ApplicationsService, AuthenticationService, BASE_PATH, COLLECTION_FORMATS, CategoryApiQuery, Configuration, DocumentationService, HttpMethod, IdentityProviderType, Page, Plan, PortalService, Subscription, SubscriptionService, Token, UserService, UsersService };
//# sourceMappingURL=ng-portal-webclient.js.map
