// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import queryString from 'query-string';
import get from 'lodash/fp/get';
import { withProps } from 'recompose';
import requireAuth from 'utils/requireAuth';
import config from 'constants/config';


const loadRoute = (load) => (_next, cb) =>
  load()
    .catch(errorLoading)
    .then((res) => cb(null, res));

const errorLoading = (err) => {
  // TODO: show error page
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const getDefault = get('default');

const requireAuthIfTeam = (Component) =>
  config.team && config.alwaysRequiresAuth
    ? requireAuth(Component) : Component;


export default [
  {
    path: '/',
    name: 'home',
    getComponent: loadRoute(() =>
      import('containers/HomePage')
        .then(getDefault)
        .then(requireAuthIfTeam)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/package/:owner/:name',
    name: 'package',
    getComponent: loadRoute(() =>
      import('containers/Package')
        .then(getDefault)
        .then(requireAuthIfTeam)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/user/:username',
    name: 'user',
    getComponent: loadRoute(() =>
      import('containers/User')
        .then(getDefault)
        .then(requireAuthIfTeam)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/oauth_callback',
    name: 'oauth2',
    onEnter: (props, replaceState) => {
      if (props.location.hash) {
        const parsedHash = queryString.parse(props.location.hash);
        const newQuery = Object.assign({}, props.location.query, parsedHash);
        replaceState({
          pathname: props.location.pathname,
          query: newQuery,
        });
      }
    },
    getComponent: loadRoute(() =>
      import('containers/OAuth2').then(getDefault)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/grna-search',
    name: 'redirect',
    getComponent: loadRoute(() =>
      import('components/Redirect')
        .then(getDefault)
        .then(withProps({ url: 'https://blog.quiltdata.com/designing-crispr-sgrnas-in-python-cd693674237d' }))
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/profile',
    name: 'profile',
    getComponent: loadRoute(() =>
      import('containers/Profile')
        .then(getDefault)
        .then(requireAuth)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/search',
    name: 'searchResults',
    getComponent: loadRoute(() =>
      import('containers/SearchResults')
        .then(getDefault)
        .then(requireAuthIfTeam)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '/signout',
    name: 'signout',
    getComponent: loadRoute(() =>
      import('containers/SignOut')
        .then(getDefault)
    ), // eslint-disable-line function-paren-newline
  }, {
    path: '*',
    name: 'notfound',
    getComponent: loadRoute(() =>
      import('containers/NotFoundPage')
        .then(getDefault)
        .then(requireAuthIfTeam)
    ), // eslint-disable-line function-paren-newline
  },
];
