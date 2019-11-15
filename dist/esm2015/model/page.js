export var Page;
(function (Page) {
    Page.TypeEnum = {
        SWAGGER: 'SWAGGER',
        MARKDOWN: 'MARKDOWN',
        FOLDER: 'FOLDER',
        ROOT: 'ROOT'
    };
})(Page || (Page = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBvcnRhbC13ZWJjbGllbnQvIiwic291cmNlcyI6WyJtb2RlbC9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFEQSxNQUFNLEtBQVcsSUFBSSxDQVFwQjtBQVJELFdBQWlCLElBQUk7SUFFSixhQUFRLEdBQUc7UUFDcEIsT0FBTyxFQUFFLFNBQXFCO1FBQzlCLFFBQVEsRUFBRSxVQUFzQjtRQUNoQyxNQUFNLEVBQUUsUUFBb0I7UUFDNUIsSUFBSSxFQUFFLE1BQWtCO0tBQzNCLENBQUM7QUFDTixDQUFDLEVBUmdCLElBQUksS0FBSixJQUFJLFFBUXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHcmF2aXRlZS5pbyBQb3J0YWwgUmVzdCBBUElcbiAqIEFQSSBkZWRpY2F0ZWQgdG8gdGhlIGRldnBvcnRhbCBwYXJ0IG9mIEdyYXZpdGVlXG4gKlxuICogVGhlIHZlcnNpb24gb2YgdGhlIE9wZW5BUEkgZG9jdW1lbnQ6IDMuMC4wXG4gKiBDb250YWN0OiBjb250YWN0QGdyYXZpdGVlc291cmNlLmNvbVxuICpcbiAqIE5PVEU6IFRoaXMgY2xhc3MgaXMgYXV0byBnZW5lcmF0ZWQgYnkgT3BlbkFQSSBHZW5lcmF0b3IgKGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaCkuXG4gKiBodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2hcbiAqIERvIG5vdCBlZGl0IHRoZSBjbGFzcyBtYW51YWxseS5cbiAqL1xuaW1wb3J0IHsgUGFnZUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuL3BhZ2VDb25maWd1cmF0aW9uJztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnLi9tZXRhZGF0YSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlIHsgXG4gICAgLyoqXG4gICAgICogVW5pcXVlIGlkZW50aWZpZXIgb2YgYSBwYWdlLlxuICAgICAqL1xuICAgIGlkOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgcGFnZS5cbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBkb2N1bWVudGF0aW9uLlxuICAgICAqL1xuICAgIHR5cGU6IFBhZ2UuVHlwZUVudW07XG4gICAgLyoqXG4gICAgICogT3JkZXIgb2YgdGhlIGRvY3VtZW50YXRpb24gcGFnZSBpbiBpdHMgZm9sZGVyLlxuICAgICAqL1xuICAgIG9yZGVyOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogUGFyZW50IHBhZ2UuIE1BWSBiZSBudWxsLlxuICAgICAqL1xuICAgIHBhcmVudD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBMYXN0IHVwZGF0ZSBkYXRlIGFuZCB0aW1lLlxuICAgICAqL1xuICAgIHVwZGF0ZWRfYXQ/OiBEYXRlO1xuICAgIC8qKlxuICAgICAqIFJhdyBjb250ZW50IG9mIHRoZSBwYWdlLlxuICAgICAqL1xuICAgIGNvbnRlbnQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQXJyYXkgb2Yga2V5LXZhbHVlIGFib3V0IHRoZSBwYWdlLlxuICAgICAqL1xuICAgIGNvbmZpZ3VyYXRvbj86IEFycmF5PFBhZ2VDb25maWd1cmF0aW9uPjtcbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBtZXRhZGF0YSBhYm91dCB0aGUgcGFnZS4gVGhpcyBhcnJheSBpcyBmaWxsZWQgd2hlbiB0aGUgcGFnZSBoYXMgYmVlbiBmZXRjaGVkIGZyb20gYSBkaXN0YW50IHNvdXJjZSAoR2l0SHViLCBHaXRMYWIsIGV0Yy4uLikuXG4gICAgICovXG4gICAgbWV0YWRhdGE/OiBBcnJheTxNZXRhZGF0YT47XG59XG5leHBvcnQgbmFtZXNwYWNlIFBhZ2Uge1xuICAgIGV4cG9ydCB0eXBlIFR5cGVFbnVtID0gJ1NXQUdHRVInIHwgJ01BUktET1dOJyB8ICdGT0xERVInIHwgJ1JPT1QnO1xuICAgIGV4cG9ydCBjb25zdCBUeXBlRW51bSA9IHtcbiAgICAgICAgU1dBR0dFUjogJ1NXQUdHRVInIGFzIFR5cGVFbnVtLFxuICAgICAgICBNQVJLRE9XTjogJ01BUktET1dOJyBhcyBUeXBlRW51bSxcbiAgICAgICAgRk9MREVSOiAnRk9MREVSJyBhcyBUeXBlRW51bSxcbiAgICAgICAgUk9PVDogJ1JPT1QnIGFzIFR5cGVFbnVtXG4gICAgfTtcbn1cblxuXG4iXX0=