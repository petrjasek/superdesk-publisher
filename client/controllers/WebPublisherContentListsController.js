/**
 * @ngdoc controller
 * @module superdesk.apps.web_publisher
 * @name WebPublisherAnalyticsController
 * @requires publisher
 * @requires modal
 * @requires https://docs.angularjs.org/api/ng/type/$rootScope.Scope $scope
 * @description WebPublisherAnalyticsController holds a set of functions used for web publisher analytics
 */
WebPublisherContentListsController.$inject = ["$scope", "publisher", "$route"];
export function WebPublisherContentListsController($scope, publisher, $route) {
  class WebPublisherContentLists {
    constructor() {
      this.tenant = $route.current.params._tenant;
      this.list = $route.current.params._list;
      this.publisher = publisher;
    }
  }

  return new WebPublisherContentLists();
}
