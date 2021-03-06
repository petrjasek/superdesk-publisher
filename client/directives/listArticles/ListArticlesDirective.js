/**
 * @ngdoc directive
 * @module superdesk.apps.web_publisher
 * @name sdListArticles
 * @requires publisher
 * @description Directive to handle listing articles in web lists
 */
ListArticlesDirective.$inject = ['publisher', 'publisherHelpers'];
export function ListArticlesDirective(publisher, publisherHelpers) {
    class ListArticles {
        constructor() {
            this.scope = {list: '=list', type: '@', listChangeFlag: '=listchangeflag', controller: '=controller'};
            this.template = '<ng-include src="getTemplateUrl()"/>';
        }

        link(scope) {
            const _that = this;

            scope.$watch('list', function (newValue, oldValue) {
               if (oldValue.id != newValue.id) {
                    scope.list = newValue;
                    _that._queryItems(scope);
               }
            }, true);

            /**
             * @ngdoc method
             * @name sdListArticles#getTemplateUrl
             * @returns {String}
             * @description Returns template url dependent on type
             */
            scope.getTemplateUrl = function() {
                switch (scope.type) {
                case 'card':
                    return 'list-articles-card.html';
                case 'detail':
                    return 'list-articles-detail.html';
                }
            };

            /**
             * @ngdoc method
             * @name sdListArticles#getThumbnail
             * @param {Object} article
             * @returns {String}
             * @description Returns template url dependent on type
             */
            scope.getThumbnail = function(article) {
                return publisherHelpers.getRenditionUrl(article, 'thumbnail');
            };

            /**
             * @ngdoc method
             * @name sdListArticles#pinArticle
             * @param {Object} article
             * @description Pins article
             */
            scope.pinArticle = (article) => {
                scope.loading = true;
                publisher.pinArticle(scope.list.id, article.id, {content_list_item: {sticky: !article.sticky}}).then(
                    (item) => this._queryItems(scope));
            };

            scope.$on('refreshListArticles', (e, data) => {
                if (data.id === scope.list.id) {
                    this._queryItems(scope);
                }
            });

            this._queryItems(scope);
        }

        /**
         * @ngdoc method
         * @name sdListArticles#_queryItems
         * @private
         * @param {Object} scope
         * @description Loads items for selected list
         */
        _queryItems(scope) {
            scope.loading = true;
            publisher.queryListArticles(scope.list.id).then((articles) => {
                scope.loading = false;
                scope.articles = articles;
            })
            .catch(err => {
                scope.loading = false;
            });
        }
    }

    return new ListArticles();
}
