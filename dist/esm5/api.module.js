import * as tslib_1 from "tslib";
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api/aPI.service';
import { AnalyticsService } from './api/analytics.service';
import { ApplicationsService } from './api/applications.service';
import { AuthenticationService } from './api/authentication.service';
import { DocumentationService } from './api/documentation.service';
import { PortalService } from './api/portal.service';
import { SubscriptionService } from './api/subscription.service';
import { UserService } from './api/user.service';
import { UsersService } from './api/users.service';
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
    ApiModule = ApiModule_1 = tslib_1.__decorate([
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
        tslib_1.__param(0, Optional()), tslib_1.__param(0, SkipSelf()),
        tslib_1.__param(1, Optional())
    ], ApiModule);
    return ApiModule;
}());
export { ApiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBvcnRhbC13ZWJjbGllbnQvIiwic291cmNlcyI6WyJhcGkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBaUJuRDtJQVFJLG1CQUFxQyxZQUF1QixFQUNuQyxJQUFnQjtRQUNyQyxJQUFJLFlBQVksRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztTQUN2RjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRDtnQkFDL0UsMERBQTBELENBQUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7a0JBakJRLFNBQVM7SUFDSixpQkFBTyxHQUFyQixVQUFzQixvQkFBeUM7UUFDM0QsT0FBTztZQUNILFFBQVEsRUFBRSxXQUFTO1lBQ25CLFNBQVMsRUFBRSxDQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsQ0FBRTtTQUM5RSxDQUFDO0lBQ04sQ0FBQzs7O2dCQUVrRCxTQUFTLHVCQUE5QyxRQUFRLFlBQUksUUFBUTtnQkFDSCxVQUFVLHVCQUEzQixRQUFROztJQVRiLFNBQVM7UUFmckIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFPLEVBQUU7WUFDaEIsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFPLEVBQUU7WUFDaEIsU0FBUyxFQUFFO2dCQUNULFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixtQkFBbUI7Z0JBQ25CLHFCQUFxQjtnQkFDckIsb0JBQW9CO2dCQUNwQixhQUFhO2dCQUNiLG1CQUFtQjtnQkFDbkIsV0FBVztnQkFDWCxZQUFZO2FBQUU7U0FDakIsQ0FBQztRQVNnQixtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ3RCLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BVGYsU0FBUyxDQWtCckI7SUFBRCxnQkFBQztDQUFBLEFBbEJELElBa0JDO1NBbEJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cblxuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4vYXBpL2FQSS5zZXJ2aWNlJztcbmltcG9ydCB7IEFuYWx5dGljc1NlcnZpY2UgfSBmcm9tICcuL2FwaS9hbmFseXRpY3Muc2VydmljZSc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvYXBwbGljYXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9hcGkvYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vYXBpL2RvY3VtZW50YXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBQb3J0YWxTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvcG9ydGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uU2VydmljZSB9IGZyb20gJy4vYXBpL3N1YnNjcmlwdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJzU2VydmljZSB9IGZyb20gJy4vYXBpL3VzZXJzLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiAgICAgIFtdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiAgICAgIFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBUElTZXJ2aWNlLFxuICAgIEFuYWx5dGljc1NlcnZpY2UsXG4gICAgQXBwbGljYXRpb25zU2VydmljZSxcbiAgICBBdXRoZW50aWNhdGlvblNlcnZpY2UsXG4gICAgRG9jdW1lbnRhdGlvblNlcnZpY2UsXG4gICAgUG9ydGFsU2VydmljZSxcbiAgICBTdWJzY3JpcHRpb25TZXJ2aWNlLFxuICAgIFVzZXJTZXJ2aWNlLFxuICAgIFVzZXJzU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIEFwaU1vZHVsZSB7XG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb25GYWN0b3J5OiAoKSA9PiBDb25maWd1cmF0aW9uKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQXBpTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbIHsgcHJvdmlkZTogQ29uZmlndXJhdGlvbiwgdXNlRmFjdG9yeTogY29uZmlndXJhdGlvbkZhY3RvcnkgfSBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogQXBpTW9kdWxlLFxuICAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXBpTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaW4geW91ciBiYXNlIEFwcE1vZHVsZSBvbmx5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHR0cCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBpbXBvcnQgdGhlIEh0dHBDbGllbnRNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhIFxcbicgK1xuICAgICAgICAgICAgJ1NlZSBhbHNvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwNTc1Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=