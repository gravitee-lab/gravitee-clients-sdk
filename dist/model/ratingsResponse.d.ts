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
import { Rating } from './rating';
import { Links } from './links';
export interface RatingsResponse {
    /**
     * List of ratings.
     */
    data?: Array<Rating>;
    /**
     * Map of Map of String
     */
    metadata?: {
        [key: string]: {
            [key: string]: string;
        };
    };
    links?: Links;
}