var ApiModule_1;
import * as tslib_1 from "tslib";
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { AnalyticsService } from './api/analytics.service';
import { ApiService } from './api/api.service';
import { ApplicationsService } from './api/applications.service';
import { AuthenticationService } from './api/authentication.service';
import { DocumentationService } from './api/documentation.service';
import { PortalService } from './api/portal.service';
import { SubscriptionService } from './api/subscription.service';
import { UserService } from './api/user.service';
import { UsersService } from './api/users.service';
let ApiModule = ApiModule_1 = class ApiModule {
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static forRoot(configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }
};
ApiModule.ctorParameters = () => [
    { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: HttpClient, decorators: [{ type: Optional }] }
];
ApiModule = ApiModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [],
        declarations: [],
        exports: [],
        providers: [
            AnalyticsService,
            ApiService,
            ApplicationsService,
            AuthenticationService,
            DocumentationService,
            PortalService,
            SubscriptionService,
            UserService,
            UsersService
        ]
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, SkipSelf()),
    tslib_1.__param(1, Optional())
], ApiModule);
export { ApiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBvcnRhbC13ZWJjbGllbnQvIiwic291cmNlcyI6WyJhcGkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWlCbkQsSUFBYSxTQUFTLGlCQUF0QixNQUFhLFNBQVM7SUFRbEIsWUFBcUMsWUFBdUIsRUFDbkMsSUFBZ0I7UUFDckMsSUFBSSxZQUFZLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7U0FDdkY7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0Q7Z0JBQy9FLDBEQUEwRCxDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBaEJNLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQXlDO1FBQzNELE9BQU87WUFDSCxRQUFRLEVBQUUsV0FBUztZQUNuQixTQUFTLEVBQUUsQ0FBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLENBQUU7U0FDOUUsQ0FBQztJQUNOLENBQUM7Q0FZSixDQUFBOztZQVZzRCxTQUFTLHVCQUE5QyxRQUFRLFlBQUksUUFBUTtZQUNILFVBQVUsdUJBQTNCLFFBQVE7O0FBVGIsU0FBUztJQWZyQixRQUFRLENBQUM7UUFDUixPQUFPLEVBQU8sRUFBRTtRQUNoQixZQUFZLEVBQUUsRUFBRTtRQUNoQixPQUFPLEVBQU8sRUFBRTtRQUNoQixTQUFTLEVBQUU7WUFDVCxnQkFBZ0I7WUFDaEIsVUFBVTtZQUNWLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsb0JBQW9CO1lBQ3BCLGFBQWE7WUFDYixtQkFBbUI7WUFDbkIsV0FBVztZQUNYLFlBQVk7U0FBRTtLQUNqQixDQUFDO0lBU2dCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDdEIsbUJBQUEsUUFBUSxFQUFFLENBQUE7R0FUZixTQUFTLENBa0JyQjtTQWxCWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFNraXBTZWxmLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5cbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuL2FwaS9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwbGljYXRpb25zU2VydmljZSB9IGZyb20gJy4vYXBpL2FwcGxpY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uU2VydmljZSB9IGZyb20gJy4vYXBpL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2FwaS9kb2N1bWVudGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9ydGFsU2VydmljZSB9IGZyb20gJy4vYXBpL3BvcnRhbC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvblNlcnZpY2UgfSBmcm9tICcuL2FwaS9zdWJzY3JpcHRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vYXBpL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2Vyc1NlcnZpY2UgfSBmcm9tICcuL2FwaS91c2Vycy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogICAgICBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogICAgICBbXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQW5hbHl0aWNzU2VydmljZSxcbiAgICBBcGlTZXJ2aWNlLFxuICAgIEFwcGxpY2F0aW9uc1NlcnZpY2UsXG4gICAgQXV0aGVudGljYXRpb25TZXJ2aWNlLFxuICAgIERvY3VtZW50YXRpb25TZXJ2aWNlLFxuICAgIFBvcnRhbFNlcnZpY2UsXG4gICAgU3Vic2NyaXB0aW9uU2VydmljZSxcbiAgICBVc2VyU2VydmljZSxcbiAgICBVc2Vyc1NlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBBcGlNb2R1bGUge1xuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uRmFjdG9yeTogKCkgPT4gQ29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFwaU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogWyB7IHByb3ZpZGU6IENvbmZpZ3VyYXRpb24sIHVzZUZhY3Rvcnk6IGNvbmZpZ3VyYXRpb25GYWN0b3J5IH0gXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEFwaU1vZHVsZSxcbiAgICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwaU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGluIHlvdXIgYmFzZSBBcHBNb2R1bGUgb25seS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0dHApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBIdHRwQ2xpZW50TW9kdWxlIGluIHlvdXIgQXBwTW9kdWxlISBcXG4nICtcbiAgICAgICAgICAgICdTZWUgYWxzbyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDU3NScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19