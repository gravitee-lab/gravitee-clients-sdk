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
import { ViewLinks } from './viewLinks';
export interface View {
    /**
     * Unique identifier of a view.
     */
    id?: string;
    name?: string;
    description?: string;
    default_view?: boolean;
    order?: number;
    total_apis?: number;
    _links?: ViewLinks;
}