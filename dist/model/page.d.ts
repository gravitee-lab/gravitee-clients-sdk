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
import { PageConfiguration } from './pageConfiguration';
import { Metadata } from './metadata';
export interface Page {
    /**
     * Unique identifier of a page.
     */
    id: string;
    /**
     * Name of the page.
     */
    name: string;
    /**
     * Type of documentation.
     */
    type: Page.TypeEnum;
    /**
     * Order of the documentation page in its folder.
     */
    order: number;
    /**
     * Parent page. MAY be null.
     */
    parent?: string;
    /**
     * Last update date and time.
     */
    updated_at?: Date;
    /**
     * Raw content of the page.
     */
    content?: string;
    /**
     * Array of key-value about the page.
     */
    configuraton?: Array<PageConfiguration>;
    /**
     * Array of metadata about the page. This array is filled when the page has been fetched from a distant source (GitHub, GitLab, etc...).
     */
    metadata?: Array<Metadata>;
}
export declare namespace Page {
    type TypeEnum = 'SWAGGER' | 'MARKDOWN' | 'FOLDER' | 'ROOT';
    const TypeEnum: {
        SWAGGER: TypeEnum;
        MARKDOWN: TypeEnum;
        FOLDER: TypeEnum;
        ROOT: TypeEnum;
    };
}
