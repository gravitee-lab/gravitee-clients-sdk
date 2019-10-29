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
import { UserLinks } from './userLinks';


export interface User { 
    /**
     * Unique identifier of a user.
     */
    id?: string;
    first_name?: string;
    last_name?: string;
    display_name?: string;
    email?: string;
    /**
     * Avatar of the user. Used only for update.
     */
    avatar?: string;
    _links?: UserLinks;
}

